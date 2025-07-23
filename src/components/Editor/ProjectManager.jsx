// src/components/Editor/ProjectManager.jsx
import React, { useState } from 'react';

const ProjectManager = ({ onClose, canvas }) => {
  const [projectName, setProjectName] = useState('My Design');
  const [isSaving, setIsSaving] = useState(false);
  const [savedProjects, setSavedProjects] = useState(() => {
    const saved = localStorage.getItem('pixellab-projects');
    return saved ? JSON.parse(saved) : [];
  });

  const saveProject = () => {
    if (!canvas) return;
    
    setIsSaving(true);
    
    const projectData = JSON.stringify(canvas);
    const project = {
      id: Date.now(),
      name: projectName,
      data: projectData,
      date: new Date().toISOString(),
    };
    
    const updatedProjects = [...savedProjects, project];
    setSavedProjects(updatedProjects);
    localStorage.setItem('pixellab-projects', JSON.stringify(updatedProjects));
    
    setIsSaving(false);
    setProjectName('My Design');
  };

  const loadProject = (project) => {
    canvas.loadFromJSON(project.data, () => {
      canvas.renderAll();
      onClose();
    });
  };

  const deleteProject = (id) => {
    const updatedProjects = savedProjects.filter(project => project.id !== id);
    setSavedProjects(updatedProjects);
    localStorage.setItem('pixellab-projects', JSON.stringify(updatedProjects));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Project Manager</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Save Current Project</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter project name"
                />
              </div>
              <button 
                onClick={saveProject}
                disabled={isSaving}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Saved Projects</h4>
            {savedProjects.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No saved projects</p>
            ) : (
              <div className="max-h-60 overflow-y-auto border rounded divide-y">
                {savedProjects.map((project) => (
                  <div key={project.id} className="p-3 flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(project.date).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => loadProject(project)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        Load
                      </button>
                      <button 
                        onClick={() => deleteProject(project.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;
