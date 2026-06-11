import http from 'http'
import fs from 'fs/promises'
import path from 'path'

const __dirname = import.meta.dirname
const filePath = path.join(__dirname, 'players.json')

const server = http.createServer(async (req, res) => {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`)
    const pathname = reqUrl.pathname
    const nationQuery = reqUrl.searchParams.get('nation')

    async function getPlayersData() {
        try {
            const data = await fs.readFile(filePath, 'utf-8')
            return JSON.parse(data)
        } catch (e) {
            return []
        }
    }

    if (req.method === 'GET' && pathname === '/about') {
        res.writeHead(200, { 'content-type': 'application/json' })
        const aboutMe = { name: 'Nika', lastName: 'G.', hobby: 'Coding' }
        return res.end(JSON.stringify(aboutMe))
    }

    if (req.method === 'GET' && pathname === '/players') {
        const players = await getPlayersData()
        res.writeHead(200, { 'content-type': 'application/json' })

        if (nationQuery) {
            const filteredPlayers = players.filter(p => p.nation.toLowerCase() === nationQuery.toLowerCase())
            return res.end(JSON.stringify(filteredPlayers))
        }

        return res.end(JSON.stringify(players))
    }

    if (req.method === 'POST' && pathname === '/players') {
        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', async () => {
            try {
                const parsedBody = JSON.parse(body)
                
                if (!parsedBody.name || !parsedBody.nation) {
                    res.writeHead(400, { 'content-type': 'application/json' })
                    return res.end(JSON.stringify({ message: 'Validation Error: Name and Nation are required' }))
                }

                const players = await getPlayersData()
                const lastId = players[players.length - 1]?.id || 0
                
                const newPlayer = {
                    id: lastId + 1,
                    name: parsedBody.name,
                    nation: parsedBody.nation.toLowerCase()
                }

                players.push(newPlayer)
                await fs.writeFile(filePath, JSON.stringify(players, null, 2))
                
                res.writeHead(201, { 'content-type': 'application/json' })
                return res.end(JSON.stringify({ message: 'Player created successfully', player: newPlayer }))
            } catch (e) {
                res.writeHead(400, { 'content-type': 'application/json' })
                return res.end(JSON.stringify({ message: 'Invalid JSON' }))
            }
        })
        return
    }

    if (req.method === 'DELETE' && pathname.startsWith('/players/')) {
        const playerId = pathname.split('/')[2]
        const players = await getPlayersData()
        
        const index = players.findIndex(p => p.id === Number(playerId))
        
        if (index === -1) {
            res.writeHead(404, { 'content-type': 'application/json' })
            return res.end(JSON.stringify({ message: 'Player not found' }))
        }

        players.splice(index, 1)
        await fs.writeFile(filePath, JSON.stringify(players, null, 2))

        res.writeHead(200, { 'content-type': 'application/json' })
        return res.end(JSON.stringify({ message: 'Player deleted successfully' }))
    }

    res.writeHead(404, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
})

server.listen(4000, () => {
    console.log('Server running on http://localhost:4000')
})