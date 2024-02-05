const Invoice = require('../../models/invoice')

async function create(req, res) {
    try {
        const { itemName, price, supplier, invoiceNumber, user, project, paid } = req.body

        const newInvoice = new Invoice ({
            itemName,
            price,
            supplier,
            invoiceNumber,
            user,
            project: req.body.project,
            paid,
        })

        await newInvoice.save()
        res.status(201).json({message: 'invoice created successfully', invoice: newInvoice})
    } catch (error) {
        console.error('Invoice creating error:', error)
        res.status(500).json({error: 'Internal server error'})
    }
}

async function index(req,res) {
    try {
        const invoices = await Invoice.find();
        res.json({ invoices });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function show(req, res) {
    try {
        const invoiceId = req.params.id;
        const invoice = await Invoice.findById(invoiceId);

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        res.json({ invoice });
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteInvoice(req, res) {
    try {
        const invoiceId = req.params.id;
        const existingInvoice = await Invoice.findById(invoiceId);
        if (!existingInvoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        await existingInvoice.deleteOne({ _id: invoiceId });
        res.json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { create, index, show, deleteInvoice };