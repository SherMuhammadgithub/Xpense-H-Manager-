const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncome, deleteIncome } = require('../controllers/income');
const { signUp, signIn , changePass} = require('../controllers/user');

const router = require('express').Router();



router.post('/add-income', addIncome)
    .get('/get-income/:userId', getIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expense/:userId', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/signUp', signUp)
    .post('/signIn', signIn)
    .post('/changePass', changePass)



module.exports = router;