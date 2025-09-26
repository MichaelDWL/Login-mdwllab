import { createServer } from 'node:http'

import express from 'express' 
import publicRoutes from './routes/public.js'
app.use(express.json())

const app = express()

app

// Servidor nativo 
// const server = createServer((request, response) => { 
//     response.write('Hello World!')

//     return response.end()
// })

app.listen(3300, () => console.log('Server is running on port 3300'))
