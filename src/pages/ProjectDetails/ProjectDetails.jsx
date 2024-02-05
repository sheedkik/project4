import React, { useState, useEffect } from 'react';
import './ProjectDetails.css';

export default function ProjectDetails(props) {
    const [invoices, setInvoices] = useState([]);

    useEffect(function () {
        async function fetchInvoices() {
            try {
                const response = await fetch(`/api/projects/${props.project._id}/invoices`);
                if (response.ok) {
                    const data = await response.json();
                    setInvoices(data.invoices);
                } else {
                    console.error('Failed to fetch invoices');
                }
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        }

        if (props.project) {
            fetchInvoices();
        }
    }, [props.project]);

    const totalPrice = invoices
        .filter(function (invoice) {
            return !invoice.paid;
        })
        .reduce(function (total, invoice) {
            return total + invoice.price;
        }, 0);

    const formattedDueDate = new Date(props.project.dueDate).toLocaleDateString('en-US')

    // popup view of project details to show all information of specific project.
    
    return (
        <div className="project-details">
            <button className='close-button' onClick={props.onClose}>X</button>
            <h3><strong>Project Details</strong></h3>
            <p><strong>Project Name:</strong> {props.project.projectName}</p>
            <p><strong>Client:</strong> {props.project.client}</p>
            <p><strong>Due Date:</strong> {formattedDueDate}</p>
            <p><strong>Description:</strong> {props.project.description}</p>

            <h4>Invoices</h4>
            <ul>

{/* //iterate through the invoices to see if any are tied to this specific project and display those invoices */}

                {invoices.map(function (invoice) {
                    return (
                        <li key={invoice._id}>
                            <strong>Invoice Number:</strong> {invoice.invoiceNumber}, <strong>Invoice Item:</strong> {invoice.itemName}, <strong>Price:</strong> ${invoice.price}, <strong>Paid:</strong> {invoice.paid.toString().toUpperCase()}
                        </li>
                    );
                })}
            </ul>
            <div className='total'>
                <h4>Unpaid Total: ${totalPrice}</h4>
            </div>
        </div>
    );
}