const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  repositories:[
    {
default:[ ],
type:Schema.Types.ObjectId,
ref:"Repository"
    },
],
followedUsers:[
    {
        default:[ ],
type:Schema.Types.ObjectId,
ref:"User"
    },
],
starredRepositories:[
    {
        default:[ ],
type:Schema.Types.ObjectId,
ref:"Repository"
    },
],
});

const user = mongoose.model("user", userSchema);
export default user; 
