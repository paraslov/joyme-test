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
    return await dailiesTestCollection.findOne({id})
  },
  async createNewDaily(title: string, exp: number): Promise<DailiesViewModel | null> {
    if (title && exp) {
      const newDaily: DailiesViewModel = { id: +new Date(), title, exp }
      await dailiesTestCollection.insertOne(newDaily)

      return newDaily
    }
    return null
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
