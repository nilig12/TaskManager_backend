import { app } from "./app.js"
import { connectDB } from "./config/db.js"

const PORT = process.env.PORT


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`app is listen on PORT:${PORT}`)
        })
    })
    .catch((error) => {
        console.log(`Mongodb connection failed`, error)
    })

