import { useEffect, useCallback } from 'react';
import MenuBar from './components/MenuBar';
import TopBar from './components/TopBar';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import PropertyPanel from './components/PropertyPanel';
import StatusBar from './components/StatusBar';
import useModelStore from './stores/useModelStore';
import { Github } from 'lucide-react';
import './index.css';

export default function App() {
  const {
    createModel, loadFromStorage, autoSave,
    undo, redo, deleteSelected, isDirty, saveToFile, loadFromFile,
  } = useModelStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      autoSave();
    }, 30000);
    return () => clearInterval(interval);
  }, [autoSave]);

  // Auto-save on model change
  useEffect(() => {
    if (isDirty) {
      const timeout = setTimeout(() => autoSave(), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isDirty, autoSave]);

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
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50">
      <MenuBar />
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Toolbar />
        <Canvas />
        <PropertyPanel />
      </div>
      <StatusBar />

      {/* Floating GitHub Link */}
      <a
        href="https://github.com/IgorMMichels/webmodelo.git"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-6 right-6 p-2.5 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 rounded-full shadow-lg hover:bg-white hover:text-purple-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-50 flex items-center justify-center cursor-pointer group"
        title="Ver no GitHub"
      >
        <Github size={18} />
      </a>
    </div>
  );
}
