//1
function deleteProperty(object, property) {
    delete object[property];
    return object;
}

const user1 = { name: "Ana", age: 25, city: "Tbilisi" };
console.log(deleteProperty(user1, "age"));


//2
function leaderboard(arr) {
    return arr
        .slice()
        .sort((a, b) => b.score - a.score)
        .map((item, index) => ({
            name: item.name,
            score: item.score,
            rank: index + 1
        }));
}

const players = [
    { name: "Anna", score: 50 },
    { name: "Nika", score: 80 },
    { name: "Luka", score: 70 }
];
console.log(leaderboard(players));


//3
function longestTitle(movies) {
    return movies.reduce((longest, current) =>
        current.title.length > longest.title.length ? current : longest
    );
}

const movies = [
    { title: "Up", year: 2009 },
    { title: "The Lord of the Rings", year: 2001 }
];
console.log(longestTitle(movies));


//4
function averageAge(users) {
    let stats = {}

    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        let d = user.department

        if (!stats[d]) {
            stats[d] = { sum: 0, count: 0 }
        }

        stats[d].sum = stats[d].sum + user.age
        stats[d].count = stats[d].count + 1
    }

    let result = {}
    for (let d in stats) {
        result[d] = stats[d].sum / stats[d].count
    }

    return result
}

const employees = [
    { name: "Anna", department: "HR", age: 25 },
    { name: "Nika", department: "IT", age: 30 },
    { name: "Luka", department: "IT", age: 22 }
];
console.log(averageAge(employees));


//5
function countWords(comments) {
    let total = 0

    for (let i = 0; i < comments.length; i++) {
        let text = comments[i].comment
        
        if (text !== "") {
            let words = text.split(" ")
            total = total + words.length
        }
    }

    return total
}

const comments = [
    { id: 1, comment: "Hello world" },
    { id: 2, comment: "This is great!" },
    { id: 3, comment: "" }
];
console.log(countWords(comments));


//6
function groupByDepartment(users) {
    const result = {};

    for (const user of users) {
        if (!result[user.Department]) {
            result[user.Department] = [];
        }
        result[user.Department].push(user);
    }

    for (const dep in result) {
        result[dep].sort((a, b) => b.Salary - a.Salary);
    }

    return result;
}

const staff = [
    { Name: "Anna", Department: "HR", Salary: 2000 },
    { Name: "Nika", Department: "IT", Salary: 5000 },
    { Name: "Luka", Department: "IT", Salary: 3500 },
    { Name: "Mariam", Department: "HR", Salary: 3000 }
];
console.log(groupByDepartment(staff));


//7
function cartTotal(cart) {
    return cart.reduce((total, item) => {
        const itemTotal = item.Price * item.Quantity;
        const discount = itemTotal * (item.DiscountPercent / 100);
        return total + (itemTotal - discount);
    }, 0);
}

const cart = [
    { Title: "Laptop", Price: 2000, Quantity: 1, DiscountPercent: 10 },
    { Title: "Mouse", Price: 50, Quantity: 2, DiscountPercent: 0 },
    { Title: "Keyboard", Price: 100, Quantity: 1, DiscountPercent: 20 }
];
console.log(cartTotal(cart));


//8
function usersToObject(users) {
    const result = {};
    for (const user of users) {
        result[user.id] = user;
    }
    return result;
}

const users = [
    { id: 1, name: "Anna", age: 25 },
    { id: 2, name: "Nika", age: 30 },
    { id: 3, name: "Luka", age: 22 }
];
console.log(usersToObject(users));
