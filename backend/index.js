const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const routes = require("./src/routes/routes.js")
const app = express()
app.use(express.json())
app.use(cors())
app.use("/v1", routes)

app.listen(8000, async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://narayandutta2208:Narayan2208@cluster0.a7nkloz.mongodb.net/tasksmanager?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log(`Connected`)
  } catch (err) {
    res.json({ msg: err.message })
  }
})
