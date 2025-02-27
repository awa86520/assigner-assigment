const express = require('express');
const { processTransaction, getTransactions } = require('../controllers/transactionController.js');

const router = express.Router();

router.post('/transaction', processTransaction);
router.get('/transactions', getTransactions);

module.exports = router;
