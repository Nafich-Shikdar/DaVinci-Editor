// src/components/Editor/PropertiesPanel.jsx
import React from 'react';

const PropertiesPanel = ({ selectedObject, onPropertyChange, fonts }) => {
  if (!selectedObject) return null;

  const renderProperties = () => {
    const commonProperties = (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500">X</label>
              <input
                type="number"
                value={selectedObject.left}
                onChange={(e) => onPropertyChange('left', parseFloat(e.target.value))}
                className="w-full p-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Y</label>
              <input
                type="number"
                value={selectedObject.top}
                onChange={(e) => onPropertyChange('top', parseFloat(e.target.value))}
                className="w-full p-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rotation</label>
          <input
            type="range"
            min="0"
            max="360"
            value={selectedObject.angle || 0}
            onChange={(e) => onPropertyChange('angle', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-right text-xs text-gray-500">{selectedObject.angle || 0}°</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Opacity</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={selectedObject.opacity || 1}
            onChange={(e) => onPropertyChange('opacity', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-right text-xs text-gray-500">{Math.round((selectedObject.opacity || 1) * 100)}%</div>
        </div>
      </div>
    );

    switch (selectedObject.type) {
      case 'textbox':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
              <textarea
                value={selectedObject.text}
                onChange={(e) => onPropertyChange('text', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
              <select
                value={selectedObject.fontFamily || 'Arial'}
                onChange={(e) => onPropertyChange('fontFamily', e.target.value)}
                className="w-full p-1 border border-gray-300 rounded text-sm"
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Courier New</option>
                {fonts.map((font) => (
                  <option key={font.name} value={font.name}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <input
                type="range"
                min="8"
                max="120"
                value={selectedObject.fontSize}
                onChange={(e) => onPropertyChange('fontSize', parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-right text-xs text-gray-500">{selectedObject.fontSize}px</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input
                type="color"
                value={selectedObject.fill}
                onChange={(e) => onPropertyChange('fill', e.target.value)}
                className="w-full h-8"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stroke Color</label>
                <input
                  type="color"
                  value={selectedObject.stroke || '#000000'}
                  onChange={(e) => onPropertyChange('stroke', e.target.value)}
                  className="w-full h-8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stroke Width</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={selectedObject.strokeWidth || 0}
                  onChange={(e) => onPropertyChange('strokeWidth', parseFloat(e.target.value))}
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {commonProperties}
          </div>
        );

      case 'rect':
      case 'circle':
      case 'triangle':
      case 'path':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fill Color</label>
              <input
                type="color"
                value={selectedObject.fill}
                onChange={(e) => onPropertyChange('fill', e.target.value)}
                className="w-full h-8"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stroke Color</label>
                <input
                  type="color"
                  value={selectedObject.stroke || '#000000'}
                  onChange={(e) => onPropertyChange('stroke', e.target.value)}
                  className="w-full h-8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stroke Width</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={selectedObject.strokeWidth || 0}
                  onChange={(e) => onPropertyChange('strokeWidth', parseFloat(e.target.value))}
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {selectedObject.type === 'rect' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                  <input
                    type="number"
                    min="1"
                    value={selectedObject.width}
                    onChange={(e) => onPropertyChange('width', parseFloat(e.target.value))}
                    className="w-full p-1 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                  <input
                    type="number"
                    min="1"
                    value={selectedObject.height}
                    onChange={(e) => onPropertyChange('height', parseFloat(e.target.value))}
                    className="w-full p-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            )}

            {commonProperties}
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                <input
                  type="number"
                  min="1"
                  value={selectedObject.width * selectedObject.scaleX}
                  onChange={(e) => {
                    const newScale = parseFloat(e.target.value) / selectedObject.width;
                    onPropertyChange('scaleX', newScale);
                  }}
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                <input
                  type="number"
                  min="1"
                  value={selectedObject.height * selectedObject.scaleY}
                  onChange={(e) => {
                    const newScale = parseFloat(e.target.value) / selectedObject.height;
                    onPropertyChange('scaleY', newScale);
                  }}
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {commonProperties}
          </div>
        );

      default:
        return commonProperties;
    }
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-700 mb-4">Properties</h3>
      {renderProperties()}
    </div>
  );
};

export default PropertiesPanel;
