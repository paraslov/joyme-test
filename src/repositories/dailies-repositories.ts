import { db } from '../index'

export const dailiesRepositories = {
  getDailies(searchTerm: string | undefined) {
    let dailies = db.dailies

    if (searchTerm) {
      dailies = db.dailies.filter(d => d.name.indexOf(searchTerm) > -1)
    }

    return dailies
  },
  findDailyById(id: number) {
    return db.dailies.find(d => d.id === Number(id))
  },
  createNewDaily(name: string, exp: number) {
    if (name && exp) {
      const newDaily = { id: +new Date(), name, exp }
      db.dailies.push(newDaily)
      return newDaily
    }
    return null
  },
  updateDaily(id: number, name: string, exp: number) {
    if (db.dailies.some(daily => daily.id === id) && name && exp) {
      db.dailies = db.dailies.map(d => d.id === id ? {...d, name, exp} : d)
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
