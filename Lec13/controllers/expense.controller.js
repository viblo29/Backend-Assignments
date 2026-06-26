const ExpenseService = require('../services/expense.service')

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseService.getAllExpenses(req.query)
        res.json(expenses)
    } catch (e) {
        res.status(500).json({ message: "Server error" })
    }
}

exports.getExpenseById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const expense = await ExpenseService.getExpenseById(id)
        
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
        res.status(500).json({ message: "Server error" })
    }
}

exports.updateExpenseById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const updatedExpense = await ExpenseService.updateExpenseById(id, req.body)

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
        const id = Number(req.params.id)
        const deletedExpense = await ExpenseService.deleteExpenseById(id)

        if (!deletedExpense) {
            return res.status(404).json({ message: "expense not found" })
        }
        res.json({ success: true, data: deletedExpense })
    } catch (e) {
        res.status(500).json({ message: "Server error" })
    }
}

exports.getRandomFact = (req, res) => {
    console.log("Fact-ის კონტროლერში შემოვიდა!")
    const fact = ExpenseService.getRandomFact()
    res.json(fact)
}