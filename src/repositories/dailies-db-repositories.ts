import { DailiesViewModel } from '../models/dailies/DailiesViewModel'
import { dailiesTestCollection } from './db'

export const dailiesRepositories = {
  async getDailies(searchTerm: string | undefined): Promise<DailiesViewModel[]> {
    const filter: any = {}

    if (searchTerm) {
      filter.title = { $regex: searchTerm}
    }

    return dailiesTestCollection.find(filter).toArray()
  },
  async findDailyById(id: number): Promise<DailiesViewModel | null> {
    return dailiesTestCollection.findOne({id})
  },
  async createNewDaily(newDaily: DailiesViewModel): Promise<DailiesViewModel | null> {
    await dailiesTestCollection.insertOne(newDaily)
    return newDaily
  },
  async updateDaily(payload: DailiesViewModel): Promise<boolean> {
    const { id, title, exp } = payload
    const result = await dailiesTestCollection.updateOne({id}, {
      $set: { title, exp }
    })

    return result?.matchedCount === 1
  },
  async deleteDaily(id: number): Promise<boolean> {
    const result = await dailiesTestCollection.deleteOne({id})

    return result.deletedCount === 1
  }
}
