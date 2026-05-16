//1 es lekciamdea dawerili
// function sashAritmetikuli(numbers) {
//     let sum = 0
//     for (let i = 0; i < numbers.length; i++) {
//         sum += numbers[i] / numbers.length
//     }
//     return sum
// }
// let masivi = [1, 2, 3, 1]
// console.log(sashAritmetikuli(masivi))

function getAverage(arr) {
    if (arr.length === 0) return 0
    let sum = arr.reduce((tot, cur) => tot + cur, 0)
    return sum / arr.length
}

console.log(getAverage([1, 3, 2, 1]))


//2 
function reverseNumber(num) {
    return num
        .toString()       
        .split("")        
        .reverse()        
        .map(Number)
}

console.log(reverseNumber(35231))
console.log(reverseNumber(0))

//3
function arrayDifference(a, b) {
    return a.filter(item => !b.includes(item))
}

console.log(arrayDifference([1, 2], [1]))
console.log(arrayDifference([1, 2, 2, 2, 3], [2]))

//4
function findSecondLargest(arr) {
    arr.sort((a, b) => b - a)
    
    return arr[1]
}

console.log(findSecondLargest([10, 40, 20, 5, 30]))

//5
function getPalindromes(wordsArr) {
    return wordsArr.filter(word => word === word.split("").reverse().join(""))
}
console.log(getPalindromes(["mom", "car", "level", "dog"]))


//6
function mostFrequent(arr) {
    let mostFrequentItem = arr[0]
    let maxCount = 0

    arr.forEach(num => {
        let count = arr.filter(x => x === num).length

        if (count > maxCount) {
            maxCount = count
            mostFrequentItem = num
        }
    })
    return mostFrequentItem
}

console.log(mostFrequent([4, 5, 6, 5, 4, 5]))