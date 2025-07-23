// src/components/HomePage.jsx
import React, { useRef } from 'react';

const HomePage = ({ onStartDesigning, onLoadProject }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const projectData = JSON.parse(event.target.result);
          onLoadProject(projectData);
        } catch (error) {
          console.error('Error parsing project file:', error);
          alert('Invalid project file format');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-indigo-700 mb-6">
          Pixellab Web
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Create stunning graphic designs right in your browser. Add text, images, shapes, and effects to craft beautiful visuals.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'Text Effects', desc: 'Shadow, stroke, 3D, curved text' },
            { title: 'Image Editing', desc: 'Upload, resize, rotate, position' },
            { title: 'Export Options', desc: 'PNG with transparency, project files' }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-indigo-700 text-xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onStartDesigning}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105"
          >
            Start Designing
          </button>
          
          <button 
            onClick={() => fileInputRef.current.click()}
            className="bg-white hover:bg-gray-100 text-indigo-600 font-bold py-3 px-8 rounded-lg text-lg border-2 border-indigo-600 transition duration-300"
          >
            Load Project
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".plp,.json" 
              onChange={handleFileUpload}
            />
          </button>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-2xl h-64 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 rounded-lg p-4 w-64 shadow-lg">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3" />
                <div className="bg-indigo-500 w-32 h-3 rounded mx-auto mb-2" />
                <div className="bg-indigo-400 w-24 h-3 rounded mx-auto mb-2" />
                <div className="flex justify-center space-x-2 mt-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-600"></div>
                  <div className="w-8 h-8 rounded-full bg-pink-500"></div>
                  <div className="w-8 h-8 rounded-full bg-yellow-400"></div>
                  <div className="w-8 h-8 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
