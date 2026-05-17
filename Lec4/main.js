// 1
function removeLastChar(arr) {
    return arr.map(word => word.slice(0, -1))
}

console.log(removeLastChar(["one", "two", "three"]))

//2 
function sumTwoSmallest(arr) {
    arr.sort((a, b) => a - b)
    return arr[0] + arr[1]
}

console.log(sumTwoSmallest([19, 5, 42, 2, 77]))

//3
function sumWithForEach(arr) {
    let sum = 0
    arr.forEach(num => {
        sum = sum + num
    })
    return sum
}

console.log(sumWithForEach([10, 12, 4, 2]))

//4
function processStrings(arr) {
    return arr
        .filter(word => word.length > 5)
        .map(word => word.toUpperCase())
        .join("#")
}

console.log(processStrings(["cat", "parrot", "dog", "elephant"]))

//5
const studentsList = [
    { name: "Ann",  cls: "A", grade: 90 },
    { name: "Ben",  cls: "B", grade: 75 },
    { name: "Cara", cls: "A", grade: 80 }
]

function getAverageByClass(students) {
    let data = students.reduce((acc, student) => {
        let cls = student.cls
        
        if (!acc[cls]) { 
            acc[cls] = { totalGrade: 0, count: 0 }
        }
        
        acc[cls].totalGrade = acc[cls].totalGrade + student.grade
        acc[cls].count = acc[cls].count + 1
        
        return acc
    }, {})

    let result = {}
    for (let cls in data) {
        result[cls] = data[cls].totalGrade / data[cls].count
    }

    return result
}

console.log(getAverageByClass(studentsList))