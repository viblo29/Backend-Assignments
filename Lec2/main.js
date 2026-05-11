//1
function getAbbr(saxeli) {
    let words = saxeli.split(" ")
    let abbr = ""
    for (let i = 0; i < words.length; i++) {
        let firstLet = words[i].slice(0, 1).toUpperCase()
        abbr = abbr + firstLet + "."
    }
    abbr = abbr.slice(0, abbr.length - 1)
    return abbr
}

console.log(getAbbr("John Doe"))

//2
function getSumOfDigit(number) {
    let string = "" + number
    let sum = 0
    for (let i = 0; i < string.length; i++) {
        sum = sum + Number(string[i])
    }
    return sum
}

console.log(getSumOfDigit(123))

//3
function removeDuplicates(string) {
    let result = ""
    for (let i = 0; i < string.length; i++) {
        if (result.includes(string[i]) === false) {
            result = result + string[i]
        }
    }
    return result
}

console.log(removeDuplicates("banana"))

//4
function removeSpaces(string) {
    return string.replaceAll(" ", "")
}

console.log(removeSpaces('1 2 aab'))

//5
function reverseEachWord(sentence) {
    let words = sentence.split(" ")
    let result = ""
    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        let reversed = ""
        for (let j = word.length - 1; j >= 0; j--) {
            reversed = reversed + word[j]
        }
        result = result + reversed + " "
    }
    result = result.slice(0, result.length - 1)
    return result
}

console.log(reverseEachWord("Hello World"))
