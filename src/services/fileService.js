/**
 * fileService.js — Save, Open, Export .brM files
 * .brM format = JSON with .brM extension
 */

/**
 * Export all models as a .brM JSON file
 */
export function exportBrM(models, metadata = {}) {
  const data = {
    version: '3.0.0',
    format: 'brModelo-Web',
    metadata: {
      name: metadata.name || 'Projeto brModelo',
      author: metadata.author || '',
      created: metadata.created || new Date().toISOString(),
      modified: new Date().toISOString(),
    },
    models: {},
  };

  for (const [id, model] of Object.entries(models)) {
    data.models[id] = {
      id: model.id,
      name: model.name,
      type: model.type,
      objects: model.objects,
      connections: model.connections,
      canvas: {
        zoom: model.zoom || 1,
        panX: model.panX || 0,
        panY: model.panY || 0,
      },
    };
  }

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  downloadBlob(blob, `${metadata.name || 'projeto'}.brM`);
  return json;
}

/**
 * Import a .brM JSON file
 * @returns {Promise<Object>} parsed data
 */
export function importBrM(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.version || !data.models) {
          reject(new Error('Formato .brM inválido: campos obrigatórios ausentes'));
          return;
        }
        resolve(data);
      } catch {
        reject(new Error('Erro ao ler arquivo .brM: JSON inválido'));
      }
    };
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsText(file);
  });
}

/**
 * Save current state to localStorage
 */
export function autoSave(models, key = 'brmodelo_autosave') {
  try {
    const data = {
      timestamp: Date.now(),
      models,
    };
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

/**
 * Load from localStorage auto-save
 */
export function loadAutoSave(key = 'brmodelo_autosave') {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Export canvas as SVG string
 */
export function exportCanvasSVG(svgElement) {
  if (!svgElement) return null;
  const clone = svgElement.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  return new XMLSerializer().serializeToString(clone);
}

/**
 * Export SQL file
 */
export function exportSQL(sqlContent, filename = 'schema.sql') {
  const blob = new Blob([sqlContent], { type: 'text/sql' });
  downloadBlob(blob, filename);
}

/**
 * Download any blob
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Open file picker and read .brM
 * @returns {Promise<Object>}
 */
export function openFilePicker() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.brM,.brm,.json';
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) { reject(new Error('Nenhum arquivo selecionado')); return; }
      try {
        const data = await importBrM(file);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    input.click();
  });
}
