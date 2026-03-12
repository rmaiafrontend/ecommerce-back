const mongoose = require('mongoose');
require('dotenv').config();
const senha = process.env.SENHA;
URL = `mongodb+srv://samarasonale:${senha}@cluster0.volkipl.mongodb.net/ToDoList?appName=Cluster0`
class Database {

  constructor() {
    this._connect();
  }

  _connect() {
    mongoose.connect(URL)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error');
      });
  }
}
module.exports = new Database();