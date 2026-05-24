//1
function sleep(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms)
    })
}

async function run() {
    console.log("start")
    await sleep(1000)
    console.log("1 sec passed")
}

run()

//2
function guessTheNumber(myNumber) {
    let myTimer = setInterval(function() {
        let randomNum = Math.floor(Math.random() * 20) + 1
        console.log("random ricxv: " + randomNum)

        if (randomNum === myNumber) {
            console.log("rixcvebi daemtxva")
            clearInterval(myTimer)
        }
    }, 1000)
}

guessTheNumber(7)

//3
function startCountdown(number, time) {
    let currentNumber = number

    function doStep() {
        console.log(currentNumber)

        if (currentNumber === 0) {
            console.log("მორჩა!")
            clearInterval(timer)
        }

        currentNumber = currentNumber - 1
    }

    let timer = setInterval(doStep, time)
}

startCountdown(5, 1000)