const User = require('../schemas/User');
const Requests = require('./requests-controller.js');

const findOne = async function (name){
    try{

        const user = await User.findOne({username: name}).exec();
        return user;
    } catch(err){
        return false;
    }
}

const findOneById = async function (id){
    try{
        const user = await User.findOne({"_id" : id}).exec();
        return user;
    } catch(err){
        console.log(err);
        return false;
    }
}

const addOne = async function (name, password){
    const user = new User({username: name, password: password, tags: []});
    try {
        await user.save();
        return user;
    } catch(err) {
        console.log(err);
        return false;
    }
}
    
const deleteUser = async function (username){
    const user = User.findOne({username: username}).exec();
    try{
        await User.deleteOne({username: username}).exec();
        return user;
    } catch (err) {
        console.log(err);
        return false;
    }
    
}

const followTag = async function (username, tagName) {
    try{
        const user = await User.findOne({username: username}).exec();
        if (!user.tags.includes(tagName)) {
            user.tags.push(tagName);   
        }
        await user.save();
        return user;
    } catch(err){
        console.log(err);
        return false;
    }
}

const unfollowTag = async function (username, tagName) {
    try{
        const user = await User.findOne({username: username}).exec();
        user.tags = user.tags.filter(t => t != tagName );
        await user.save();
        return user;
    } catch (err){
        console.log(err);
        return false;
    }
}

const getFollowRequests = async function (username) {
    try{
        const user = await User.findOne({username: username}).exec();
        if (user) {
            return Requests.getAllRequestsFromTags(user.tags);
        }
    } catch(err){
        console.log(err);
        return false;
    }
}
const changeUsername = async function (username, newUsername) {
    try{
        const user = await User.findOne({username: username}).exec();
        const requests = await Requests.getAllRequests();
        requests.forEach(req => {
            if (req.author == username){
                req.author = newUsername;
            }
            // updated likedBy
            if (req.likedBy.filter(u => u === username).length > 0){
                const likes = req.likedBy.filter(u => u === username);
                likes.push(newUsername);
                req.likedBy = likes;
            }
            if (req.dislikedBy.filter(u => u === username).length > 0){
                const dislikes = req.dislikedBy.filter(u => u === username);
                dislikes.push(newUsername);
                req.dislikedBy = dislikes;
            } 
            const comments = req.comments;
            comments.forEach(comment => {
                if (comment.auhor == username){
                    comment.author = newUsername;
                }
                if (comment.likedBy.filter(u => u === username).length > 0){
                    const likes = comment.likedBy.filter(u => u === username);
                    likes.push(newUsername);
                    comment.likedBy = likes;
                    comment.save();
                }
            })
            req.save();
        });
        user.username = newUsername;
        await user.save();
        return newUsername;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const changePassword = async function (username, newPassword) {
    try{
        const user = await User.findOne({username: username}).exec();
        user.password = newPassword;
        await user.save();
        return newPassword;
    } catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = Object.freeze({
    findOne,
    findOneById,
    addOne,
    followTag,
    getFollowRequests,
    getFollowRequests,
    changeUsername,
    changePassword,
    deleteUser,
    unfollowTag,
});
