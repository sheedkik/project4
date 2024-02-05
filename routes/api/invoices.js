const express = require('express');
const router = express.Router();
const invoicesCtrl = require('../../controllers/api/invoices');


router.get('/', invoicesCtrl.index);
router.get('/:id', invoicesCtrl.show);
router.post('/', invoicesCtrl.create);
router.delete('/:id', invoicesCtrl.deleteInvoice);

module.exports = router;
