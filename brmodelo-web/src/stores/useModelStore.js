import { create } from 'zustand';
import { exportBrM, openFilePicker, importBrM } from '../services/fileService';

const generateId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

const createDefaultModel = () => ({
  id: generateId('model'),
  name: 'CONCEITUAL_1',
  type: 'conceptual',
  version: '3.0.0',
  author: '',
  notes: '',
  objects: {},
  connections: {},
  createdAt: new Date().toISOString(),
  modifiedAt: new Date().toISOString(),
});

const useModelStore = create((set, get) => ({
  models: {},
  activeModelId: null,
  selectedIds: [],
  activeTool: 'select',
  zoom: 1,
  panX: 0,
  panY: 0,
  history: [],
  historyIndex: -1,
  isDirty: false,

  createModel: (type = 'conceptual') => {
    const model = createDefaultModel();
    model.type = type;
    const count = Object.values(get().models).filter(m => m.type === type).length + 1;
    model.name = type === 'conceptual' ? `CONCEITUAL_${count}` : `LOGICO_${count}`;
    set(state => ({
      models: { ...state.models, [model.id]: model },
      activeModelId: model.id,
      selectedIds: [],
      zoom: 1,
      panX: 0,
      panY: 0,
      history: [],
      historyIndex: -1,
    }));
    return model.id;
  },

  setActiveModel: (modelId) => set({ activeModelId: modelId, selectedIds: [], zoom: 1, panX: 0, panY: 0 }),

  closeModel: (modelId) => {
    set(state => {
      const newModels = { ...state.models };
      delete newModels[modelId];
      const ids = Object.keys(newModels);
      return {
        models: newModels,
        activeModelId: state.activeModelId === modelId ? (ids[0] || null) : state.activeModelId,
        selectedIds: [],
      };
    });
  },

  getActiveModel: () => {
    const { models, activeModelId } = get();
    return activeModelId ? models[activeModelId] : null;
  },

  setActiveTool: (tool) => set({ activeTool: tool }),

  setZoom: (zoom) => set({ zoom: Math.max(0.2, Math.min(3, zoom)) }),
  setPan: (x, y) => set({ panX: x, panY: y }),

  addObject: (obj, targetModelId) => {
    const modelId = targetModelId || get().activeModelId;
    if (!modelId) return;
    const id = obj.id || generateId(obj.type);
    const newObj = { ...obj, id };

    set(state => {
      const model = state.models[modelId];
      if (!model) return state;

      const updatedModel = {
        ...model,
        objects: { ...model.objects, [id]: newObj },
        modifiedAt: new Date().toISOString(),
      };

      const newState = {
        models: { ...state.models, [modelId]: updatedModel },
        isDirty: true,
      };

      // Push to history
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({ type: 'add', objectId: id, data: newObj });

      return { ...newState, history: newHistory, historyIndex: newHistory.length - 1 };
    });

    return id;
  },

  updateObject: (id, updates) => {
    const { activeModelId } = get();
    if (!activeModelId) return;

    set(state => {
      const model = state.models[activeModelId];
      if (!model || !model.objects[id]) return state;

      const oldObj = model.objects[id];
      const updatedObj = { ...oldObj, ...updates };
      const updatedModel = {
        ...model,
        objects: { ...model.objects, [id]: updatedObj },
        modifiedAt: new Date().toISOString(),
      };

      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({ type: 'update', objectId: id, oldData: oldObj, newData: updatedObj });

      return {
        models: { ...state.models, [activeModelId]: updatedModel },
        isDirty: true,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  deleteSelected: () => {
    const { activeModelId, selectedIds } = get();
    if (!activeModelId || selectedIds.length === 0) return;

    set(state => {
      const model = state.models[activeModelId];
      if (!model) return state;

      const newObjects = { ...model.objects };
      const newConnections = { ...model.connections };
      const deleted = [];

      selectedIds.forEach(id => {
        if (newObjects[id]) {
          deleted.push(newObjects[id]);
          delete newObjects[id];
        }
        // Delete connections associated
        Object.keys(newConnections).forEach(connId => {
          const conn = newConnections[connId];
          if (conn.from === id || conn.to === id) {
            delete newConnections[connId];
          }
        });
        // Delete child attributes
        Object.values(newObjects).forEach(obj => {
          if (obj.owner === id) {
            deleted.push(obj);
            delete newObjects[obj.id];
          }
        });
      });

      const updatedModel = {
        ...model,
        objects: newObjects,
        connections: newConnections,
        modifiedAt: new Date().toISOString(),
      };

      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({ type: 'delete', objects: deleted });

      return {
        models: { ...state.models, [activeModelId]: updatedModel },
        selectedIds: [],
        isDirty: true,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  addConnection: (conn, targetModelId) => {
    const modelId = targetModelId || get().activeModelId;
    if (!modelId) return;
    const id = conn.id || generateId('conn');
    const newConn = { ...conn, id };

    set(state => {
      const model = state.models[modelId];
      if (!model) return state;

      return {
        models: {
          ...state.models,
          [modelId]: {
            ...model,
            connections: { ...model.connections, [id]: newConn },
            modifiedAt: new Date().toISOString(),
          },
        },
        isDirty: true,
      };
    });
    return id;
  },

  deleteConnection: (id) => {
    const { activeModelId } = get();
    if (!activeModelId) return;

    set(state => {
      const model = state.models[activeModelId];
      if (!model) return state;

      const newConnections = { ...model.connections };
      delete newConnections[id];

      return {
        models: {
          ...state.models,
          [activeModelId]: {
            ...model,
            connections: newConnections,
            modifiedAt: new Date().toISOString(),
          },
        },
        isDirty: true,
      };
    });
  },

  setSelectedIds: (ids) => set({ selectedIds: ids }),
  toggleSelected: (id) => set(state => ({
    selectedIds: state.selectedIds.includes(id)
      ? state.selectedIds.filter(sid => sid !== id)
      : [...state.selectedIds, id],
  })),

  clearSelection: () => set({ selectedIds: [] }),

  moveObjects: (ids, dx, dy) => {
    const { activeModelId } = get();
    if (!activeModelId) return;

    set(state => {
      const model = state.models[activeModelId];
      if (!model) return state;

      const newObjects = { ...model.objects };
      ids.forEach(id => {
        if (newObjects[id]) {
          newObjects[id] = {
            ...newObjects[id],
            x: newObjects[id].x + dx,
            y: newObjects[id].y + dy,
          };
        }
      });

      return {
        models: {
          ...state.models,
          [activeModelId]: { ...model, objects: newObjects, modifiedAt: new Date().toISOString() },
        },
        isDirty: true,
      };
    });
  },

  undo: () => {
    const { historyIndex, history, activeModelId } = get();
    if (historyIndex < 0) return;

    const action = history[historyIndex];
    set(state => {
      const model = state.models[activeModelId];
      if (!model) return state;

      let newObjects = { ...model.objects };
      let newConnections = { ...model.connections };

      if (action.type === 'add') {
        delete newObjects[action.objectId];
      } else if (action.type === 'update') {
        newObjects[action.objectId] = action.oldData;
      } else if (action.type === 'delete') {
        action.objects.forEach(obj => {
          newObjects[obj.id] = obj;
        });
      }

      return {
        models: {
          ...state.models,
          [activeModelId]: { ...model, objects: newObjects, connections: newConnections },
        },
        historyIndex: state.historyIndex - 1,
      };
    });
  },

  redo: () => {
    const { historyIndex, history, activeModelId } = get();
    if (historyIndex >= history.length - 1) return;

    const action = history[historyIndex + 1];
    set(state => {
      const model = state.models[activeModelId];
      if (!model) return state;

      let newObjects = { ...model.objects };

      if (action.type === 'add') {
        newObjects[action.objectId] = action.data;
      } else if (action.type === 'update') {
        newObjects[action.objectId] = action.newData;
      } else if (action.type === 'delete') {
        action.objects.forEach(obj => {
          delete newObjects[obj.id];
        });
      }

      return {
        models: {
          ...state.models,
          [activeModelId]: { ...model, objects: newObjects },
        },
        historyIndex: state.historyIndex + 1,
      };
    });
  },

  // File operations — .brM export (all models)
  saveToFile: () => {
    const { models } = get();
    const model = get().getActiveModel();
    exportBrM(models, { name: model?.name || 'projeto' });
    set({ isDirty: false });
  },

  // Open .brM file
  openFile: async () => {
    try {
      const data = await openFilePicker();
      if (data.models) {
        set(state => {
          const newModels = { ...state.models };
          for (const [id, m] of Object.entries(data.models)) {
            newModels[m.id || id] = {
              ...m,
              objects: m.objects || {},
              connections: m.connections || {},
            };
          }
          const firstId = Object.keys(data.models)[0];
          const modelData = data.models[firstId];
          return {
            models: newModels,
            activeModelId: modelData?.id || firstId,
            isDirty: false,
            zoom: modelData?.canvas?.zoom || 1,
            panX: modelData?.canvas?.panX || 0,
            panY: modelData?.canvas?.panY || 0,
          };
        });
      }
    } catch (e) {
      console.error('Open file failed:', e);
      alert(e.message);
    }
  },

  loadFromFile: (fileContent) => {
    try {
      const data = JSON.parse(fileContent);
      const model = {
        id: generateId('model'),
        name: data.metadata?.name || 'Imported',
        type: data.type || 'conceptual',
        version: data.version || '3.0.0',
        author: data.metadata?.author || '',
        notes: data.metadata?.notes || '',
        objects: {},
        connections: {},
        createdAt: data.metadata?.created || new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      };

      if (data.objects) {
        data.objects.forEach(obj => {
          model.objects[obj.id] = obj;
        });
      }
      if (data.connections) {
        data.connections.forEach(conn => {
          model.connections[conn.id] = conn;
        });
      }

      set(state => ({
        models: { ...state.models, [model.id]: model },
        activeModelId: model.id,
        selectedIds: [],
        zoom: data.canvas?.zoom || 1,
        panX: data.canvas?.panX || 0,
        panY: data.canvas?.panY || 0,
        isDirty: false,
      }));
    } catch (e) {
      console.error('Failed to parse .brM file:', e);
    }
  },

  // Auto-save to localStorage
  autoSave: () => {
    const state = get();
    try {
      localStorage.setItem('brmodelo-models', JSON.stringify(state.models));
      localStorage.setItem('brmodelo-activeModelId', state.activeModelId || '');
    } catch (e) {
      console.error('Auto-save failed:', e);
    }
  },

  loadFromStorage: () => {
    try {
      const modelsJson = localStorage.getItem('brmodelo-models');
      const activeModelId = localStorage.getItem('brmodelo-activeModelId');
      if (modelsJson) {
        const models = JSON.parse(modelsJson);
        set({ models, activeModelId: activeModelId || Object.keys(models)[0] || null });
      }
    } catch (e) {
      console.error('Load from storage failed:', e);
    }
  },

  updateModelInfo: (field, value) => {
    const { activeModelId } = get();
    if (!activeModelId) return;
    set(state => ({
      models: {
        ...state.models,
        [activeModelId]: { ...state.models[activeModelId], [field]: value },
      },
    }));
  },
}));

export default useModelStore;
