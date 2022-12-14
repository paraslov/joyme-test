import express from 'express'
import { dailiesRouter } from './routes/dailies-router'
import { DailiesViewModel } from './models/dailies/DailiesViewModel'
import { RoutesList } from './routes'
import { runDB } from './repositories/db'

const app = express()
const port = process.env.PORT || 5000

const parseBodyMiddleware = express.json()
app.use(parseBodyMiddleware)

export const db: { dailies: DailiesViewModel[] } = {
  dailies: [
    { id: 1, title: 'Walking', exp: 13000 },
    { id: 2, title: 'Warm up', exp: 7000 },
    { id: 3, title: 'Job', exp: 26000 },
    { id: 4, title: 'NLP', exp: 17000 },
  ]
}

app.get(RoutesList.BASE, (req, res) => {
  res.json('Hello boys! Let\'s practice a little')
})
app.get(RoutesList.JOYME, (req, res) => {
  res.json(`Hello Joyme! ${process.env.GREETINGS || 'no env vars here'}`)
})
app.get(RoutesList.VERSION, (req, res) => {
  res.json('Joyme backend: v0.08')
})

app.use(RoutesList.DAILIES, dailiesRouter)

const startApp = async () => {
  await runDB()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startApp()
