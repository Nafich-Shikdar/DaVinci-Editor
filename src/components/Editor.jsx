// src/components/Editor.jsx
import React, { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import { saveAs } from 'file-saver';
import Toolbar from './Editor/Toolbar';
import LayersPanel from './Editor/LayersPanel';
import PropertiesPanel from './Editor/PropertiesPanel';
import FontLoader from './Editor/FontLoader';
import ProjectManager from './Editor/ProjectManager';

const Editor = ({ projectData, onExit }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [activeTool, setActiveTool] = useState('select');
  const [selectedObject, setSelectedObject] = useState(null);
  const [fonts, setFonts] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showFontLoader, setShowFontLoader] = useState(false);
  const [showProjectManager, setShowProjectManager] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const initCanvas = new fabric.Canvas('canvas', {
      width: 800,
      height: 600,
      backgroundColor: 'transparent',
      preserveObjectStacking: true,
    });
    
    setCanvas(initCanvas);
    saveToHistory(initCanvas);
    
    // Event listeners
    initCanvas.on('selection:created', handleSelection);
    initCanvas.on('selection:updated', handleSelection);
    initCanvas.on('selection:cleared', () => setSelectedObject(null));
    initCanvas.on('object:modified', () => saveToHistory(initCanvas));
    initCanvas.on('object:added', () => saveToHistory(initCanvas));
    initCanvas.on('object:removed', () => saveToHistory(initCanvas));
    
    return () => {
      initCanvas.dispose();
    };
  }, []);

  // Load project data if provided
  useEffect(() => {
    if (projectData && canvas) {
      canvas.loadFromJSON(projectData, () => {
        canvas.renderAll();
        saveToHistory(canvas);
      });
    }
  }, [projectData, canvas]);

  const handleSelection = (e) => {
    setSelectedObject(e.selected[0]);
  };

  const saveToHistory = (canvasInstance) => {
    const newHistory = [...history.slice(0, historyIndex + 1), JSON.stringify(canvasInstance)];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex <= 0) return;
    const prevState = history[historyIndex - 1];
    canvas.loadFromJSON(prevState, () => {
      canvas.renderAll();
      setHistoryIndex(historyIndex - 1);
    });
  };

  const redo = () => {
    if (historyIndex >= history.length - 1) return;
    const nextState = history[historyIndex + 1];
    canvas.loadFromJSON(nextState, () => {
      canvas.renderAll();
      setHistoryIndex(historyIndex + 1);
    });
  };

  const addText = () => {
    const text = new fabric.Textbox('Edit me', {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#000000',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    setSelectedObject(text);
  };

  const addShape = (shape) => {
    let newShape;
    switch (shape) {
      case 'rectangle':
        newShape = new fabric.Rect({
          width: 100,
          height: 100,
          fill: '#4f46e5',
          left: 150,
          top: 150,
        });
        break;
      case 'circle':
        newShape = new fabric.Circle({
          radius: 50,
          fill: '#ec4899',
          left: 150,
          top: 150,
        });
        break;
      case 'triangle':
        newShape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: '#0ea5e9',
          left: 150,
          top: 150,
        });
        break;
      case 'arrow':
        newShape = new fabric.Path('M 0 0 L 50 50 L 40 50 L 50 40 Z', {
          left: 100,
          top: 100,
          fill: '#10b981',
        });
        break;
      default:
        return;
    }
    canvas.add(newShape);
    canvas.setActiveObject(newShape);
    setSelectedObject(newShape);
  };

  const addImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, (img) => {
        img.scaleToWidth(200);
        canvas.add(img);
        canvas.setActiveObject(img);
        setSelectedObject(img);
      });
    };
    reader.readAsDataURL(file);
    e.target.value = null; // Reset input
  };

  const exportAsPNG = () => {
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2
    });
    saveAs(dataURL, 'design.png');
  };

  const exportProject = () => {
    const project = JSON.stringify(canvas);
    const blob = new Blob([project], { type: 'application/json' });
    saveAs(blob, 'project.plp');
  };

  const handlePropertyChange = (property, value) => {
    if (!selectedObject) return;
    
    selectedObject.set(property, value);
    
    if (property === 'text') {
      selectedObject.set('dirty', true);
    }
    
    canvas.renderAll();
    saveToHistory(canvas);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white shadow-md py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={onExit}
            className="flex items-center text-gray-600 hover:text-indigo-700 mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Home
          </button>
          <h1 className="text-xl font-bold text-indigo-700 hidden md:block">Pixellab Editor</h1>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={undo}
            disabled={historyIndex <= 0}
            className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Undo
          </button>
          <button 
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Redo
          </button>
          <button 
            onClick={exportAsPNG}
            className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Export PNG
          </button>
          <button 
            onClick={() => setShowProjectManager(true)}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
          >
            Save Project
          </button>
        </div>
      </div>
      
      {/* Main Editor Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <Toolbar 
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          addText={addText}
          addShape={addShape}
          addImage={addImage}
          setShowFontLoader={() => setShowFontLoader(true)}
        />
        
        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <canvas 
              id="canvas"
              ref={canvasRef}
              className="border border-gray-300"
            />
          </div>
        </div>
        
        {/* Right Panels */}
        <div className="w-72 bg-white shadow-inner flex flex-col">
          {selectedObject ? (
            <PropertiesPanel 
              selectedObject={selectedObject}
              onPropertyChange={handlePropertyChange}
              fonts={fonts}
            />
          ) : (
            <div className="p-4 text-center text-gray-500">
              Select an object to edit its properties
            </div>
          )}
          
          <div className="border-t border-gray-200 mt-auto">
            <LayersPanel 
              canvas={canvas}
              selectedObject={selectedObject}
              setSelectedObject={setSelectedObject}
            />
          </div>
        </div>
      </div>
      
      {/* Modals */}
      {showFontLoader && (
        <FontLoader 
          onClose={() => setShowFontLoader(false)}
          fonts={fonts}
          setFonts={setFonts}
        />
      )}
      
      {showProjectManager && (
        <ProjectManager 
          onClose={() => setShowProjectManager(false)}
          canvas={canvas}
        />
      )}
    </div>
  );
};

export default Editor;
