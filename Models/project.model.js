import mongoose, { Schema } from "mongoose";

const projectSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  episods: {
    type: Number,
    default: 1,
  },
  podcast: [
    {
      type: Schema.Types.ObjectId,
      ref: "Podcast",
    },
  ],
});
const Project = mongoose.model("Project", projectSchema);
export default Project;
