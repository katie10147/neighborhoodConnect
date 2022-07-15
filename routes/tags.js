const express = require('express');

const Users = require('../controllers/users-controller.js');
const Requests = require('../controllers/requests-controller.js');
const Tags = require("../controllers/tags-controller.js");
const Middleware = require('./middleware.js');

const router = express.Router();


/**
 * Gets all tags
 * User does not need to be signed in
 * 
 * @name GET /tags/allTags
 */
router.get('/allTags', async (req, res) => {
    const allTags = await Tags.getAllTags();
    res.status(200).json(allTags).end();
});



/**
 * Create a tag
 * User must be signed in
 * 
 * @name POST /tags/create
 * 
 * @param {String} name the name of the tag
 */
router.post('/create', [Middleware.userIsSignedIn], async (req, res) => {
    const name = req.body.name
    newTag = await Tags.createTag(name);
    if (newTag){
        res.status(200).json(newTag).end();
    }
    
});

/**
 * Delete a tag
 * User must be signed in
 * 
 * @name DELETE /tags/:name?
 * 
 * @param {String} name the name of the tag
 */
 router.delete('/:name?', [Middleware.userIsSignedIn, Middleware.tagExists], async (req, res) => {
    const name = req.params.name
    newTag = await Tags.delete(name);
    res.status(200).json(newTag).end();
});



module.exports = router;