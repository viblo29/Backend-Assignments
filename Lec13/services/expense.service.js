const { readFile, writeFile } = require("../utils/fs.util")

exports.getAllExpenses = async (query) => {
    let expenses = await readFile("expenses.json", true)

    const page = Math.max(Number(query.page) || 1, 1)
    let take = Math.max(Number(query.take) || 10, 1)

    if (take > 50) {
        take = 50
    }

    const startIndex = (page - 1) * take
    const endIndex = page * take
    return expenses.slice(startIndex, endIndex)
}

exports.getExpenseById = async (id) => {
    const expenses = await readFile("expenses.json", true)
    const index = expenses.findIndex((exp) => exp.id === id)
    
    if (index === -1) {
        return null
    }
    return expenses[index]
}

exports.createExpense = async (body) => {
    const expenses = await readFile("expenses.json", true)
    const lastId = expenses[expenses.length - 1]?.id || 0

    const newExpense = {
        id: lastId + 1,
        title: body.title,
        amount: body.amount
    }

    expenses.push(newExpense)
    await writeFile("expenses.json", expenses)
    return newExpense
}

exports.updateExpenseById = async (id, body) => {
    const expenses = await readFile("expenses.json", true)
    const index = expenses.findIndex((exp) => exp.id === id)

    if (index === -1) {
        return null
    }

    const updateReq = {}
    if (body.title && typeof body.title === "string") {
        updateReq["title"] = body.title
    }
    if (body.amount && typeof body.amount === "number") {
        updateReq["amount"] = body.amount
    }

    expenses[index] = {
        ...expenses[index],
        ...updateReq
    }

    await writeFile("expenses.json", expenses)
    return expenses[index]
}

exports.deleteExpenseById = async (id) => {
    const expenses = await readFile("expenses.json", true)
    const index = expenses.findIndex((exp) => exp.id === id)

    if (index === -1) {
        return null
    }

    const deletedExpense = expenses.splice(index, 1)
    await writeFile("expenses.json", expenses)
    return deletedExpense[0]
}

exports.getRandomFact = () => {
    const facts = [
        "The first computer bug was an actual real bug found in a relay",
        "JavaScript was created in just 10 days by Brendan Eich in 1995",
        "Node.js was initially written by Ryan Dahl in 2009",
        "MongoDB's name comes from the word humongous",
        "Express.js was founded by TJ Holowaychuk in 2010"
    ]
    const randomIndex = Math.floor(Math.random() * facts.length)
    return { fact: facts[randomIndex] }
}