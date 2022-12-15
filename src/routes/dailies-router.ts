import { Router, Response } from "express";
import { dailiesRepositories } from '../repositories/dailies-repositories'
import { RequestBody, RequestParams, RequestParamsBody, RequestQuery } from '../models'
import { DailiesViewModel } from '../models/dailies/DailiesViewModel'
import { IdParamsModel } from '../models/URIParamsModel'
import { DailiesQueryModel } from '../models/dailies/DailiesQueryModel'
import { DailiesBodyModel } from '../models/dailies/DailiesBodyModel'

export const dailiesRouter = Router()

dailiesRouter.get('/', (
  req: RequestQuery<DailiesQueryModel>,
  res: Response<DailiesViewModel[]>) => {
  let dailies = dailiesRepositories.getDailies(req.query.searchTerm)
  res.json(dailies)
})

dailiesRouter.get('/:id', (
  req: RequestParams<IdParamsModel>,
  res: Response<DailiesViewModel>) => {
  const foundDaily = dailiesRepositories.findDailyById(Number(req.params.id))
  foundDaily ? res.json(foundDaily) : res.sendStatus(404)
})

dailiesRouter.post('/', (
  req: RequestBody<DailiesBodyModel>,
  res: Response<DailiesViewModel>) => {
  const newDaily = dailiesRepositories.createNewDaily(req.body.title, req.body.exp)
  newDaily ? res.status(201).json(newDaily) : res.sendStatus(400)
})

dailiesRouter.put('/:id', (
  req: RequestParamsBody<IdParamsModel, DailiesBodyModel>,
  res: Response<DailiesViewModel>) => {
  const isDailyUpdated = dailiesRepositories.updateDaily({
    id: Number(req.params.id),
    title: req.body.title,
    exp: req.body.exp,
  })
  if (isDailyUpdated) {
    const updatedDaily = dailiesRepositories.findDailyById(Number(req.params.id))
    res.status(200).json(updatedDaily)
  } else {
    res.sendStatus(400)
  }
})

dailiesRouter.delete('/:id', (
  req: RequestParams<IdParamsModel>,
  res) => {
  const isDailyDeleted = dailiesRepositories.deleteDaily(Number(req.params.id))
  isDailyDeleted ? res.sendStatus(204) : res.sendStatus(404)
})
