import express from 'express'

const app = express()
const port = process.env.PORT || 5000

const parseBodyMiddleware = express.json()
app.use(parseBodyMiddleware)

const db = {
  dailies: [
    { id: 1, name: 'Walking', exp: 13000 },
    { id: 2, name: 'Warm up', exp: 7000 },
    { id: 3, name: 'Job', exp: 26000 },
    { id: 4, name: 'NLP', exp: 17000 },
  ]
}

app.get('/', (req, res) => {
  res.send('Hello World, toys!')
})

app.get('/joyme', (req, res) => {
  res.send('Hello Joyme!')
})

app.get('/dailies', (req, res) => {
  let response = db.dailies

  if (req.query.name) {
    response = db.dailies.filter(d => d.name.indexOf(req.query.name as string) > -1)
  }

  res.json(response)
})

app.get('/dailies/:id', (req, res) => {
  res.json(db.dailies.find(d => d.id === Number(req.params.id)))
})

app.post('/dailies', (req, res) => {
  const newDaily = { id: +new Date(), name: req.body.title, exp: req.body.exp }
  db.dailies.push(newDaily)
  res.status(201).json(newDaily)
})

app.put('/dailies/:id', (req, res) => {
  db.dailies = db.dailies.map(d => d.id === +req.params.id ? {...d, name: req.body.title, exp: req.body.exp} : d)
  res.status(200).json(db.dailies.find(d => d.id === +req.params.id))
})

app.delete('/dailies/:id', (req, res) => {
  db.dailies = db.dailies.filter(d => d.id !== +req.params.id)
  res.sendStatus(204)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
