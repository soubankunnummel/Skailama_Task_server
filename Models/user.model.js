import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },

  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
