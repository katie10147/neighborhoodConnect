const express = require('express');

const controller = require("../controllers/users-controller");
const Middleware = require("./middleware.js");

const router = express.Router();

/**
 * GET User
 * 
 * @name GET /session
 */
 router.get('/' , async (req, res) => {
  res.status(200).json(req.session.username).end();
});

/**
 * Create a new User
 * 
 * @name POST /session
 * 
 * @param {String} username the username of the newly created user
 * @param {String} password the password of the newly created user
 */
router.post('/',[Middleware.userNotSignedIn, Middleware.usernameDoesNotAlreadyExist, Middleware.usernameValid], async (req, res) => {
    const user = await controller.addOne(req.body.username, req.body.password);
    req.session.username = req.body.username;
    res.status(200).json({ username: req.session.username, user: user }).end();
});


/**
 * Sign in a user
 * 
 * @name Post /session/signIn
 * 
 * @param {String} username the username of the user attempting to sign in
 * @param {String} password the password of the user attempting to sign in 
 */
router.post('/signIn',[Middleware.userNotSignedIn, Middleware.userExists], async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await controller.findOne(username);
    if (!(user.password == password)) {
      console.log('password incorrect');
      res.status(400).json({
        error: `Password incorrect.`,
      }).end();
      return;
    }
    req.session.username = username;
    req.session.password = password;
    console.log(`User ${username} signed in`);
    res
      .status(200)
      .json({
        message: `User ${username} signed in`,
        user: user,
      })
      .end();
    });


/**
 * Disassociate the username signed in with their session.
 * 
 * @name DELETE /session
 */
router.delete('/',[Middleware.userIsSignedIn], (req, res) => {
  if (req.session.username === undefined) {
    res.status(400).json({message: "You must be logged in to log out"}).end();
  } else {
    let name = req.session.username;
    req.session.username = undefined;
    res.status(200).json({ message: `User ${name} has been logged out`, name: name}).end();
  }
});

module.exports = router;