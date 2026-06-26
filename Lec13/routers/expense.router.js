const { Router } = require('express')
const ExpenseController = require('../controllers/expense.controller')

const expenseAuthMiddleware = require('../middlewares/expense-auth.middleware')
const validateExpenseMiddleware = require('../middlewares/validate-expense.middleware')
const randomBlockMiddleware = require('../middlewares/random-block.middleware')

const expenseRouter = new Router()

expenseRouter.get('/', ExpenseController.getAllExpenses)
expenseRouter.get('/random-fact', randomBlockMiddleware, ExpenseController.getRandomFact) 
expenseRouter.get('/:id', ExpenseController.getExpenseById)
expenseRouter.post('/', validateExpenseMiddleware, ExpenseController.createExpense) 
expenseRouter.put('/:id', ExpenseController.updateExpenseById)
expenseRouter.delete('/:id', expenseAuthMiddleware, ExpenseController.deleteExpenseById)

module.exports = expenseRouter