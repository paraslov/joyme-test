import { db } from '../index'
import { DailiesViewModel } from '../models/dailies/DailiesViewModel'

export const dailiesRepositories = {
  getDailies(searchTerm: string | undefined) {
    let dailies = [...db.dailies]

    if (searchTerm) {
      dailies = db.dailies.filter(d => d.title.indexOf(searchTerm) > -1)
    }

    return dailies
  },
  findDailyById(id: number) {
    return db.dailies.find(d => d.id === Number(id))
  },
  createNewDaily(title: string, exp: number) {
    if (title && exp) {
      const newDaily: DailiesViewModel = { id: +new Date(), title, exp }
      db.dailies.push(newDaily)
      return newDaily
    }
    return null
  },
  updateDaily(payload: DailiesViewModel) {
    const { id, title, exp } = payload
    if (db.dailies.some(daily => daily.id === id) && title && exp) {
      db.dailies = db.dailies.map(d => d.id === id ? {...d, title, exp} : d)
      return true
    }
    return false
  },
  deleteDaily(id: number) {
    if (db.dailies.some(daily => daily.id === id)) {
      db.dailies = db.dailies.filter(d => d.id !== id)
      return true
    }
    return false
  }
}
