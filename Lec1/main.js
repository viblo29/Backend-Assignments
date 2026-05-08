//1
function celsiusToFahrenheit(celsius) {
    return (celsius * 1.8) + 32;
}
console.log(celsiusToFahrenheit(18));

//2
function reverseString(stringi) {
    return stringi.split("").reverse().join("");
}
console.log(reverseString("salam"));

//3
function countWords(sentence) {
    let words = sentence.split(" ");
    return words.length;
}
console.log(countWords("Hello world how are you"));

//4
function countVowels(word) {
    let count = 0;
    for (let i = 0; i < word.length; i++) {
        let letter = word[i].toLowerCase();
        if (letter === "ა" || letter === "ე" || letter === "ი" || letter === "ო" || letter === "უ") {
            count++;
        }
    }
    return count;
}
console.log(countVowels("დათვი"));

//5
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result = result * i;
    }
    return result;
}
console.log(factorial(5));

//6
function sumOfEvens(n) {
    let sum = 0;
    for (let i = 0; i <= n; i++) {
        if (i % 2 === 0) {
            sum = sum + i;
        }
    }
    return sum;
}
console.log(sumOfEvens(10));

//7
function getGrade(score) {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 60) {
        return "E";
    } else {
        return "F";
    }
}
console.log(getGrade(85));

//8
function isValidPassword(password) {
    let hasNumber = true;
    let hasUpper = false;

    if (password.length <= 8) return false;

    for (let i = 0; i < password.length; i++) {
        let ch = password[i];

        if (ch >= "0" && ch <= "9") {
            hasNumber = true;
        }

        if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()  ) {
            hasUpper = true;
        }
    }

    return hasNumber && hasUpper;
}
console.log(isValidPassword("Wwelwwwwlo12"));
