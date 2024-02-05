const mongoose = require('mongoose')
const Schema = require('mongoose').Schema;

const itemSchema = new Schema ({
    name: {type: String, required: true},
}, {
    timestamps: true
})

const invoiceItemSchema = new Schema ({
    qty: {type: Number, default: 1},
    item: itemSchema
},{
    timestamps: true
})

const invoiceSchema = new Schema ({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    itemName: { type: String, required: true},
    price: { type: Number, required: true},
    supplier: { type: String, required: true},
    invoiceNumber: { type: String, required: true},
    project: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
    paid: {type: Boolean, default: false, required: true}
}, {
    timestamps: true
})

module.exports = mongoose.model('Invoice', invoiceSchema);