// src/components/Editor/FontLoader.jsx
import React, { useState } from 'react';

const FontLoader = ({ onClose, fonts, setFonts }) => {
  const [fontName, setFontName] = useState('');
  const [fontFile, setFontFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    const validTypes = ['font/ttf', 'font/otf', 'application/x-font-ttf', 'application/x-font-otf'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a TTF or OTF font file.');
      return;
    }
    
    // Extract font name from filename if not provided
    if (!fontName) {
      const name = file.name.replace(/\.[^/.]+$/, "");
      setFontName(name);
    }
    
    setFontFile(file);
    setError('');
  };

  const handleSubmit = () => {
    if (!fontName || !fontFile) {
      setError('Please provide a font name and select a file');
      return;
    }
    
    if (fonts.some(f => f.name === fontName)) {
      setError('A font with this name is already loaded');
      return;
    }
    
    setIsLoading(true);
    
    // Create a URL for the font file
    const fontUrl = URL.createObjectURL(fontFile);
    
    // Create a new FontFace object
    const fontFace = new FontFace(fontName, `url(${fontUrl})`);
    
    // Load the font
    fontFace.load().then((loadedFont) => {
      // Add the font to the document
      document.fonts.add(loadedFont);
      
      // Add to our fonts state
      setFonts([...fonts, { name: fontName, url: fontUrl }]);
      
      // Reset form
      setFontName('');
      setFontFile(null);
      setIsLoading(false);
      setError('');
    }).catch((err) => {
      console.error('Error loading font:', err);
      setError('Failed to load font. Please try another file.');
      setIsLoading(false);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add Custom Font</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Name</label>
            <input
              type="text"
              value={fontName}
              onChange={(e) => setFontName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter font name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font File (TTF/OTF)</label>
            <label className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-indigo-500">
              <div className="flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-600 mt-2">
                  {fontFile ? fontFile.name : 'Click to select a font file'}
                </p>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".ttf,.otf" 
                  onChange={handleFileChange}
                />
              </div>
            </label>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isLoading || !fontFile}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Add Font'}
            </button>
          </div>
          
          {fonts.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-2">Loaded Fonts</h4>
              <div className="max-h-40 overflow-y-auto border rounded p-2">
                {fonts.map((font, index) => (
                  <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50">
                    <span className="font-medium" style={{ fontFamily: font.name }}>{font.name}</span>
                    <button 
                      onClick={() => {
                        const newFonts = fonts.filter(f => f.name !== font.name);
                        setFonts(newFonts);
                        // Remove from document fonts?
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FontLoader;
