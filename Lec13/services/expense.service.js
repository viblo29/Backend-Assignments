const Expense = require("../models/expense.model")

exports.getAllExpenses = async (query) => {
    const { category, amountFrom, amountTo, page = 1, take = 10 } = query
    const filter = {}

    if (category) {
        const categoriesArray = category.split(",").map(cat => cat.trim().toLowerCase())
        filter.category = { $in: categoriesArray }
    }

    if (amountFrom || amountTo) {
        filter.amount = {}
        if (amountFrom) filter.amount.$gte = Number(amountFrom)
        if (amountTo) filter.amount.$lte = Number(amountTo)
    }

    const pageNumber = Math.max(Number(page), 1)
    let limitNumber = Math.max(Number(take), 1)
    if (limitNumber > 50) limitNumber = 50

    const startIndex = (pageNumber - 1) * limitNumber

    return await Expense.find(filter)
        .skip(startIndex)
        .limit(limitNumber)
}

exports.getTopFiveExpenses = async () => {
    return await Expense.find()
        .sort({ amount: -1 })
        .limit(5)
}

exports.getExpenseById = async (id) => {
    return await Expense.findById(id)
}

exports.createExpense = async (body) => {
    const newExpense = new Expense({
        title: body.title,
        amount: body.amount,
        category: body.category || "other" 
    })
    return await newExpense.save()
}

exports.updateExpenseById = async (id, body) => {
    return await Expense.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, runValidators: true }
    )
}

exports.deleteExpenseById = async (id) => {
    return await Expense.findByIdAndDelete(id)
}

exports.getRandomFact = () => {
    const facts = [
        "MongoDB stores data in flexible, JSON-like documents.",
        "Mongoose provides a straight-forward, schema-based solution to model application data.",
        "The name MongoDB comes from the word humongous.",
        "NoSQL databases scale horizontally rather than vertically."
    ]
    const randomIndex = Math.floor(Math.random() * facts.length)
    return { fact: facts[randomIndex] }
}