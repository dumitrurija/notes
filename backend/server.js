require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { mongoose } = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGODB_URI)

const Note = mongoose.model("Note", new mongoose.Schema({
  title: String,
  content: String,
  notebook: String,
  tags: Array,
  editedAt: { type: Date, default: Date.now }
}))

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find()
    res.send(notes)
  }
  catch (e) {
    res.send(`Error, ${e}`)
  }
})

app.get("/notes/search", async (req, res) => {
  try {
    const query = req.query.q

    const filtered = await Note.find({ $or: [
      { title: {$regex: query, $options: 'i'} },
      { content: {$regex: query, $options: 'i'} }
    ] })

    res.send(filtered)
  }
  catch (e) {
    res.send(`Error, ${e}`)
  }
})

app.post("/notes/add", async (req, res) => {
  try {
    const note = await Note.create(req.body)
    res.json(note)
  }
  catch (e) {
    res.send(`Erorr: ${e}`)
  }
})

app.put("/notes/edit/:id", async (req, res) => {
  try {
    const id = req.params.id

    res.send(await Note.findByIdAndUpdate(id, req.body))
  } 
  catch (e) {
    res.send(`Error, ${e}`)
  }
})

app.delete("/notes/delete/:id", async (req, res) => {
  try {
    const id = req.params.id

    res.send(await Note.findByIdAndDelete(id))
  }
  catch(e) {
    res.send(`Error, ${e}`)
  }
})

app.listen(3000)