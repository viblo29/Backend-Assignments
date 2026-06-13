#!/usr/bin/env node

import { Command } from 'commander'
import axios from 'axios'
import chalk from 'chalk'

const program = new Command()

const API_KEY = '895284fb2d2c50a520ea537456963d9c'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

// Helper: map weather condition to emoji
function getWeatherEmoji(condition) {
    const map = {
        Clear: '☀️',
        Clouds: '☁️',
        Rain: '🌧️',
        Drizzle: '🌦️',
        Thunderstorm: '⛈️',
        Snow: '❄️',
        Mist: '🌫️',
        Fog: '🌫️',
        Haze: '🌫️',
        Smoke: '🌫️',
        Dust: '🌪️',
        Sand: '🌪️',
        Tornado: '🌪️',
    }
    return map[condition] || '🌡️'
}

program
    .name('weather-cli')
    .description('Get current weather for any city')
    .version('1.0.0')


// weather-cli <cityName>
program
    .argument('<cityName>', 'Name of the city to get weather for')
    .action(async (cityName) => {
        try {
            console.log(chalk.gray(`\n🔍 Fetching weather for "${cityName}"...\n`))

            const response = await axios.get(BASE_URL, {
                params: {
                    q: cityName,
                    units: 'metric',
                    appid: API_KEY
                }
            })

            const data = response.data
            const weather = data.weather[0]
            const main = data.main
            const wind = data.wind
            const sys = data.sys

            const emoji = getWeatherEmoji(weather.main)

            console.log(chalk.cyan.bold(`${emoji}  Weather in ${data.name}, ${sys.country}`))
            console.log(chalk.gray('─'.repeat(40)))

            console.log(`  ${chalk.yellow('Condition:')}   ${weather.description}`)
            console.log(`  ${chalk.yellow('Temperature:')} ${chalk.white.bold(main.temp + '°C')}  (feels like ${main.feels_like}°C)`)
            console.log(`  ${chalk.yellow('Min / Max:')}   ${main.temp_min}°C / ${main.temp_max}°C`)
            console.log(`  ${chalk.yellow('Humidity:')}    ${main.humidity}%`)
            console.log(`  ${chalk.yellow('Pressure:')}    ${main.pressure} hPa`)
            console.log(`  ${chalk.yellow('Wind:')}        ${wind.speed} m/s`)
            console.log(`  ${chalk.yellow('Visibility:')} ${data.visibility ? data.visibility / 1000 + ' km' : 'N/A'}`)

            console.log(chalk.gray('─'.repeat(40)))
            console.log()

        } catch (error) {
            if (error.response) {
                const status = error.response.status

                if (status === 404) {
                    console.log(chalk.red(`\n❌ City "${cityName}" not found. Please check the city name and try again.\n`))
                } else if (status === 401) {
                    console.log(chalk.red('\n❌ Invalid API key.\n'))
                } else {
                    console.log(chalk.red(`\n❌ API error: ${error.response.data.message || 'Unknown error'}\n`))
                }
            } else {
                console.log(chalk.red('\n❌ Network error. Check your internet connection.\n'))
            }
        }
    })


program.parse()
