const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  registerDate: { type: Date, default: Date.now() },
  favoriteSeries: [{ type: Schema.Types.ObjectId, ref: "Serie" }],
});

userSchema.pre("save", function (next) {
  let user = this;
  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
