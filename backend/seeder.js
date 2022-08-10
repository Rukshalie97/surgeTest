const mongoose = require("mongoose");
const User = require("./models/user.model");
mongoose
  .connect(
    "mongodb+srv://Tharu:Tharu12345@cluster0.nhnlbou.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connection open");
  })
  .catch((e) => {
    console.log(e);
  });

const users = [
  {
    first_name: "Tharu",
    mobile: "0710373050",
    last_name: "Rukshalie",
    email: "tharu@gmail.com",
    user_name: "Admin",
    password: "abc123",
    account_type: "admin",
  },
];
const seedDb = async () => {
  await User.insertMany(users);
};
seedDb().then(() => {
  console.log("Users added");
  mongoose.connection.close();
});

//https://javascript.plainenglish.io/seeding-mongodb-database-from-node-the-simplest-way-3d6a0c1c4668
