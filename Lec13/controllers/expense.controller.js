const ExpenseService = require('../services/expense.service')

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseService.getAllExpenses(req.query)
        res.json(expenses)
    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message })
    }
}

exports.getTopFiveExpenses = async (req, res) => {
    try {
        const topExpenses = await ExpenseService.getTopFiveExpenses()
        res.json(topExpenses)
    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message })
    }
}

exports.getExpenseById = async (req, res) => {
    try {
        const expense = await ExpenseService.getExpenseById(req.params.id)
        if (!expense) {
            return res.status(404).json({ message: "expense not found" })
        }
        res.json(expense)
    } catch (e) {
        res.status(500).json({ message: "Server error" })
    }
}

exports.createExpense = async (req, res) => {
    try {
        const newExpense = await ExpenseService.createExpense(req.body)
        res.status(201).json({ success: true, data: newExpense })
    } catch (e) {
        res.status(500).json({ message: "Server error", error: e.message })
    }
}

exports.updateExpenseById = async (req, res) => {
    try {
        const updatedExpense = await ExpenseService.updateExpenseById(req.params.id, req.body)
        if (!updatedExpense) {
            return res.status(404).json({ message: "expense not found" })
        }
        res.json({ success: true, data: updatedExpense })
    } catch (e) {
        res.status(500).json({ message: "Server error" })
    }
}

exports.deleteExpenseById = async (req, res) => {
    try {
        const deletedExpense = await ExpenseService.deleteExpenseById(req.params.id)
        if (!deletedExpense) {
            return res.status(404).json({ message: "expense not found" })
        }
        res.json({ success: true, data: deletedExpense })
    } catch (e) {
        res.status(500).json({ message: "Server error" })
    }
}

exports.getRandomFact = (req, res) => {
    const fact = ExpenseService.getRandomFact()
    res.json(fact)
}