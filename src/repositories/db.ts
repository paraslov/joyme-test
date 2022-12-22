import { MongoClient } from 'mongodb'
import { DailiesViewModel } from '../models/dailies/DailiesViewModel'

const uri = process.env.mongoURI || "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority";

export const client = new MongoClient(uri);

const joymeTestDB = client.db(('joyme_test'))
export const dailiesTestCollection = joymeTestDB.collection<DailiesViewModel>('dailies_test');

export const runDB = async () => {
  if (!client) return

  try {
    await client.connect();
    await client.db('joyme').command({ping: 1})
    console.log('Successfully connected to database')
  } catch (err) {
    console.log('Something goes wrong: ', err)
    await client.close();
  }
}
