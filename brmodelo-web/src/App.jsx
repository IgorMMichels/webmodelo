import { useEffect, useCallback } from 'react';
import MenuBar from './components/MenuBar';
import TopBar from './components/TopBar';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import PropertyPanel from './components/PropertyPanel';
import StatusBar from './components/StatusBar';
import useModelStore from './stores/useModelStore';
import './index.css';

export default function App() {
  const {
    activeModelId, createModel, loadFromStorage, autoSave,
    undo, redo, deleteSelected, isDirty, saveToFile, loadFromFile,
  } = useModelStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      autoSave();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Auto-save on model change
  useEffect(() => {
    if (isDirty) {
      const timeout = setTimeout(() => autoSave(), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isDirty]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e) => {
    const ctrl = e.ctrlKey || e.metaKey;

    if (ctrl && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
    }
    if ((ctrl && e.key === 'y') || (ctrl && e.shiftKey && e.key === 'z')) {
      e.preventDefault();
      redo();
    }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        deleteSelected();
      }
    }
    if (ctrl && e.key === 's') {
      e.preventDefault();
      saveToFile();
    }
    if (ctrl && e.key === 'o') {
      e.preventDefault();
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.brM,.json';
      input.onchange = (ev) => {
        const file = ev.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => loadFromFile(re.target.result);
          reader.readAsText(file);
        }
      };
      input.click();
    }
    if (ctrl && e.key === 'n') {
      e.preventDefault();
      createModel('conceptual');
    }
  }, [undo, redo, deleteSelected, saveToFile, loadFromFile, createModel]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="app-layout">
      <MenuBar />
      <TopBar />
      <div className="app-body">
        <Toolbar />
        <Canvas />
        <PropertyPanel />
      </div>
      <StatusBar />
    </div>
  );
}
