const { walletService } = require('../service/wallet');


exports.createWallet = (req, res, next) => {
    try {
    const { userId } = req
    walletService
    .createWallet(userId)
    .then(wallet => {
        res.status(200).json({
            error: false,
            message: 'Successful operation',
            data: wallet
          });
    })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
    }
}

exports.getWalletBalance = (req, res, next) => {
  try {
    const { userId } = req
    return walletService.getWalletBalance(userId)
    .then(walletBalance => {
        res.status(200).json({
            error: false,
            message: 'Successful operation',
            data: walletBalance
          });
    })
  } catch (error) {
    if (!error.statusCode) {
    error.statusCode = 500;
    }
    next(error);
    }
};

exports.initiateTransaction = (req, res, next) => {
    const { userId, body } = req
    return walletService.initiateTransaction(userId, body)
    .then(wallet => {
        res.status(200).json({
            error: false,
            message: 'Successful operation',
            data: wallet
          });
    })
    .catch((error) => {
        if (!error.statusCode) {
        error.statusCode = 500;
        }
        next(error);
    });
};
