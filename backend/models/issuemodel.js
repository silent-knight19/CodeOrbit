import mongoose from "mongoose";
const { Schema } = mongoose;

const issueSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  repository: {
    type: Schema.Types.ObjectId,
    ref: "Repository",
    required: true,
  },
  status: { type: String, enum: ["Open", "Closed"], default: "Open" }
}, {
  timestamps: true
});
const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
