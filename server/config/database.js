const mongoose = require('mongoose');
const config = require('./config');
// const connectDB = async () => {
//   const conn = await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   console.log(`MongoDB connected`)
// }
const connectDB = (server) => {
    const connection = mongoose
    .connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        server.listen(config.port, () => console.log(`Server started on port ${config.port}`));
    })
    .catch((err) => {
        console.log('Error while connecting to MongoDB', err);
    })
}
module.exports = { connectDB }

