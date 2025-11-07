import mongoose from "mongoose";
const { Schema } = mongoose;

// Check if the model already exists to prevent recompilation
const Issue = mongoose.models.Issue || 
  mongoose.model(
    "Issue",
    new Schema({
      title: { 
        type: String, 
        required: [true, 'Title is required'] 
      },
      description: { 
        type: String, 
        required: [true, 'Description is required'] 
      },
      repository: {
        type: Schema.Types.ObjectId,
        ref: "Repository",
        required: [true, 'Repository reference is required']
      },
      status: { 
        type: String, 
        enum: {
          values: ["Open", "Closed"],
          message: 'Status must be either Open or Closed'
        }, 
        default: "Open" 
      }
    }, {
      timestamps: true
    })
  );

export default Issue;
