const express = require('express');
const router = express.Router();
const projectsCtrl = require('../../controllers/api/projects');

router.get('/', projectsCtrl.index);
router.get('/:id', projectsCtrl.show);
router.get('/:id/invoices', projectsCtrl.getProjectInvoices);
router.post('/', projectsCtrl.create);

module.exports = router;
