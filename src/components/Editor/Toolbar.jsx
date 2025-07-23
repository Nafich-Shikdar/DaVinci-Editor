// src/components/Editor/Toolbar.jsx
import React from 'react';

const Toolbar = ({ activeTool, setActiveTool, addText, addShape, addImage, setShowFontLoader }) => {
  const tools = [
    { id: 'select', name: 'Select', icon: 'cursor' },
    { id: 'text', name: 'Text', icon: 'text' },
    { id: 'image', name: 'Image', icon: 'image' },
    { id: 'draw', name: 'Draw', icon: 'pencil' },
    { id: 'shapes', name: 'Shapes', icon: 'shapes' },
  ];

  const shapes = [
    { id: 'rectangle', name: 'Rectangle', icon: 'square' },
    { id: 'circle', name: 'Circle', icon: 'circle' },
    { id: 'triangle', name: 'Triangle', icon: 'triangle' },
    { id: 'arrow', name: 'Arrow', icon: 'arrow' },
  ];

  const renderIcon = (icon) => {
    switch (icon) {
      case 'cursor':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        );
      case 'text':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
          </svg>
        );
      case 'image':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case 'pencil':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        );
      case 'shapes':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.789l-4.764-2.382a1 1 0 00-.894 0L4.789 4.487a1 1 0 000 1.789l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
        );
      case 'square':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <rect x="3" y="3" width="14" height="14" rx="2" />
          </svg>
        );
      case 'circle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <circle cx="10" cy="10" r="7" />
          </svg>
        );
      case 'triangle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3L3 17h14L10 3z" />
          </svg>
        );
      case 'arrow':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-16 bg-white shadow-md flex flex-col items-center py-4">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => setActiveTool(tool.id)}
          className={`w-12 h-12 flex items-center justify-center rounded-lg mb-3 ${
            activeTool === tool.id
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title={tool.name}
        >
          {renderIcon(tool.icon)}
        </button>
      ))}
      
      <div className="border-t border-gray-200 w-10 mx-auto my-3"></div>
      
      {/* Additional actions */}
      {activeTool === 'text' && (
        <button
          onClick={addText}
          className="w-12 h-12 flex items-center justify-center rounded-lg mb-3 text-gray-600 hover:bg-gray-100"
          title="Add Text"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      
      {activeTool === 'image' && (
        <label
          className="w-12 h-12 flex items-center justify-center rounded-lg mb-3 text-gray-600 hover:bg-gray-100 cursor-pointer"
          title="Upload Image"
        >
          <input type="file" accept="image/*" className="hidden" onChange={addImage} />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </label>
      )}
      
      {activeTool === 'shapes' && (
        <div className="flex flex-col">
          {shapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => addShape(shape.id)}
              className="w-12 h-12 flex items-center justify-center rounded-lg mb-3 text-gray-600 hover:bg-gray-100"
              title={shape.name}
            >
              {renderIcon(shape.icon)}
            </button>
          ))}
        </div>
      )}
      
      <button
        onClick={setShowFontLoader}
        className="w-12 h-12 flex items-center justify-center rounded-lg mt-3 text-gray-600 hover:bg-gray-100"
        title="Add Fonts"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default Toolbar;
