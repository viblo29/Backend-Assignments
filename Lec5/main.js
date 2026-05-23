// const products = [
//     { name: "iphone", price: 1500 },
//     { name: "macbook", price: 3500 },
//     { name: "lenovo", price: 2500 },
//     { name: "microphone", price: 100 },
//     { name: "headset", price: 500 },
//     { name: "samsung", price: 1800 },
// ]

// const total = products
//     .filter(p => p.price > 1000)
//     .reduce((sum, p) => sum + p.price, 0)

// console.log(total)


// const users = [
//     { id: 1, name: "giorig", age: 24, isSmoker: true },
//     { id: 2, name: "nika", age: 44, isSmoker: false },
//     { id: 3, name: "mariami", age: 32, isSmoker: true },
//     { id: 4, name: "tekla", age: 21, isSmoker: false },
//     { id: 5, name: "daviti", age: 24, isSmoker: true },
// ]

// const users = [
//     {id: 1, name: "giorig", age: 24, isSmoker: true},
//     {id: 2, name: "nika", age: 44, isSmoker: false},
//     {id: 3, name: "mariami", age: 32, isSmoker: true},
//     {id: 4, name: "tekla", age: 21, isSmoker: false},
//     {id: 5, name: "daviti", age: 24, isSmoker: true},
// ]

// const groupedNamesByAge = users.reduce((prev, { age, name }) => {

//     if (!prev[age]) {
//         prev[age] = []
//     }

//     prev[age].push(name)

//     return prev
// }, {})

// console.log(groupedNamesByAge)



const students = [
  { name: "Ana", scores: [80, 90, 100] },
  { name: "Nika", scores: [70, 60, 75] },
  { name: "Luka", scores: [95, 85, 90] }
]

const getAvg = (scores) => scores.reduce((prev, sum) => prev + sum, 0) / scores.length

const bestStudent = students.reduce((prevStudent, currentStudent) => {
    if (!prevStudent) return currentStudent
    
    return getAvg(currentStudent.scores) > getAvg(prevStudent.scores) 
        ? currentStudent 
        : prevStudent
}, null)

console.log(bestStudent) 