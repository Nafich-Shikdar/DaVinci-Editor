// src/components/Editor/LayersPanel.jsx
import React from 'react';

const LayersPanel = ({ canvas, selectedObject, setSelectedObject }) => {
  if (!canvas) return null;
  
  const moveLayer = (object, direction) => {
    switch (direction) {
      case 'up':
        object.bringForward();
        break;
      case 'down':
        object.sendBackwards();
        break;
      case 'top':
        object.bringToFront();
        break;
      case 'bottom':
        object.sendToBack();
        break;
      default:
        break;
    }
    canvas.renderAll();
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-700 mb-3">Layers</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {canvas.getObjects().map((obj, index) => (
          <div 
            key={obj.id || index}
            onClick={() => {
              canvas.setActiveObject(obj);
              setSelectedObject(obj);
            }}
            className={`flex items-center justify-between p-2 rounded ${
              selectedObject === obj 
                ? 'bg-indigo-100 border border-indigo-300' 
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 rounded mr-2 bg-gray-200 border border-gray-300 flex items-center justify-center">
                {obj.type === 'textbox' ? 'T' : obj.type === 'image' ? 'I' : 'S'}
              </div>
              <span className="text-sm truncate max-w-[120px]">
                {obj.type === 'textbox' ? obj.text || 'Text' : obj.type}
              </span>
            </div>
            <div className="flex space-x-1">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  moveLayer(obj, 'up');
                }}
                className="text-gray-500 hover:text-indigo-600"
                title="Bring Forward"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  moveLayer(obj, 'down');
                }}
                className="text-gray-500 hover:text-indigo-600"
                title="Send Backward"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  canvas.remove(obj);
                  canvas.renderAll();
                  if (selectedObject === obj) {
                    setSelectedObject(null);
                  }
                }}
                className="text-gray-500 hover:text-red-600"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayersPanel;
