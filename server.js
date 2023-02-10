const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
const app = require('./app')
const dotenv=require("dotenv")
dotenv.config()
const {DB_HOST}=process.env
const connection = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});
connection
  .then(() => {
    app.listen(3000, function () {
      console.log(`Server running. Database connection successful. Use our API on port: 3000`)
    })
  })
  .catch((error) =>
  {
     console.log(`Server not running. Error message: ${error.message}`)
     process.exit(1)
  })
