import axios from 'axios'

const NOTE_API_URL = 'http://localhost'

export const http = axios.create({
  baseURL: `${NOTE_API_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
})
