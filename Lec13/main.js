const express = require("express");
const { readFile, writeFile } = require("./utils/fs.util");
const app = express();

app.use(express.json());

app.get("/expenses", async (req, res) => {
  let expenses = await readFile("expenses.json", true);

  let page = Number(req.query.page) || 1;
  let take = Number(req.query.take) || 10;

  if (page < 1 || take < 1) {
    return res.status(400).json({ message: "page and take must be greater than 0" });
  }

  if (take > 50) {
    take = 50;
  }

  const startIndex = (page - 1) * take;
  const endIndex = page * take;
  const paginatedData = expenses.slice(startIndex, endIndex);

  res.json(paginatedData);
});

app.get("/expenses/:id", async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((exp) => exp.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "expense not found" });
  }

  res.json(expenses[index]);
});

app.post("/expenses", async (req, res) => {
  if (
    !req.body ||
    !req.body.title ||
    typeof req.body.title !== "string" ||
    !req.body.amount ||
    typeof req.body.amount !== "number"
  ) {
    return res.status(400).json({ message: "valid title and amount are required" });
  }

  const expenses = await readFile("expenses.json", true);
  const lastId = expenses[expenses.length - 1]?.id || 0;

  const newExpense = {
    id: lastId + 1,
    title: req.body.title,
    amount: req.body.amount,
  };

  expenses.push(newExpense);
  await writeFile("expenses.json", expenses);

  res.status(201).json({ success: true, data: newExpense });
});

app.put("/expenses/:id", async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((exp) => exp.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "expense not found" });
  }

  const updateReq = {};
  if (req.body.title && typeof req.body.title === "string") {
    updateReq["title"] = req.body.title;
  }
  if (req.body.amount && typeof req.body.amount === "number") {
    updateReq["amount"] = req.body.amount;
  }

  expenses[index] = {
    ...expenses[index],
    ...updateReq,
  };

  await writeFile("expenses.json", expenses);
  res.json({ success: true, data: expenses[index] });
});

app.delete("/expenses/:id", async (req, res) => {
  const id = Number(req.params.id);
  const expenses = await readFile("expenses.json", true);
  const index = expenses.findIndex((exp) => exp.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "expense not found" });
  }

  const secret = req.headers["secret"];
  if (!secret || secret !== "random123") {
    return res.status(401).json({ message: "permission denied. valid secret token is required" });
  }

  const deletedExpense = expenses.splice(index, 1);
  await writeFile("expenses.json", expenses);

  res.json({ success: true, data: deletedExpense[0] });
});

app.listen(4000, () => {
  console.log("server running on http://localhost:4000");
});
