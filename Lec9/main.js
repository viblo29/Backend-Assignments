//1
class TodoList {
    #todos = []

    addTodo(title) {
        const newTodo = {
            id: Date.now(),
            title,
            isDone: false,
            createdAt: new Date().toISOString()
        }
        this.#todos.push(newTodo)
    }

    deleteTodo(id) {
        this.#todos = this.#todos.filter(t => t.id !== id)
    }

    checkActiveTodo(id) {
        const todo = this.#todos.find(t => t.id === id)
        if (todo) {
            todo.isDone = !todo.isDone
        }
    }

    getAllTodos(filter = {}) {
        if (filter.active === true) {
            return this.#todos.filter(t => !t.isDone)
        } 
        if (filter.active === false) {
            return this.#todos.filter(t => t.isDone)
        }
        return this.#todos
    }
}

const myTodos = new TodoList()

myTodos.addTodo('learn JS Classes')
myTodos.addTodo('do tasks')
myTodos.checkActiveTodo(myTodos.getAllTodos()[0].id)

console.log('all todo:', myTodos.getAllTodos())
console.log('done:', myTodos.getAllTodos({ active: false }))


//2
class ShoppingCart {
    #items = []

    addToCart(name, price, qty = 1) {
        this.#items.push({ id: Date.now(), name, price, qty })
    }

    removeFromCart(id) {
        this.#items = this.#items.filter(item => item.id !== id)
    }

    updateItem(id, newQty) {
        const item = this.#items.find(i => i.id === id)
        if (item) {
            item.qty = newQty
        }
    }

    calculateTotalPrice() {
        return this.#items.reduce((total, item) => total + (item.price * item.qty), 0)
    }

    getItems() {
        return this.#items
    }
}

const myCart = new ShoppingCart()

myCart.addToCart('Laptop', 1200, 1)
myCart.addToCart('Mouse', 50, 2)

console.log('My cart:', myCart.getItems())
console.log('total cost:', myCart.calculateTotalPrice())

myCart.updateItem(myCart.getItems()[1].id, 3)
console.log('new total:', myCart.calculateTotalPrice())

//3
class Library {
    #books = []

    addBook(title, author, year) {
        this.#books.push({ title, author, year })
    }

    removeBook(title) {
        this.#books = this.#books.filter(b => b.title !== title)
    }

    listBooks(sortBy = null) {
        const booksCopy = [...this.#books]
        
        if (sortBy === 'year') {
            booksCopy.sort((a, b) => a.year - b.year)
        }
        
        return booksCopy
    }
}

const myLib = new Library()

myLib.addBook('The Great Gatsby', 'F. Scott Fitzgerald', 1925)
myLib.addBook('Shantaram', 'Gregory David Roberts', 1949)
myLib.addBook('The Hobbit', 'J.R.R. Tolkien', 1937)

console.log('sort years:', myLib.listBooks('year'))

//4
class ContactManager {
    #contacts = []

    addNewContact(name, phone, email) {
        const isDuplicate = this.#contacts.some(c => c.email === email || c.phone === phone)

        if (isDuplicate) {
            console.log('Error: Contact with this email or phone already exists!')
            return
        }

        this.#contacts.push({ name, phone, email })
        console.log('Contact added successfully')
    }

    viewAllContacts() {
        return this.#contacts
    }

    updatePhone(email, newPhone) {
        const contact = this.#contacts.find(c => c.email === email)
        if (contact) {
            contact.phone = newPhone
        } else {
            console.log('Contact not found')
        }
    }

    deleteContact(email) {
        this.#contacts = this.#contacts.filter(c => c.email !== email)
    }
}

const myContacts = new ContactManager()

myContacts.addNewContact('Nika', '599123456', 'nika@gmail.com')
myContacts.addNewContact('Giorgi', '599123456', 'giorgi@gmail.com')

console.log('All Contacts:', myContacts.viewAllContacts())