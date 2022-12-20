import { MongoClient } from 'mongodb'


const uri = process.env.mongoURI || null;
const client = uri && new MongoClient(uri);

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
