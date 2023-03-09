import axios from 'axios'
import { config } from 'dotenv'
import express from 'express'
config()
const app = express()
const JOKE_API = 'https://v2.jokeapi.dev/joke/Programming?type=single'
const TELEGRAM_URI = `https://api.telegram.org/bot${botToken.env.TELEGRAM_API_TOKEN}/sendMessage`

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.post('/new-message', async (req, res) => {
    // ...
  })