import React, { useState, useEffect, useRef } from 'react'
import './AllInvoices.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function AllInvoices() {
    const [invoices, setInvoices] = useState([])
    const [searchInvoice, setSearchInvoice] = useState('')
    const [selectedInvoice, setSelectedInvoice] = useState(null)
    const fetchInvoices = useRef(null);

    useEffect(function() {
        async function fetchInvoices() {
            try {
                const response = await fetch('/api/invoices')
                if (response.ok) {
                    const data = await response.json()
                    console.log('invoices:', data.invoices)
                    setInvoices(data.invoices)
                } else {
                    console.error("failed to fetch invoice")
                }
            } catch (error) {
                console.error('Error fetching invoices:', error)
            }
        }
        fetchInvoices()
    }, [])

    function handleSearchInvoiceChange(event) {
        setSearchInvoice(event.target.value)

        if (event.target.value.trim() !=='') {
            fetchInvoices.current()
        }
    }

    async function handleDelete() {
        try {
            const response = await fetch(`/api/invoices/${selectedInvoice._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('invoice deleted successfully')
                setSelectedInvoice(null);
            } else {
                console.error('Failed to delete invoice');
            }
        } catch (error) {
            console.error('Error deleting invoice:', error);
        }
    }

    function handleClick(selectedInvoice) {
        setSelectedInvoice(selectedInvoice);
    }


// search bar logic. Can search by invoice#, item name, or paid/unpaid
    const filteredInvoices = invoices.filter(function (invoice) {
        const searchTerm = searchInvoice.toLocaleLowerCase()
        return (
            invoice.invoiceNumber.includes(searchInvoice) ||
            invoice.itemName.toLowerCase().includes(searchInvoice.toLowerCase()) ||
            (searchTerm === 'paid' && invoice.paid) ||
            (searchTerm === 'unpaid' && !invoice.paid)
            )
    })

    return (
    <div>
      <h1>Invoice</h1>
      <div className="search-container">
        <input
          type="text"
          id="search"
          value={searchInvoice}
          onChange={handleSearchInvoiceChange}
          placeholder="Search by Invoice Number or Name"
        />
        <label htmlFor="search">
          <FontAwesomeIcon icon={faSearch} />
        </label>
      </div>
      {searchInvoice.trim() !== '' && (
        <div className="invoice-containers">
            {/* iterate over invoices and separate into paid and unpaid */}
          {filteredInvoices.map((invoice) => (
            <div 
            key={invoice._id} 
            className= {`invoice-container ${invoice.paid ? 'paid' : 'unpaid'}`}
            onClick={() => handleClick(invoice)}
            >
              <p>Invoice Number: {invoice.invoiceNumber}</p>
              <p>Item Name: {invoice.itemName}</p>
              <p>Supplier: {invoice.supplier}</p>
            </div>
          ))}
        </div>
      )}
      {selectedInvoice && (
                <div className="invoice-details">
                    <button className="close-button" onClick={() => setSelectedInvoice(null)}>X</button>
                    <h2>Selected Invoice Details</h2>
                    <p><strong>Invoice Number:</strong> {selectedInvoice.invoiceNumber}</p>
                    <p><strong>Item Name:</strong> {selectedInvoice.itemName}</p>
                    <p><strong>Price:</strong> ${selectedInvoice.price}</p>
                    <p><strong>Supplier:</strong> {selectedInvoice.supplier}</p>
                    <p><strong>Paid:</strong> {selectedInvoice.paid.toString().toUpperCase()}</p>
                    <button onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                </div>
      )}
    </div>
    )
}