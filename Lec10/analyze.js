const fs = require('fs/promises')

async function analyzeText() {
  try {
    const text = await fs.readFile('random.txt', 'utf-8')

    const words = text.trim().split(/\s+/).length
    const chars = text.length
    const vowels = text.match(/[aeiouyაეიოუ]/gi)

    const result = {
      word: words,
      vowel: vowels ? vowels.length : 0,
      chars: chars
    }

    await fs.writeFile('result.json', JSON.stringify(result, null, 2))
    console.log('Analysis complete:', result)
  } catch (e) { console.log('Error reading random.txt') }
}

analyzeText()
