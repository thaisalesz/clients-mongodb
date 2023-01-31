import { hashSync } from "bcrypt"
import { MongoClient } from "../data-source"

export const createAdmin = async () => {
    const admin = await MongoClient.db.collection('admin').findOne({username: "desafiosharenergy"})
        if(!admin){
            const admin = {
                username: "desafiosharenergy",
                password: hashSync(process.env.ADMIN_PASS as string, 10)
            }
            await MongoClient.db.collection('admin').insertOne(admin)
        }
}