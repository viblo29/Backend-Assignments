#!/usr/bin/env node

import { Command } from 'commander'
import fs from 'fs/promises'
import path from 'path'
import chalk from 'chalk'

const program = new Command()
const __dirname = import.meta.dirname
const DB_PATH = path.join(__dirname, 'todos.json')

async function readTodos() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function writeTodos(todos) {
    await fs.writeFile(DB_PATH, JSON.stringify(todos, null, 2))
}

function getNextId(todos) {
    if (todos.length === 0) return 1
    return Math.max(...todos.map(t => t.id)) + 1
}

program
    .name('todo-cli')
    .description('Simple Todo CLI tool')
    .version('1.0.0')


program
    .command('show')
    .description('Returns all todo objects')
    .action(async () => {
        const todos = await readTodos()

        if (todos.length === 0) {
            console.log(chalk.yellow('No todos found. Add one with: todo-cli add <todoName>'))
            return
        }

        console.log(chalk.cyan.bold('\n📋 All Todos:\n'))
        todos.forEach(todo => {
            const status = todo.isDone
                ? chalk.green('✅ Done')
                : chalk.red('❌ Pending')
            console.log(`  [${chalk.gray(todo.id)}] ${todo.title} — ${status}`)
        })
        console.log()
    })


program
    .command('add')
    .description('Adds a new todo and returns it')
    .argument('<todoName>', 'Name/title of the todo')
    .action(async (todoName) => {
        const todos = await readTodos()

        const newTodo = {
            id: getNextId(todos),
            title: todoName,
            isDone: false
        }

        todos.push(newTodo)
        await writeTodos(todos)

        console.log(chalk.green.bold('\n✅ New todo created:\n'))
        console.log(`  ${chalk.cyan('ID:')}    ${newTodo.id}`)
        console.log(`  ${chalk.cyan('Title:')} ${newTodo.title}`)
        console.log(`  ${chalk.cyan('Done:')}  ${newTodo.isDone}\n`)
    })


program
    .command('delete')
    .description('Deletes a todo by ID and returns the deleted todo')
    .argument('<todoId>', 'ID of the todo to delete')
    .action(async (todoId) => {
        const todos = await readTodos()
        const id = Number(todoId)

        const todoToDelete = todos.find(t => t.id === id)

        if (!todoToDelete) {
            console.log(chalk.red(`\n❌ Todo with ID ${id} not found.\n`))
            return
        }

        const updatedTodos = todos.filter(t => t.id !== id)
        await writeTodos(updatedTodos)

        console.log(chalk.yellow.bold('\n🗑️  Deleted todo:\n'))
        console.log(`  ${chalk.cyan('ID:')}    ${todoToDelete.id}`)
        console.log(`  ${chalk.cyan('Title:')} ${todoToDelete.title}`)
        console.log(`  ${chalk.cyan('Done:')}  ${todoToDelete.isDone}\n`)
    })


program
    .command('update')
    .description('Updates a todo by ID using options')
    .argument('<todoId>', 'ID of the todo to update')
    .option('-n, --name <todoName>', 'New name/title for the todo')
    .option('-d, --done', 'Mark the todo as done')
    .option('-u, --undone', 'Mark the todo as not done')
    .action(async (todoId, opts) => {
        const todos = await readTodos()
        const id = Number(todoId)

        const todoIndex = todos.findIndex(t => t.id === id)

        if (todoIndex === -1) {
            console.log(chalk.red(`\n❌ Todo with ID ${id} not found.\n`))
            return
        }

        if (opts.name) {
            todos[todoIndex].title = opts.name
        }
        if (opts.done) {
            todos[todoIndex].isDone = true
        }
        if (opts.undone) {
            todos[todoIndex].isDone = false
        }

        await writeTodos(todos)

        console.log(chalk.blue.bold('\n✏️  Updated todo:\n'))
        console.log(`  ${chalk.cyan('ID:')}    ${todos[todoIndex].id}`)
        console.log(`  ${chalk.cyan('Title:')} ${todos[todoIndex].title}`)
        console.log(`  ${chalk.cyan('Done:')}  ${todos[todoIndex].isDone}\n`)
    })


program.parse()
