const Users = require('../controllers/users-controller.js');
const Requests = require('../controllers/requests-controller.js');
const Tags = require('../controllers/tags-controller.js');
const { request } = require('express');

// Checks that the username in the request body or the request
// params object does not already exist
const usernameDoesNotAlreadyExist = async (req, res, next) => {
  if (req.body.username) {
    const user = await Users.findOne(req.body.username);
    console.log(user);
    if (user !== null) {
      res.status(400).json({
        error: `Username ${req.body.username} already exists.`,
      }).end();
      return;
    } 
  } 
  next();
};

// checks that the username is defined and at least one character
const usernameValid = (req, res, next) => {
  if (req.body.username) {
    if (req.body.username.length === 0) {
      res.status(404).json({
        error: `Username must be at least one character`,
      }).end();
      return;
    }
  }
  next();
};

// checks that the password is defined and at least one character
const passwordValid = (req, res, next) => {
  if (req.body.password) {
    if (req.body.password.length === 0) {
      res.status(404).json({
        error: `password must be at least one character`,
      }).end();
      return;
    }
  }
  next();
};

// Checks that the username and password is set in session
const userNotSignedIn = (req, res, next) => {
  if (req.session.username !== undefined) {
    res.status(403).json({
      error: 'User already signed in!'
    }).end();
    return;
  }
  next();
};

// Checks that the username and password is set in session
const userIsSignedIn = (req, res, next) => {
    if (req.session.username === undefined) {
      res.status(403).json({
        error: 'No user signed in!'
      }).end();
      return;
    }
    next();
};

// Checks that the username and password credentials for a user are correct
const signInValid = async (req, res, next) => {
  const user = await Users.findOne(req.body.username);
  if (user === undefined) {
    res.status(403).json({
      error: 'Username invalid!'
    }).end();
    return;
  }
  if (!(req.body.password === user.password)) {
    res.status(403).json({
      error: 'Password invalid!'
    }).end();
    return;
  }
  next();
};

const userExists = async (req, res, next) => {
  const user = await Users.findOne(req.body.username);
  if (!user) {
    res.status(400).json({
      error: `Username ${req.body.username} does not exist.`,
      incorrect: 'username',
    }).end();
    return;
  }
  next();
};

// assure that the request exists in the database
const requestExists = async (req, res, next) => {
  //checks for the request stored as 
  if (req.params.reqId){
    const request = await Requests.getRequest(req.params.reqId);
    if (!request){
      res.status(400).json({
        error: `Request does not exit with ID#${req.params.reqId}.`,
      }).end();
      return;
    }
  } else if (req.params.id){
    const request = await Requests.getRequest(req.params.id);
    if (!request){
      res.status(400).json({
        error: `Request does not exit with ID#${req.params.id}.`,
      }).end();
      return;
    }
  }
  else if (req.body.reqId){
    const request = await Requests.getRequest(req.body.reqId);
    if (!request){
      res.status(400).json({
        error: `Request does not exit with ID#${req.body.reqId}.`,
      }).end();
      return;
    }
  } 
  next();
}

// assure that the new request being created is valid
const requestValid = async (req, res, next) => {
  // check if there is content passed in
  if (!req.body.content){
    let message = 'The content field must have a message!';
    if (!req.body.subject){
      message = 'The content and subject fields must have a message!'
    }
    res.status(403).json({
      error: message,
    }).end();
    return;
  }  else if (!req.body.subject){
    res.status(403).json({
      error: 'The subject field must have a message!'
    }).end();
    return;
  }
  next();
}

// checks if an update to a request is valid
const requestUpdateValid = async (req, res, next) => {
  // first check if the request is valid
  const request = await Requests.getRequest(req.body.id);
  if (!request){
    res.status(400).json({
      error: `Request does not exit with ID#${req.body.id}.`,
    }).end();
    return;
  }
  // then check if the content is a valid update
  if (!req.body.content){
    const message = 'The content field must have a message!';
    res.status(403).json({
      error: message,
    }).end();
    return;
  }
  next();
}

// assure that the new request being created is valid
const commentValid = async (req, res, next) => {
  // check if there is content passed in
  if (!req.body.content){
    const message = 'The content field must have a message!';
    res.status(403).json({
      error: message,
    }).end();
    return;
  }  
  next();
}


const commentExits = async (req, res, next) => {
  if (req.body.commentId) {
    const comment = await Requests.getComment(req.body.commentId);
    if (!comment) {
      const message = 'The comment must exist !';
      res.status(400).json({
        error: message,
      }).end();
      return;
    }
  }
   else if (req.params.commentId) {
    const comment = await Requests.getComment(req.params.commentId);
    if (!comment) {
      const message = 'The comment must exist !';
      res.status(400).json({
        error: message,
      }).end();
      return;
    }
  }
}

// checks if an update to a request is valid
const commentUpdateValid = async (req, res, next) => {
  // first check if the comment is valid
  const comment = await Requests.getComment(req.body.commentId);
  if (!comment) {
    const message = 'The comment must exist !';
    res.status(400).json({
      error: message,
    }).end();
    return;
  }
  // then check if the content is a valid update
  if (!req.body.content){
    const message = 'The content field must have a message!';
    res.status(403).json({
      error: message,
    }).end();
    return;
  }
  next();
}

const tagExists =  async (req, res, next) => {
  const tag = await Tags.getTag(req.params.name);
  if (!tag){
    const message = 'The tag does not exist !';
    res.status(400).json({
      error: message,
    }).end();
    return;
  }
  next();
}




module.exports = Object.freeze({
    userNotSignedIn,
    usernameDoesNotAlreadyExist,
    usernameValid,
    passwordValid,
    userIsSignedIn,
    signInValid,
    userExists,
    requestExists,
    requestValid,
    requestUpdateValid,
    commentExits,
    commentUpdateValid,
    commentValid,
    tagExists
});