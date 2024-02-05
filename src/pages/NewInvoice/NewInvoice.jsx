import React, { useEffect, useState } from 'react';
import './NewInvoice.css';

function NewInvoice({ user}) {

    const [formData, setFormData] = useState({
        itemName: '',
        price: '',
        supplier: '',
        invoiceNumber: '',
        project: '',
        paid: false,
    })

    const [invoiceNum, setInvoiceNum] = useState('');
    function invoiceNumGen() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = '';
        for (let i = 0; i < 8; i++) {
            result +=chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result;
    }

    const [project, setProject] = useState([]);
    useEffect(function () {
        fetchProjects()
    }, [])

    async function fetchProjects() {
        try {
            const response = await fetch('/api/projects');
            if (response.ok) {
                const projectsData = await response.json();
                setProject(projectsData.projects);
            } else {
                console.error('Failed to fetch projects');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const newInvoiceNum = invoiceNumGen();
        setInvoiceNum(newInvoiceNum)
        
        try {
            const response = await fetch('/api/invoices', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    itemName: formData.itemName,
                    price: formData.price,
                    supplier: formData.supplier,
                    invoiceNumber: newInvoiceNum,
                    user: user._id,
                    project: formData.project,
                    paid: formData.paid,
                })
            })
            if (response.ok) {
                console.log('Invoice Form Data Submitted:', formData)
                console.log("Invoice #:", newInvoiceNum)
                setFormData({
                    itemName: '',
                    price: '',
                    supplier: '',
                    invoiceNumber: '',
                    project: '',
                    paid: false,
                })
            } else {
                console.error('Failed to create invoice')
            }
        } catch (error) {
            console.error('Invoice creating error:', error)
        }
    }

    function handleInputChange(event) {
        const {name, value, type, checked} = event.target;
        //if checkbox is checked, set inputValue to true else set to false
        const inputValue = type === 'checkbox' ? checked: value;
        setFormData({ ...formData, [name]: inputValue })
    }


    return (
        <div >
            <h2>Add Invoice Item</h2>
            <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <label>
                    Item Name:
                    <input 
                        type="text"
                        name='itemName'
                        value={formData.itemName}
                        onChange={handleInputChange}
                        required
                        />
                </label>
                <br />

                <label>
                    Price:
                    <input 
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                         />
                </label>
                <br />

                <label>
                    Supplier:
                    <input 
                        type="text"
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleInputChange}
                        required 
                        />
                </label>
                <br />

                <label>
                    Project:
                    <select
                        name="project"
                        value={formData.project}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>Select a project</option>
                        {project.map(function (project) {
                            return (
                                <option key={project._id} value={project._id}>
                                    {project.projectName}
                                </option>
                            );
                        })}
                    </select>
                </label>
                <br />

                <label >
                    Paid:
                    <input 
                        type='checkbox' 
                        name='paid'
                        checked={formData.paid}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Create Invoice</button>
            </form>
        </div>
       </div> 
    )
}




export default NewInvoice;