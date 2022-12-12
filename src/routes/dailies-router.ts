import { Router } from "express";
import { db } from '../index'

export const dailiesRouter = Router()

dailiesRouter.get('/', (req, res) => {
  let response = db.dailies

  if (req.query.name) {
    response = db.dailies.filter(d => d.name.indexOf(req.query.name as string) > -1)
  }

  res.json(response)
})
dailiesRouter.get('/:id', (req, res) => {
  res.json(db.dailies.find(d => d.id === Number(req.params.id)))
})
dailiesRouter.post('/', (req, res) => {
  const newDaily = { id: +new Date(), name: req.body.title, exp: req.body.exp }
  db.dailies.push(newDaily)
  res.status(201).json(newDaily)
})
dailiesRouter.put('/:id', (req, res) => {
  db.dailies = db.dailies.map(d => d.id === +req.params.id ? {...d, name: req.body.title, exp: req.body.exp} : d)
  res.status(200).json(db.dailies.find(d => d.id === +req.params.id))
})
dailiesRouter.delete('/:id', (req, res) => {
  db.dailies = db.dailies.filter(d => d.id !== +req.params.id)
  res.sendStatus(204)
})
