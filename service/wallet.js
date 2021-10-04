const AsyncLock = require('async-lock');
const lock = new AsyncLock();
const logger = require('../lib/logger');
const { throwError } = require('../utils/error');
const Wallet = require('../model/wallet')


const createWallet = (userId) => {
    return Wallet.findOne({user: userId})
    .then(wallet => {
        if (wallet) return wallet
        const newWallet = new Wallet({
            user: userId , 
            balance: 0
        })
        return newWallet.save()
    })
}

/**
 * Increases the user's account balance with the specified amount
 * @param accountId uuid
 * @param amount number
 *
 * @return object
 */
const creditUserWallet = (userId, amount) => {
  return Wallet.findOne({user: userId})
.then((wallet) => {
    if (!wallet) throwError('Wallet not found', 404)
    wallet.balance += amount;
    return wallet.save()
}).catch((err) => {
    throw err
})
};

/**
 * Decreases the user's account balance with the specified amount
 * @param accountId uuid
 * @param amount number
 *
 * @return object
 */
const debitUserWallet = (userId, amount) => {

  return Wallet.findOne({user: userId})
.then((wallet) => {
    if (!wallet) throwError('Wallet not found', 404)
      if (wallet.balance < amount) throwError('Insufficient amount', 422);
 wallet.balance -= amount;
    return wallet.save()
}).catch((err) => {
    throw err
})
};

/**
 * Retrieves the account balance
 * @param accountId uuid
 *
 * @returns accountBalance - object
 */
const getWalletBalance = (userId) => {
  if (lock.isBusy(userId)) throwError('Service Unavailable', 503);
  return Wallet.findOne({user: userId})
.then((wallet) => {
    if (!wallet) throwError('Wallet not found', 404)
    return {balance: wallet.balance}})
    .catch((err) => {throw err})
};

/**
 * initiates a transaction
 * @param userId
 * @param args
 *
 */
const initiateTransaction = (userId, args) => lock.acquire(userId, () => {
  const { type, amount } = args;
  if (Number.isNaN(amount) || !['credit', 'debit'].includes(type)) throwError('Invalid input', 400);

  if (type === 'credit') return creditUserWallet(userId, amount);
  return debitUserWallet(userId, amount);
}).catch((error) => {
  logger.error('Service::initiateTransaction::error', error);
  throw error;
});

exports.walletService = {
  createWallet: (userId) => createWallet(userId),
  getWalletBalance: (userId) => getWalletBalance(userId),
  initiateTransaction: (userId, args) => initiateTransaction(userId, args),
};
