// async function getAllUsers() {
//     const resp = await fetch('https://dummyjson.com/users')
//     const data = await resp.json()

//     console.log(data, "data")
// }

// getAllUsers()


// function debounce (callback, ms) {
//     let timer
//     return (...args) => {
//         clearTimeout(timer)
//         timer = setTimeout(() => {
//             callback(...args)
//         }, ms);
//     }
// }


//1 
function debouncer(callback, ms) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(...args)
        }, ms)
    }
}

const handleMouseMove = debouncer((e) => {
    console.log(e.clientX, e.clientY)
}, 500)

window.addEventListener('mousemove', handleMouseMove)


//2
const quoteBtn = document.getElementById('quote-btn')
    const quoteText = document.getElementById('quote-text')

    quoteBtn.addEventListener('click', async () => {
        try {
            const resp = await fetch('https://dummyjson.com/quotes/random')
            const data = await resp.json()
            
            quoteText.innerText = `${data.quote} - ${data.author}`
        } catch (e) {
            console.log(e)
        }
    })

//3
async function getUsersByPage(page) {
    const limit = 30
    const skip = (page - 1) * limit
    
    try {
        const resp = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
        const data = await resp.json()
        
        const totalPages = Math.ceil(data.total / limit)
        
        console.log(`გვერდი: ${page} / სულ გვერდები: ${totalPages}`)
        console.log("იუზერების სია ამ გვერდზე:", data.users)
    } catch (e) {
        console.log(e)
    }
}

getUsersByPage(3)


//4
const carInput = document.getElementById('car-id')
    const carBtn = document.getElementById('car-btn')
    const carInfo = document.getElementById('car-info')

    carBtn.addEventListener('click', async () => {
        const id = carInput.value
        if (!id) return
        
        try {
            const resp = await fetch(`https://myfakeapi.com/api/cars/${id}`)
            
            if (resp.status !== 200) {
                alert('მანქანა ამ ID-ით არ მოიძებნა. გთხოვთ შეიყვანოთ სწორი ID')
                carInfo.innerText = ''
                return
            }


            const data = await resp.json()
            const car = data.Car

            if (!car) {
                alert('მანქანა ამ ID-ით არ მოიძებნა.')
                carInfo.innerText = ''
            } else {
                carInfo.innerText = `მანქანა: ${car.car}, მოდელი: ${car.car_model}, ფასი: ${car.price}`
            }
        } catch (e) {
            console.log(e)
            alert('Server Error')
        }
    })