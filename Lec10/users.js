const fs = require('fs/promises')

async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()

  const filteredData = data.map(({ id, name, username, email }) => ({ id, name, username, email }))

  await fs.writeFile('users.json', JSON.stringify(filteredData, null, 2))
  console.log('Users saved successfully!')
}

fetchUsers()
