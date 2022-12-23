import { DailiesViewModel } from '../models/dailies/DailiesViewModel'
import { dailiesRepositories } from '../repositories/dailies-db-repositories'


export const dailiesService = {
  async getDailies(searchTerm: string | undefined): Promise<DailiesViewModel[]> {
    return dailiesRepositories.getDailies(searchTerm)
  },
  async findDailyById(id: number): Promise<DailiesViewModel | null> {
    return dailiesRepositories.findDailyById(id)
  },
  async createNewDaily(title: string, exp: number): Promise<DailiesViewModel | null> {
    if (title && exp) {
      const newDaily: DailiesViewModel = { id: +new Date(), title, exp }

      return dailiesRepositories.createNewDaily(newDaily)
    }
    return null
  },
  async updateDaily(payload: DailiesViewModel): Promise<boolean> {
    return dailiesRepositories.updateDaily(payload)
  },
  async deleteDaily(id: number): Promise<boolean> {
    return dailiesRepositories.deleteDaily(id)
  }
}
