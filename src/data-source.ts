import { MongoClient as Mongo, Db } from 'mongodb'
import 'dotenv/config'

const URI = process.env.MONGO_URI as string

export const MongoClient = {
    client: undefined as unknown as Mongo, 
    db: undefined as unknown as Db,
    
    async connect(): Promise<void> {
        const client = new Mongo(URI)
        const db = client.db(process.env.MONGO_DB);
        console.log("Server connected to database")
        
        this.client = client
        this.db = db
    }
}

