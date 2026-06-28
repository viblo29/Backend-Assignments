console.log("ჩემი ლინკი:", process.env.MONGO_URI)
require("dotenv").config()
const express = require("express")
const connectToDb = require("./config/db.config")
const expenseRouter = require("./routers/expense.router")

const app = express()
app.use(express.json())

app.use('/expenses', expenseRouter)

app.get("/", (req, res) => {
    res.send('<h1 style="color: red;">hello world</h1>')
})

const PORT = process.env.PORT || 4000

connectToDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
})