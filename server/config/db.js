const mongoose = require("mongoose");

mongoose.set('strictQuery', false)
mongoose
  .connect("mongodb+srv://srj:srj@cluster0.r4rdw.mongodb.net/?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

module.exports = db;
