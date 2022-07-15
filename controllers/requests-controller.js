const { Request, Comment } = require('../schemas/Request');

const createRequest = async function (title, reqContent, username, creatorId, tags, lat=false, long=false) {
    const req = new Request({
        title: title,
        content: reqContent,
        creator_id: creatorId,
        author: username,
        tags: tags,
    });
    
    // only assign these if passed in
    if (lat){
        req.latitude = lat;
    }
    if (long) {
        req.longitude = long;
    }

    try {
        await req.save();
        return req;
    } catch(err) {
        console.log(err);
        return false;
    }
}

const getAllRequests = async function () {
    try {
        const reqs = await Request.find({}).exec();
        return reqs;
    } catch(err) {
        console.log(err);
        return false;
    }
}

const getRequest = async function (reqId) {
    try {
        const req = await Request.findOne({_id: reqId}).exec();
        return req;
    } catch(err) {
        console.log(err);
        return false;
    }
}

const getAllRequestsFromTags = async function  (tags) {
    try {
        const reqs = await Request.find({}).exec();
        const tagReqs = new Set()
        for (let i = 0; i < reqs.length; i++) {
            let req = reqs[i];
            if (tags.some(t=> req.tags.includes(t))){
                tagReqs.add(req)
            }
        }
        return Array.from(tagReqs);
    } catch(err) {
        console.log(err);
        return false;
    }
}

const editTags = async function  (reqId, tags) {
    try {
        const req = await Request.findOne({_id: reqId}).exec();
        req.tags = tags;
        await req.save();
        return req;
    } catch(err) {
        console.log(err);
        return false;
    }
}

const getRequestComments = async function (reqId) {
    try {
        const request = await Request.findOne({_id: reqId}).exec();
        return request.comments;
    } catch(err) {
        console.log(err);
        return false;
    }
}

const editContent = async function (reqId, content) {
    try {
        const req = await Request.findOne({_id: reqId}).exec();
        req.content = content;
        await req.save();
        return req;
    } catch(err) {
        console.log(err);
        return false;
    }
}

const editComment = async function (reqId, commentId, content) {
    try {
        const request = await Request.findOne({_id: reqId}).exec();
        const comment = request.comments.filter(c => c._id == commentId)[0];
        comment.content = content;
        await request.save();
        return request;
    } catch(err) {
        console.log(err);
        return false;
    }
}

const getComment = async function (commentId) {
    try {
        const com = await Comment.findOne({_id: commentId}).exec();
    } catch(err) {
        console.log(err);
        return false;
    }
}

const hasResolved = async function (reqId) {
    try {
        const req = await Request.findOne({_id: reqId}).exec();
        return req.status === 'resolved';
    } catch(err) {
        console.log(err);
        return false;
    }
    
}

const resolve = async function (reqId) {
    try {
        const req = await Request.findOne({_id: reqId}).exec();
        req.status = await hasResolved(reqId) ? 'unresolved' : 'resolved';
        await req.save();
        return req;
    } catch(err) {
        console.log(err);
        return false;
    }
}


const hasLiked = async function (reqId, user){
    try {
        const req = await Request.findOne({_id: reqId}).exec();
        if(req.likedBy.filter(u => u === user).length > 0){
            return true;
        } 
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}
const hasDisliked = async function (reqId, user){
    try {
        const req = await Request.findOne({_id: reqId}).exec();
        if(req.dislikedBy.filter(u => u === user).length > 0){
            return true;
        } 
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const likedBy = async function (reqId){
    try {
        const req = await Request.findOne({_id: reqId}).exec();
        return req.likedBy;
    } catch (err) {
        console.log(err);
        return false;
    }
}
const dislikedBy = async function (reqId){
    try {
        const req = await Request.findOne({_id: reqId}).exec();
        return req.dislikedBy;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const like = async function (reqId, user) {
    try {
        const req = await Request.findOne({_id: reqId}).exec();
        if (!await hasLiked(reqId, user)){
            req.likedBy.push(user);
            req.dislikedBy = req.dislikedBy.filter(u => u !== user);
            await req.save();
            const curLikes = await numLikes(reqId);
            return curLikes
        }  
        else {
            const prevLikes = req.likedBy.length;
            req.likedBy = req.likedBy.filter(u => u !== user);
            await req.save();
            const curLikes = await numLikes(reqId);
            return curLikes;
        }
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

const dislike = async function (reqId, user) {
    try {
        const req = await Request.findOne({_id: reqId}).exec();
        // add a dislike
        if (!await hasDisliked(reqId, user)){
            req.dislikedBy.push(user);
            req.likedBy = req.likedBy.filter(u => u !== user);
            await req.save();
            const curLikes = await numDislikes(reqId);
            return curLikes
        }  
        // remove a dislike
        else {
            const prevLikes = req.likedBy.length;
            req.dislikedBy = req.likedBy.filter(u => u !== user);
            await req.save();
            const curLikes = numDislikes(reqId);
            return curLikes
        }
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

const numLikes = async function (reqId){
    try {
        const req = await Request.findOne({_id: reqId}).exec();
        return req.likedBy.length;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const numDislikes = async function (reqId){
    try {
        const req = await Request.findOne({_id: reqId}).exec();
        return req.dislikedBy.length;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const createComment = async function (author, content, reqId){
    try {
        const comment = new Comment({
            author: author,
            content: content,
        });
        await comment.save();
        await Request.updateOne({_id: reqId}, {$push: {comments: comment}}).exec();
        return comment;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteRequest = async function (reqId){
    try {
        const request = await Request.findOne({_id: reqId}).exec();
        const commentIds = request.comments.map((comment) => comment._id);
        commentIds.forEach(id => {
            Comment.deleteOne({_id: id}).exec();
        });
        request.comments = [];
        const result = await Request.deleteOne({_id: reqId}).exec();
        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteRequestsForUser = async function (username){
    try {
        const numDeleted = await Request.deleteMany({author: username}).exec();
        // also remove all comments of a user
        const allRequests = await Request.find({}).exec();
        allRequests.forEach(req => {
            req.comments = req.comments.filter(comment => comment.author != username);
            req.likedBy = req.likedBy.filter(u => u != username);
            req.dislikedBy = req.dislikedBy.filter(u => u != username);
            Comment.deleteMany({author: username}).exec();
            req.save();
        })
        return numDeleted.deletedCount;
    }catch (err) {
        console.log(err);
        return false;
    }
}


const deleteComment = async function (reqId, commentId){
    try {
        const request = await Request.findOne({_id: reqId}).exec();
        request.comments = request.comments.filter(c => c._id != commentId);
        await request.save();
        await Comment.deleteOne({_id: commentId}).exec();
        return request;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const changeUsername = async function (username, existingUsername) {
    try {
        const reqs = await getAllRequests(); 
        reqs.map(req => {
            if (req.author === existingUsername) {
                req.author = username;
                req.save();
            }
        });
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = Object.freeze({
    getAllRequests,
    getRequest,
    getAllRequestsFromTags,
    createRequest, 
    resolve, 
    editTags,
    getRequestComments,
    createRequest,
    editContent,
    editComment,
    createRequest, 
    resolve, 
    like,
    dislike,
    hasLiked,
    hasDisliked,
    numLikes,
    hasResolved,
    createComment,
    deleteRequest,
    deleteComment,
    likedBy,
    dislikedBy,
    numDislikes,
    changeUsername,
    getComment,
    deleteRequestsForUser,
})