const express = require("express")
const expenseRouter = require("./routers/expense.router")
const app = express()

app.use(express.json())

app.use('/expenses', expenseRouter)

app.get("/", (req, res) => {
  res.send('<h1 style="color: red;">hello world</h1>')
})

app.listen(4000, () => {
  console.log("server running on http://localhost:4000")
})