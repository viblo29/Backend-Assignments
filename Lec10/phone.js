const fs = require('fs/promises')
const [, , operation, phone, name] = process.argv

async function main() {
  try {
    let contacts = []
    try {
      const data = await fs.readFile('contacts.json', 'utf-8')
      contacts = JSON.parse(data)
    } catch (e) { contacts = [] }

    if (operation === 'add') {
      if (contacts.some(c => c.phone === phone)) return console.log('Phone already exists!')

      contacts.push({ phone, name })
      await fs.writeFile('contacts.json', JSON.stringify(contacts, null, 2))
      console.log('Contact added')
    }

    if (operation === 'delete') {
      const filtered = contacts.filter(c => c.phone !== phone)
      await fs.writeFile('contacts.json', JSON.stringify(filtered, null, 2))
      console.log('Contact deleted')
    }

    if (operation === 'show') console.log(contacts)

  } catch (e) { console.log('Error:', e.message) }
}
main()
