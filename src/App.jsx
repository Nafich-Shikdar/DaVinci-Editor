// src/App.jsx
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import Editor from './components/Editor';

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [projectData, setProjectData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {isEditing ? (
        <Editor 
          projectData={projectData} 
          onExit={() => setIsEditing(false)}
        />
      ) : (
        <HomePage 
          onStartDesigning={() => setIsEditing(true)} 
          onLoadProject={(data) => {
            setProjectData(data);
            setIsEditing(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
