/**
 * sqlGenerator.js — Logical Model → Physical (SQL DDL)
 * Generates CREATE TABLE statements from logical model tables.
 * Supports PostgreSQL (default), MySQL, SQLite.
 */

const SGBD_TYPE_MAP = {
  postgresql: {
    'INTEGER': 'INTEGER',
    'VARCHAR(100)': 'VARCHAR(100)',
    'VARCHAR(255)': 'VARCHAR(255)',
    'VARCHAR(14)': 'VARCHAR(14)',
    'VARCHAR(20)': 'VARCHAR(20)',
    'TEXT': 'TEXT',
    'DATE': 'DATE',
    'DECIMAL(10,2)': 'DECIMAL(10,2)',
    'DECIMAL(4,2)': 'DECIMAL(4,2)',
    'BOOLEAN': 'BOOLEAN',
    'TIMESTAMP': 'TIMESTAMP',
    'SERIAL': 'SERIAL',
  },
  mysql: {
    'INTEGER': 'INT',
    'VARCHAR(100)': 'VARCHAR(100)',
    'VARCHAR(255)': 'VARCHAR(255)',
    'VARCHAR(14)': 'VARCHAR(14)',
    'VARCHAR(20)': 'VARCHAR(20)',
    'TEXT': 'TEXT',
    'DATE': 'DATE',
    'DECIMAL(10,2)': 'DECIMAL(10,2)',
    'DECIMAL(4,2)': 'DECIMAL(4,2)',
    'BOOLEAN': 'TINYINT(1)',
    'TIMESTAMP': 'DATETIME',
    'SERIAL': 'INT AUTO_INCREMENT',
  },
  sqlite: {
    'INTEGER': 'INTEGER',
    'VARCHAR(100)': 'TEXT',
    'VARCHAR(255)': 'TEXT',
    'VARCHAR(14)': 'TEXT',
    'VARCHAR(20)': 'TEXT',
    'TEXT': 'TEXT',
    'DATE': 'TEXT',
    'DECIMAL(10,2)': 'REAL',
    'DECIMAL(4,2)': 'REAL',
    'BOOLEAN': 'INTEGER',
    'TIMESTAMP': 'TEXT',
    'SERIAL': 'INTEGER',
  },
};

function sanitizeName(name) {
  return name.replace(/[^a-zA-Z0-9_]/g, '_').replace(/_{2,}/g, '_');
}

/**
 * Generate SQL DDL from logical model tables
 * @param {Object[]} tables - Array of table objects with fields
 * @param {Object[]} logicalConnections - FK relationships
 * @param {string} sgbd - 'postgresql' | 'mysql' | 'sqlite'
 * @returns {string} SQL DDL script
 */
export function generateSQL(tables, logicalConnections = [], sgbd = 'postgresql') {
  const typeMap = SGBD_TYPE_MAP[sgbd] || SGBD_TYPE_MAP.postgresql;
  const lines = [];

  lines.push(`-- ============================================`);
  lines.push(`-- brModelo Web — Esquema Físico (${sgbd.toUpperCase()})`);
  lines.push(`-- Gerado automaticamente`);
  lines.push(`-- ============================================`);
  lines.push('');

  // Build FK references for ALTER TABLE (deferred)
  const alterStatements = [];

  for (const table of tables) {
    const tName = sanitizeName(table.name);
    const columnDefs = [];
    const pkCols = [];
    const fkRefs = [];

    for (const field of table.fields) {
      const fName = sanitizeName(field.name);
      const fType = typeMap[field.type] || field.type || 'VARCHAR(100)';
      let colDef = `    ${fName} ${fType}`;

      if (field.nn && !field.pk) colDef += ' NOT NULL';
      if (field.pk) pkCols.push(fName);

      columnDefs.push(colDef);

      if (field.fk && field.refTable) {
        const refTName = sanitizeName(field.refTable);
        fkRefs.push({ field: fName, refTable: refTName });
      }
    }

    // PRIMARY KEY constraint
    if (pkCols.length > 0) {
      columnDefs.push(`    PRIMARY KEY (${pkCols.join(', ')})`);
    }

    // FOREIGN KEY constraints (inline)
    for (const fk of fkRefs) {
      // Find the PK of the referenced table
      const refTable = tables.find(t => sanitizeName(t.name) === fk.refTable);
      const refPk = refTable?.pks?.[0] || 'id';
      columnDefs.push(`    FOREIGN KEY (${fk.field}) REFERENCES ${fk.refTable}(${sanitizeName(refPk)})`);
    }

    lines.push(`CREATE TABLE ${tName} (`);
    lines.push(columnDefs.join(',\n'));
    lines.push(`);`);
    lines.push('');
  }

  // Add deferred FK constraints from connections not covered above
  for (const conn of logicalConnections) {
    const fromTable = tables.find(t => t.id === conn.from);
    const toTable = tables.find(t => t.id === conn.to);
    if (!fromTable || !toTable) continue;

    // Only add ALTER if the FK wasn't already added inline
    const toFields = toTable.fields.filter(f => f.fk && f.refTable === fromTable.name);
    if (toFields.length === 0 && conn.fkField) {
      const fkField = sanitizeName(conn.fkField);
      const fromTName = sanitizeName(fromTable.name);
      const toTName = sanitizeName(toTable.name);
      const refPk = fromTable.pks?.[0] || 'id';
      alterStatements.push(
        `ALTER TABLE ${toTName} ADD CONSTRAINT fk_${toTName}_${fromTName}\n    FOREIGN KEY (${fkField}) REFERENCES ${fromTName}(${sanitizeName(refPk)});`
      );
    }
  }

  if (alterStatements.length > 0) {
    lines.push('-- Foreign Key Constraints');
    lines.push(alterStatements.join('\n\n'));
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Quick SQL preview without full generation — for tooltips / status
 */
export function getTableCount(tables) {
  return tables.length;
}

export function getColumnCount(tables) {
  return tables.reduce((sum, t) => sum + (t.fields?.length || 0), 0);
}
