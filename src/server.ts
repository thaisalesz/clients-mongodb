import { app } from "./app"
import { MongoClient } from "./data-source"

  
app.listen(process.env.PORT || 3001, () => {
        MongoClient.connect()
        console.log(`Server running on port: ${process.env.PORT}`)
    }
)




