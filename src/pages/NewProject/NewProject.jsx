import React, { useState } from 'react';
import './NewProject.css';

function NewProject({ user }) {
    const [formData, setFormData] = useState({
        projectName: '',
        client: '',
        dueDate: '',
        description: '',
    })

    const [projectCreated, setProjectCreated] = useState(false)

    function handleInputChange(event) {
        const {name, value} = event.target
        setFormData({ ... formData, [name]: value })
        console.log('formData:', formData);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('formData before API call:', formData);

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    projectName: formData.projectName,
                    client: formData.client,
                    dueDate: formData.dueDate,
                    description: formData.description,
                    user: user._id,
                })
            });
    
            if (response.ok) {
                console.log('Project Form Data Submitted:', formData);
                setFormData({
                    projectName: '',
                    client: '',
                    dueDate: '',
                    description: '',
                });
                setProjectCreated(true);
            } else {
                console.error('Failed to create project');
            }
        } catch (error) {
            console.error('Project creating error:', error);
        }
    }
    
    const isAdmin = user && user.role === 'admin'
    console.log(user, isAdmin)

    if (!isAdmin) {
        return <div>Only management has permission to create a new project</div>
    }

    return (
        <div>
            <h2>Create New Project</h2>
            <div className='form-container'>
            {projectCreated && <p>Project created</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Project Name:
                    <input 
                        type="text"
                        name='projectName'
                        value={formData.projectName}
                        onChange={handleInputChange}
                        required
                         />
                </label>
                <br />

                <label>
                    Client:
                    <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Project Due Date:
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Project Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <button type='submit'>Create Project</button>
            </form>
        </div>
       </div>
    )
}

export default NewProject