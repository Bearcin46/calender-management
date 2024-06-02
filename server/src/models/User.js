import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: string,
    required: true,
    unique: true,
  },
  googleId: String,
  accessToken: String,
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
