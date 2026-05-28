//1
async function fetchWithRetry() {
    const url = "https://jsonplaceholde.typicode.com"
    
    for (let i = 1; i <= 5; i++) {
        try {
            console.log(`Attempt #${i}...`)
            const res = await fetch(url)
            const data = await res.json()
            return data
        } catch (e) {
            if (i === 5) console.log("All attempts failed")
        }
    }
}
fetchWithRetry()

//2
async function whoIsFirst() {
    try {
        const firstResolve = await Promise.race([
            fetch('https://dummyjson.com/users'),
            fetch('https://jsonplaceholder.typicode.com/users')
        ])
        
        const data = await firstResolve.json()
        console.log("First resolved data:", data)
    } catch (e) {
        console.log("error:", e)
    }
}
whoIsFirst()

//3
async function getExpensiveProducts() {
    try {
        const res = await fetch('https://dummyjson.com/products')
        const data = await res.json()
        
        const filtered = data.products.filter(p => p.price > 10)
        console.log("Products 10$+ :", filtered)
    } catch (e) {
        console.log("Error:", e)
    }
}
getExpensiveProducts()

//4
async function getWebDevelopers() {
    try {
        const res = await fetch('https://dummyjson.com/users')
        const data = await res.json()

        const developers = data.users
            .filter(user => user.company.title === "Web Developer")
            .map(user => ({
                firstName: user.firstName,
                lastName: user.lastName,
                city: user.address.city,
                email: user.email,
                phone: user.phone
            }))

        console.log("Web developers:", developers)
    } catch (e) {
        console.log("Eror:", e)
    }
}
getWebDevelopers()

//5
async function getAllData() {
    try {
        const [resp1, resp2, resp3, resp4] = await Promise.all([
            fetch('https://dummyjson.com/recipes'),
            fetch('https://dummyjson.com/comments'),
            fetch('https://dummyjson.com/todos'),
            fetch('https://dummyjson.com/quotes')
        ])

        const [recipes, comments, todos, quotes] = await Promise.all([
            resp1.json(),
            resp2.json(),
            resp3.json(),
            resp4.json()
        ])

        console.log("All data:", { recipes, comments, todos, quotes })
    } catch (e) {
        console.log("Error:", e)
    }
}
getAllData()