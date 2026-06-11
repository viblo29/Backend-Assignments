import fs from 'fs/promises'
import path from 'path'

const __dirname = import.meta.dirname

let totalWords = 0
let totalVowels = 0

async function analyzeDirectory(filePath) {
    const dirs = await fs.readdir(filePath)
    
    for (let dir of dirs) {
        const fullDirPath = path.join(filePath, dir)
        const stat = await fs.stat(fullDirPath) 
        
        if (stat.isDirectory()) {
            await analyzeDirectory(fullDirPath)
        }
        
        const ext = path.extname(fullDirPath)
        if (stat.isFile() && ext === '.txt') {
            const content = await fs.readFile(fullDirPath, 'utf-8')
            
            const words = content.split(/\s+/).filter(Boolean).length
            
            const vowels = content.split('').filter(char => {
                return 'aeiouyაეიოუ'.includes(char.toLowerCase())
            }).length

            totalWords += words
            totalVowels += vowels
        }
    }
}

async function start() {
    try {
        await analyzeDirectory(__dirname)
        console.log({ totalWords, totalVowels })
    } catch (e) {
        console.log('Error analyzing files:', e.message)
    }
}

start()