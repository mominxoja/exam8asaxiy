import express from 'express'
import { routes } from './routes/routes.js'

const app = express()

app.use(express.json())
app.use('/', routes)

app.listen(9009, console.log(9009))
//username tursunxon7789
//password tursunxon7789
//id       15
//access token  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY5MjY1NDg3MCwiZXhwIjoxNjkyNjU5ODcwfQ.dozmQgNcHIZvN_bAQ-YWXnlbhZh4Qw7skjW93utj6DM 
//refresh token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY5MjY1NDg3MCwiZXhwIjoxNjkyNjY0ODcwfQ.0evX1-5zhAUtgIs-LDk5yuNGq_7G0LPh5I5xljdxViA 