import React, { useState, useEffect } from 'react';
import ProjectDetails from '../../pages/ProjectDetails/ProjectDetails';
import './AllProjects.css';


export default function AllProjects() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null)
    const allProjects = [];

    function handleClick(project) {
        setSelectedProject(project);
    }

    function handleClose() {
        setSelectedProject(null);
    }

    useEffect(function () {
        async function fetchProjects() {
            try {
                const response = await fetch('/api/projects');
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data.projects);
                } else {
                    console.error('Failed to fetch projects');
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }

        fetchProjects();
    }, []);

    return (
        <div className='All-Projects'>
            <h2>All Projects</h2>
            <div className="project-container">
        {projects.map((project) => (
          <div
            key={project._id}
            className="project-box"
            onClick={() => handleClick(project)}
          >
            {project.projectName}
          </div>
        ))}
      </div>
      {selectedProject && (
        <ProjectDetails project={selectedProject} onClose={handleClose} />
      )}
    </div>
    );
}