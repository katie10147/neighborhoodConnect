const express = require('express');

const Users = require('../controllers/users-controller.js');
const Requests = require('../controllers/requests-controller.js');
const Middleware = require("./middleware.js");

const router = express.Router();


/**
 * 
 * Gets all requests
 * User does not need to be signed in
 * 
 * @name GET /requests
 */
router.get('/', async (req, res) => {
    const allReqs = await Requests.getAllRequests();
    res.status(200).json(allReqs).end();
});

/**
 * Gets request
 * 
 * @name GET /requests/reqId
 * 
 * @param {Number} reqId the id of the request
 */
router.get('/:reqId', [Middleware.requestExists], async (req, res) => {
    const request = await Requests.getRequest(req.params.reqId);
    res.status(200).json(request).end();
});

/**
 * Gets all comments on request
 * User does not need to be signed in
 * 
 * @name GET /requests/comments/:reqId
 * 
 * @param {Number} reqId the id of the request
 */
router.get('/comments/:reqId', [Middleware.requestExists], async (req, res) => {
    const allReqs = await Requests.getRequestComments(req.params.reqId);
    res.status(200).json(allReqs).end();
});

/**
 * 
 * Creates a comment
 * 
 * @name GET /requests/comment
 * 
 * @param {String} author the author of the comment
 * @param {String} content the content of the pody
 * @param {Number} id the id of the request this comment is located under
 */
 router.post('/comment', [Middleware.userIsSignedIn, Middleware.requestExists, Middleware.commentValid], async (req, res) => {
    const allReqs = await Requests.createComment(req.body.author, req.body.content, req.body.reqId);
    res.status(200).json(allReqs).end();
});

/**
 * 
 * Create a request
 * 
 * @name POST /requests
 * 
 * @param {String} subject the title of the request
 * @param {String} content the content of the request
 * @param {Array<Number>} location in the form [lat,long]
 */
router.post('/', [Middleware.requestValid], async (req, res) => {
    const username = req.body.username;
    const user = await Users.findOne(username);

    // const username = req.body.username;
    const message = req.body.content;
    const title = req.body.subject;
    const tags = req.body.tags;
    let newRequest;

    // const requestId = req.body.requestsId;
    if (req.body.location) {
        const latitude = req.body.location[0];
        const longitude = req.body.location[1];
        newRequest = await Requests.createRequest(title, message, username, user, tags, latitude, longitude);
    } else {
        newRequest = await Requests.createRequest(title, message, username, user, tags);
        
    }
    // send request
    res.status(200).json(newRequest).end();
});

/**
 * Edit a request
 * 
 * @name PATCH request/edit
 * 
 * @param {Number} id the id of the request
 * @param {String} content the new content for the request
 */
 router.patch('/edit', [Middleware.userIsSignedIn, Middleware.requestUpdateValid], async (req, res) => {
    const request = await Requests.editContent(req.body.id, req.body.content);
    res.status(200).json(request).end();
});

/**
 * Get the resolution status of a request
 * 
 * @name GET /requests/resolve/:id
 * 
 * @param {Number} id the id of the request
 * @param {String} status the current status of the request
 */
 router.get('/resolve/:id', [Middleware.requestExists], async (req, res) => {
    const request = await Requests.hasResolved(req.params.id);
    res.status(200).json(request).end();
});

/**
 * 
 * Resolve a request
 * 
 * 
 * @Patch /requests/resolve/id
 * 
 * @param {Number} id the id of the request
 * @param {String} status the current status of the request
 */
router.patch('/resolve/:id', [Middleware.userIsSignedIn, Middleware.requestExists], async (req, res) => {
    const request = await Requests.resolve(req.params.id);
    res.status(200).json(request).end();
});


/**
 * Like/Remove like from post
 * 
 * @patch /requests/like/id
 * 
 * @param {Number} id the id of the request
 */
router.patch('/like/:id', [Middleware.userIsSignedIn, Middleware.requestExists], async (req, res) => {
    const newLikes = await Requests.like(req.params.id, req.session.username);

    res.status(200).json({likes: newLikes}).end();
});

/**
 * Unlike/Remove unlike from a post
 * 
 * @patch /requests/dislike/:id
 * 
 * @param {Number} id the id of the request
 */
 router.patch('/dislike/:id',  [Middleware.userIsSignedIn, Middleware.requestExists], async (req, res) => {
    const newLikes = await Requests.dislike(req.params.id, req.session.username);
    res.status(200).json({dislikes: newLikes}).end();
});


/**
 * Get the number of likes for a specific request
 * 
 * @get /requests/likes/:id
 * 
 * @param {Number} id the id of the request
 */
 router.get('/likes/:id',  [Middleware.requestExists], async (req, res) => {
    const requestId = req.params.id;
    const numLikes = await Requests.numLikes(requestId);
    res.status(200).json({numLikes: numLikes}).end();
});

/**
 * Get the number of dislikes for a specific request
 * 
 * @name GET /requests/dislikes/:id?
 * 
 * @param {Number} id the id of the request
 */
 router.get('/dislikes/:id', [Middleware.requestExists], async (req, res) => {
    const requestId = req.params.id;
    const numDislikes = await Requests.numDislikes(requestId);
    res.status(200).json({numDislikes: numDislikes}).end();
});

/**
 * Check if a user has liked a certain post
 * 
 * @name GET /requests/likes/:id/:username
 * 
 * @param {Number} id the id of the request
 * @param {String} username the username of the request
 */
 router.get('/likes/:id/:username', [Middleware.userExists, Middleware.requestExists], async (req, res) => {
    const hasLiked = await Request.hasLiked(req.params.id, req.params.username)
    res.status(200).json({hasLiked: hasLiked}).end();
});

/**
 * Edits a Comment
 * 
 * @name PATCH /requests/comment
 * 
 * @param {Number} reqId the id of the request 
 * @param {String} commentId the id of the comment
 * @param {String} content the content of the comment to replace the current content
 */
router.patch('/comment', [Middleware.commentExits, Middleware.commentUpdateValid], async (req, res) => {
    const result = await Requests.editComment(req.body.reqId, req.body.commentId, req.body.content);
    res.status(200).json(result).end();
});

/**
 * Deletes a Comment
 * 
 * @name DELETE /requests/comment:reqId/:commentId
 * 
 * @param {String} reqId the id of the request 
 * @param {String} commentId the id of the comment
 */
 router.delete('/comment/:reqId/:commentId', [Middleware.requestExists, Middleware.commentExits], async (req, res) => {
   const result = await Requests.deleteComment(req.params.reqId, req.params.commentId);
   res.status(200).json(result).end();
});

/**
 * Delete a certain post, user must be signed in
 * 
 * @name DELETE /requests/:id
 * 
 * @param {String} reqId the id of the request
 */
router.delete('/:reqId', [Middleware.userIsSignedIn], async (req, res) => {
    const result = await Requests.deleteRequest(req.params.reqId);
    res.status(200).json(result).end();
});

    /**
 * 
 * Edit tags of a request
 * 
 * @name Patch /requests/tags/:id?
 * 
 * @param {Number} id the id of the request
 * @param {Array} tags the new tags of the request
 */
 router.patch('/tags/:id?', [Middleware.userIsSignedIn], (req, res) => {
    const request = Requests.editTags(req.params.id, req.body.tags);
    res.status(200).json(request).end();
});

module.exports = router;