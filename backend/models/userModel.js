import mongoose from "mongoose";
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

const User = mongoose.model("User", userSchema);

export { default as User } from './userModel.js';
export default User;
