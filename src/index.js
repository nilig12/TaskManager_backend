import app from "./app.js"
import { connectDB } from "./config/db.js"

const PORT = process.env.PORT || 5000

connectDB().catch((error) => {
    console.log(`Mongodb connection failed`, error)
})

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`app is listen on PORT:${PORT}`)
    })
}

export default app
