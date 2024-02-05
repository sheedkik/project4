const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema ({
    projectName: { type: String, required: true },
    projectTotal: { type: Number },
    client: { type: String, required: true },
    projectInvoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
    dueDate: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: {type: String, required: true },
    total: {type: Number}
}, {
    timestamps: true
})

module.exports = mongoose.model('Project', projectSchema);