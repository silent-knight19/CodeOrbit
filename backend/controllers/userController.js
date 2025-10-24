const getAllUsers = (req, res) => {
    res.send("All users")
}

const signup=(req,res)=>{
    res.send("User signup")
}

const login=(req,res)=>{
    res.send("User login")
}
const getAllUsersProfile = (req, res) => {
    res.send("All users profile")
}
const updateUserProfile = (req, res) => {
    res.send("profile updated")
}
const deleteUserProfile = (req, res) => {
    res.send("profile deleted")
}
module.exports={
    getAllUsers,
    signup,
    login,
    getAllUsersProfile,
    updateUserProfile,
    deleteUserProfile,
}
     