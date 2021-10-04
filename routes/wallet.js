const express = require('express')
const {body} = require('express-validator')
const { createWallet , 
getWalletBalance , 
initiateTransaction } = require('../controllers/wallet')

//Initialize router
const router = express.Router()

router.post('/create', createWallet)
router.get('/balance/:userId', getWalletBalance);
router.post('/initiateTransaction/:userId',[
body('type')
.trim()
.notEmpty().withMessage('Type cannot be empty.'), 
body('amount')
.isNumeric()
.notEmpty().withMessage('Amount cannot be empty.')], 
initiateTransaction);

module.exports = router