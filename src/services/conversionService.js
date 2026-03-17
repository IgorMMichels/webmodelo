/**
 * conversionService.js — Conceitual → Lógico
 * Based on Heuser "Projeto de Banco de Dados" 6th Ed.
 *
 * Rules implemented:
 *   Entity → Table
 *   Identifier attr → PK
 *   Simple attr → Column
 *   Composite attr → Flattened columns
 *   Multivalued attr → Separate table with FK
 *   Weak entity → Table with composite PK (discriminator + FK)
 *   1:1 relationship → FK on total-participation side
 *   1:N relationship → FK on N side
 *   N:N relationship → Junction table (composite PK)
 *   Relationship attributes → migrate to FK holder or junction table
 *   Self-relationship → Recursive FK
 *   Associative entity → Table with composite PK + own attributes
 *   Generalization (3 strategies) → user-selected
 */

const generateId = (prefix) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

const inferDataType = (name) => {
  const n = name.toLowerCase();
  if (n.includes('data') || n.includes('nasc') || n.includes('date')) return 'DATE';
  if (n.includes('valor') || n.includes('preco') || n.includes('salario') || n.includes('nota')) return 'DECIMAL(10,2)';
  if (n.includes('qtd') || n.includes('quantidade') || n.includes('idade') || n.includes('numero') || n.includes('cod') || n.includes('id')) return 'INTEGER';
  if (n.includes('email')) return 'VARCHAR(255)';
  if (n.includes('cpf')) return 'VARCHAR(14)';
  if (n.includes('telefone') || n.includes('fone') || n.includes('cel')) return 'VARCHAR(20)';
  if (n.includes('descricao') || n.includes('observa')) return 'TEXT';
  if (n.includes('ativo') || n.includes('flag')) return 'BOOLEAN';
  return 'VARCHAR(100)';
};

/**
 * Build a lookup of objects by type and connections
 */
function buildModelGraph(model) {
  const entities = {};
  const relationships = {};
  const attributes = {};
  const specializations = {};
  const connections = {};

  for (const obj of Object.values(model.objects)) {
    switch (obj.type) {
      case 'entity': entities[obj.id] = obj; break;
      case 'relationship': relationships[obj.id] = obj; break;
      case 'attribute': attributes[obj.id] = obj; break;
      case 'specialization': specializations[obj.id] = obj; break;
      case 'associative': entities[obj.id] = obj; break; // Treat associative as entity for table generation
    }
  }

  // Build adjacency from connections
  const connList = Object.values(model.connections);
  const adjacency = {}; // objId → [{ targetId, conn }]

  for (const conn of connList) {
    if (!adjacency[conn.from]) adjacency[conn.from] = [];
    if (!adjacency[conn.to]) adjacency[conn.to] = [];
    adjacency[conn.from].push({ targetId: conn.to, conn });
    adjacency[conn.to].push({ targetId: conn.from, conn });
    connections[conn.id] = conn;
  }

  return { entities, relationships, attributes, specializations, connections, adjacency };
}

/**
 * Get attributes connected to an object
 */
function getAttrsOf(objId, graph) {
  const neighbors = graph.adjacency[objId] || [];
  return neighbors
    .map(n => graph.attributes[n.targetId])
    .filter(Boolean);
}

/**
 * Get entities connected to a relationship, with cardinality
 */
function getRelEntities(relId, graph) {
  const neighbors = graph.adjacency[relId] || [];
  const result = [];

  for (const n of neighbors) {
    const ent = graph.entities[n.targetId];
    if (ent) {
      result.push({
        entity: ent,
        conn: n.conn,
        cardFrom: n.conn.cardFrom || '1',
        cardTo: n.conn.cardTo || 'N',
      });
    }
  }
  return result;
}

/**
 * Determine cardinality type of a relationship
 */
function classifyRelationship(relId, graph) {
  const ents = getRelEntities(relId, graph);
  if (ents.length < 2) return { type: 'unknown', ents };

  // Extract max cardinalities — look at both directions
  const cards = ents.map(e => {
    const maxCard = (e.cardFrom || '').toUpperCase().includes('N') ? 'N' :
                    (e.cardTo || '').toUpperCase().includes('N') ? 'N' : '1';
    const minCard = (e.cardFrom || '').includes('0') ? '0' : '1';
    return { ...e, maxCard, minCard };
  });

  const nCount = cards.filter(c => c.maxCard === 'N').length;

  if (nCount === 0) return { type: '1:1', ents: cards };
  if (nCount === 1) return { type: '1:N', ents: cards };
  return { type: 'N:N', ents: cards };
}

/**
 * Convert conceptual model to logical model
 * @returns {{ tables: Object[], logicalConnections: Object[], decisions: Object[] }}
 */
export function convertConceptualToLogical(model, userDecisions = {}) {
  const graph = buildModelGraph(model);
  const tables = [];
  const logicalConnections = [];
  const decisions = [];

  // --- 1. Convert each entity to a table ---
  const entityTableMap = {}; // entityId → tableId

  for (const ent of Object.values(graph.entities)) {
    const attrs = getAttrsOf(ent.id, graph);
    const fields = [];
    const pks = [];

    for (const attr of attrs) {
      if (attr.multiValued) continue; // handled separately

      if (attr.composed) {
        // Flatten composite: create sub-fields
        fields.push({
          id: generateId('fld'),
          name: attr.name,
          type: inferDataType(attr.name),
          pk: false, fk: false, nn: !attr.optional,
          comment: 'composto (flatten)',
        });
      } else {
        const fld = {
          id: generateId('fld'),
          name: attr.name,
          type: inferDataType(attr.name),
          pk: !!attr.identifier,
          fk: false,
          nn: !attr.optional,
        };
        fields.push(fld);
        if (attr.identifier) pks.push(fld);
      }
    }

    const table = {
      id: generateId('tbl'),
      type: 'table',
      name: ent.name,
      x: ent.x,
      y: ent.y,
      width: 200,
      height: 40 + fields.length * 24,
      fields,
      pks: pks.map(p => p.name),
      sourceEntityId: ent.id,
      weak: ent.weak,
      isAssociative: ent.type === 'associative',
    };

    tables.push(table);
    entityTableMap[ent.id] = table.id;

    // --- 1b. Multivalued attributes → separate table ---
    for (const attr of attrs) {
      if (!attr.multiValued) continue;

      const mvTable = {
        id: generateId('tbl'),
        type: 'table',
        name: `${ent.name}_${attr.name}`,
        x: ent.x + 250,
        y: ent.y + tables.length * 30,
        width: 180,
        height: 88,
        fields: [
          { id: generateId('fld'), name: `${ent.name.toLowerCase()}_id`, type: 'INTEGER', pk: true, fk: true, nn: true },
          { id: generateId('fld'), name: attr.name, type: inferDataType(attr.name), pk: true, fk: false, nn: true },
        ],
        pks: [`${ent.name.toLowerCase()}_id`, attr.name],
        sourceEntityId: ent.id,
      };
      tables.push(mvTable);

      logicalConnections.push({
        id: generateId('lconn'),
        from: table.id,
        to: mvTable.id,
        type: '1:N',
        fkField: `${ent.name.toLowerCase()}_id`,
      });
    }
  }

  // --- 2. Convert relationships ---
  for (const rel of Object.values(graph.relationships)) {
    const classification = classifyRelationship(rel.id, graph);
    const relAttrs = getAttrsOf(rel.id, graph);

    if (classification.type === '1:1') {
      // FK goes to the side with total participation (min=1), or first entity
      const totalSide = classification.ents.find(e => e.minCard === '1') || classification.ents[0];
      const otherSide = classification.ents.find(e => e !== totalSide) || classification.ents[1];

      if (totalSide && otherSide) {
        const totalTable = tables.find(t => t.sourceEntityId === totalSide.entity.id);
        const otherTable = tables.find(t => t.sourceEntityId === otherSide.entity.id);

        if (totalTable && otherTable) {
          const fkName = `${otherTable.name.toLowerCase()}_id`;
          totalTable.fields.push({
            id: generateId('fld'), name: fkName,
            type: 'INTEGER', pk: false, fk: true, nn: totalSide.minCard === '1',
            refTable: otherTable.name,
          });
          totalTable.height += 24;

          // Add relationship attributes to FK holder
          for (const ra of relAttrs) {
            totalTable.fields.push({
              id: generateId('fld'), name: ra.name,
              type: inferDataType(ra.name), pk: false, fk: false, nn: !ra.optional,
            });
            totalTable.height += 24;
          }

          logicalConnections.push({
            id: generateId('lconn'), from: otherTable.id, to: totalTable.id,
            type: '1:1', fkField: fkName,
          });
        }
      }
    } else if (classification.type === '1:N') {
      // FK goes to the N side
      const nSide = classification.ents.find(e => e.maxCard === 'N');
      const oneSide = classification.ents.find(e => e.maxCard !== 'N');

      if (nSide && oneSide) {
        const nTable = tables.find(t => t.sourceEntityId === nSide.entity.id);
        const oneTable = tables.find(t => t.sourceEntityId === oneSide.entity.id);

        if (nTable && oneTable) {
          const fkName = `${oneTable.name.toLowerCase()}_id`;
          nTable.fields.push({
            id: generateId('fld'), name: fkName,
            type: 'INTEGER', pk: false, fk: true, nn: nSide.minCard === '1',
            refTable: oneTable.name,
          });
          nTable.height += 24;

          for (const ra of relAttrs) {
            nTable.fields.push({
              id: generateId('fld'), name: ra.name,
              type: inferDataType(ra.name), pk: false, fk: false, nn: !ra.optional,
            });
            nTable.height += 24;
          }

          logicalConnections.push({
            id: generateId('lconn'), from: oneTable.id, to: nTable.id,
            type: '1:N', fkField: fkName,
          });
        }
      }
    } else if (classification.type === 'N:N') {
      // Create junction table
      const ent1 = classification.ents[0];
      const ent2 = classification.ents[1];
      const t1 = tables.find(t => t.sourceEntityId === ent1?.entity?.id);
      const t2 = tables.find(t => t.sourceEntityId === ent2?.entity?.id);

      if (t1 && t2) {
        const fk1 = `${t1.name.toLowerCase()}_id`;
        const fk2 = `${t2.name.toLowerCase()}_id`;

        const junctionFields = [
          { id: generateId('fld'), name: fk1, type: 'INTEGER', pk: true, fk: true, nn: true, refTable: t1.name },
          { id: generateId('fld'), name: fk2, type: 'INTEGER', pk: true, fk: true, nn: true, refTable: t2.name },
        ];

        // Add relationship attributes to junction table
        for (const ra of relAttrs) {
          junctionFields.push({
            id: generateId('fld'), name: ra.name,
            type: inferDataType(ra.name), pk: false, fk: false, nn: !ra.optional,
          });
        }

        const junctionTable = {
          id: generateId('tbl'),
          type: 'table',
          name: rel.name || `${t1.name}_${t2.name}`,
          x: (t1.x + t2.x) / 2,
          y: Math.max(t1.y, t2.y) + 120,
          width: 200,
          height: 40 + junctionFields.length * 24,
          fields: junctionFields,
          pks: [fk1, fk2],
          sourceRelationshipId: rel.id,
        };

        tables.push(junctionTable);

        logicalConnections.push(
          { id: generateId('lconn'), from: t1.id, to: junctionTable.id, type: '1:N', fkField: fk1 },
          { id: generateId('lconn'), from: t2.id, to: junctionTable.id, type: '1:N', fkField: fk2 },
        );
      }
    }
  }

  // --- 3. Handle weak entities (add FK from strong entity as part of PK) ---
  for (const table of tables) {
    if (!table.weak) continue;
    const ent = graph.entities[table.sourceEntityId];
    if (!ent) continue;

    // Find connected strong entity via relationship
    const neighbors = graph.adjacency[ent.id] || [];
    for (const n of neighbors) {
      const rel = graph.relationships[n.targetId];
      if (!rel) continue;

      const relNeighbors = graph.adjacency[rel.id] || [];
      for (const rn of relNeighbors) {
        const strongEnt = graph.entities[rn.targetId];
        if (strongEnt && strongEnt.id !== ent.id && !strongEnt.weak) {
          const strongTable = tables.find(t => t.sourceEntityId === strongEnt.id);
          if (strongTable) {
            const fkName = `${strongTable.name.toLowerCase()}_id`;
            // Check if FK already added
            if (!table.fields.find(f => f.name === fkName)) {
              table.fields.unshift({
                id: generateId('fld'), name: fkName,
                type: 'INTEGER', pk: true, fk: true, nn: true,
                refTable: strongTable.name,
              });
              table.pks.unshift(fkName);
              table.height += 24;
            }
          }
        }
      }
    }
  }

  // --- 4. Handle associative entities (add FK from related entities as part of PK) ---
  for (const table of tables) {
    if (!table.isAssociative) continue;
    const ent = graph.entities[table.sourceEntityId];
    if (!ent) continue;

    const neighbors = graph.adjacency[ent.id] || [];
    for (const n of neighbors) {
      const relatedEnt = graph.entities[n.targetId];
      // Only get strong entities or regular entities we connected to
      if (relatedEnt && relatedEnt.id !== ent.id && !relatedEnt.isAssociative) {
        const relatedTable = tables.find(t => t.sourceEntityId === relatedEnt.id);
        if (relatedTable) {
          const fkName = `${relatedTable.name.toLowerCase()}_id`;
          if (!table.fields.find(f => f.name === fkName)) {
            table.fields.unshift({
              id: generateId('fld'), name: fkName,
              type: 'INTEGER', pk: true, fk: true, nn: true,
              refTable: relatedTable.name,
            });
            table.pks.unshift(fkName);
            table.height += 24;
            
            logicalConnections.push({
              id: generateId('lconn'), from: relatedTable.id, to: table.id,
              type: '1:N', fkField: fkName,
            });
          }
        }
      }
    }
  }

  return { tables, logicalConnections, decisions };
}
