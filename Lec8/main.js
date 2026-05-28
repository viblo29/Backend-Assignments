async function getAllUsers() {
    const resp = await fetch('https://dummyjson.com/users')
    const data = await resp.json()

    console.log(data, "data")
}

getAllUsers()


function debounce (callback, ms) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(...args)
        }, ms);
    }
}