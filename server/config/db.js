const mongoose = require("mongoose");

mongoose.set('strictQuery', false)
mongoose
  .connect("mongodb+srv://vishvascipy:vishvascipy@cluster0.pgnud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

module.exports = db;
