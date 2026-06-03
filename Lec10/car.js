const fs = require('fs/promises')
const [, , arg1, arg2, arg3] = process.argv

async function carCLI() {
  let cars = []
  try {
    const data = await fs.readFile('cars.json', 'utf-8')
    cars = JSON.parse(data)
  } catch (e) { cars = [] }

  if (arg1 === 'show') {
    const filtered = cars.filter(c => c.carReleaseDate === arg2 || c.carColor === arg2)
    return console.log(filtered)
  }

  const newCar = { carName: arg1, carReleaseDate: arg2, carColor: arg3 }
  cars.push(newCar)
  await fs.writeFile('cars.json', JSON.stringify(cars, null, 2))
  console.log('Car added!')
}
carCLI()
