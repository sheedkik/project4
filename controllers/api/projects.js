const Project = require('../../models/project')
const Invoice = require('../../models/invoice')

async function create(req, res) {
    try {
        const { projectName, dueDate, client, description, user } = req.body

        const newProject = new Project ({
            projectName,
            client,
            dueDate,
            description,
            user,
        })

        await newProject.save()
        res.status(201).json({message: 'project created successfully', project: newProject})
    } catch (error) {
        console.error('project creating error:', error)
        res.status(500).json({error: 'Internal server error'})
    }
}

async function index(req,res) {
    try {
        const projects = await Project.find();
        res.json({ projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function show(req, res) {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'project not found' });
        }

        res.json({ project });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getProjectInvoices(req, res) {
    try {
        const projectId = req.params.id;
        const invoices = await Invoice.find({ project: projectId });
        res.json({ invoices });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { create, index, show, getProjectInvoices }