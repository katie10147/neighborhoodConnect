const express = require("express");

const router = express.Router();

const Users = require("../controllers/users-controller.js");
const Requests = require("../controllers/requests-controller.js")
const Middleware = require("./middleware.js"); 

/**
 * Change the username and/or password of current user. 
 *
 * @name PATCH /users
 * 
 * @param username the username to change to
 * @param password the password to change to
 */
router.patch("/", [Middleware.userIsSignedIn, Middleware.usernameDoesNotAlreadyExist], async (req, res) => {
    const username = req.session.username;
    if (req.body.username) {
      updatedUsername = await Users.changeUsername(username, req.body.username);
      req.session.username = updatedUsername;
      res
      .status(200)
      .json({updatedUsername, message: "you have changed your credentials" })
      .end();
    }
    if (req.body.password) {
      updatedPassword = await Users.changePassword(username, req.body.password);
      req.session.password = updatedPassword;
      res
      .status(200)
      .json({updatedPassword, message: "you have changed your credentials" })
      .end();
    }
    
  }
);

/**
 * Follow tag for user
 *
 * @name PATCH /users/followTag/:tagName?
 * 
 * @param {String} tagName the name of the tag
 */
router.patch("/followTag/:tagName?",[Middleware.userIsSignedIn], async (req, res) => {
  let user = await Users.followTag(req.session.username , req.params.tagName)
  res.status(200).json({user: user, messgae: `Successfully followed ${req.params.tagName}`}).end();
});

/**
 * Unfollow a tag for user
 * 
 * @name PATCH /users
 * 
 * @param {String} tagName the name of the tag
 */
router.patch("/unfollowTag/:tagName?", async (req, res) => {
  let user = await Users.unfollowTag(req.session.username, req.params.tagName);
  res.status(200).json({user: user, message: `Successfully unfollowed ${req.params.tagName}`}).end();
})

/**
 * FInd a user by id number
 *
 * @name GET /users/:id?
 * 
 * @param id the id of the user to find
 */
 router.get("/:id?", async (req, res) => {
  let user = await Users.findOneById(req.params.id);
  res.status(200).json(user).end();
});

/**
 * Get a User by username
 *
 * @name GET /users/username/:username?
 * 
 * @param username the username of the user to find
 */
 router.get("/username/:username?", async (req, res) => {
  let user = await Users.findOne(req.params.username);
  res.status(200).json(user).end();
});


/**
 * Get the follow requests for a particular user
 *
 * @name GET /users/:username?/followedRequests
 * 
 * @param username the username of the user to find
 */
 router.get("/:username?/followedRequests", async (req, res) => {
  let followedRequests = await Users.getFollowRequests(req.params.username);
  res.status(200).json(followedRequests).end();
});

/**
 * Delete a user from the database
 * the user must be signed in
 * 
 * @name DELETE /users
 */
router.delete("/", [Middleware.userIsSignedIn], async (req, res) => {
  let username = req.session.username;
  let user = await Users.deleteUser(username);
  let numDeleted = await Requests.deleteRequestsForUser(username);
  console.log('deleted posts', numDeleted);
  if (user){
    req.session.username = undefined; 
    res.status(200).json({message: `${user.username}  successfully deleted.`, deletedUser: user, numDeleted: numDeleted}).end();
    
  } else {
    res.status(400).json({error: 'The user and their requests could not be deleted.'})
  }
})



module.exports = router;