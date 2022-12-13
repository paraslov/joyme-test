import { Router } from "express";
import { dailiesRepositories } from '../repositories/dailies-repositories'

export const dailiesRouter = Router()

dailiesRouter.get('/', (req, res) => {
  let dailies = dailiesRepositories.getDailies(req.query.name as string | undefined)
  res.json(dailies)
})
dailiesRouter.get('/:id', (req, res) => {
  const foundDaily = dailiesRepositories.findDailyById(Number(req.params.id))
  foundDaily ? res.json(foundDaily) : res.sendStatus(404)
})
dailiesRouter.post('/', (req, res) => {
  const newDaily = dailiesRepositories.createNewDaily(req.body.title, req.body.exp)
  newDaily ? res.status(201).json(newDaily) : res.sendStatus(400)
})
dailiesRouter.put('/:id', (req, res) => {
  const isDailyUpdated = dailiesRepositories.updateDaily(Number(req.params.id), req.body.title, req.body.exp)
  if (isDailyUpdated) {
    const updatedDaily = dailiesRepositories.findDailyById(Number(req.params.id))
    res.status(200).json(updatedDaily)
  } else {
    res.sendStatus(400)
  }
})
dailiesRouter.delete('/:id', (req, res) => {
  const isDailyDeleted = dailiesRepositories.deleteDaily(Number(req.params.id))
  isDailyDeleted ? res.sendStatus(204) : res.sendStatus(404)
})
