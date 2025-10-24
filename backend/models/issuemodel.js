const mongoose = require("mongoose");
const { Schema } = mongoose;

const issueSchema = new Schema({
    timestamps:true,
  title: { type: String, required: true },
  description: { type: String, required: true },
  repository: {
    type: Schema.Types.ObjectId,
    ref: "Repository",
    required: true,
  },
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  
});
const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
