
# Nieghborhood Connect (https://ksda-neighborhood-connect.herokuapp.com/#/)
## K.S.D.A
### Purpose and Functionality
Neighborhood Connect is designed to allow citizens of Boston to submit requests to local public
officials, check the status of those requests, as well as interact with other requests that have been posted by fellow citizens. We have created this service to give greater transparency to the users who submit requests as well as heightened funcitonality for the people who are tasked with fulfilling these requests.

### Instructions to Run Locally:
In command line:
```console
$ npm run serve
```
In a separate shell:
```console
$ npm run develop
```
then you will find the application at `localhost:8080` in the browser

If you do not have mongodb installed, run brew install mongodb-community@5.0.  Then to start the local mongodb run brew services start mongodb-community@5.0



### Authorship:
* **Ashton Robinson**:
  * schemas
    * Request.js
  * controllers:
    * requests-controller.js
  * components
    * ResolveButton
    * UpvoteButton
    * Request
  * routes:
    * requests.js
    * users.js
  * README.md
* **Katie Pelton**:
  * schemas
    * Tag.js
  * controllers: 
    * tags-controller.js
    * users-controller.js
    * requests-controller.js
  * routes 
    * users.js
    * tags.js
    * requests.js
  * components
    * RequestsMap 
    * Map
    * ChangeUsername 
    * ChangePassword
    * Container
    * CreateRequest
    * Delete User
    * GenericForm
    * NavBar
    * Request
    * ResolveButton
    * SignIn
    * SignOut 
    * UpvoteButton
  * views:
    * CreateRequest
    * Main
    * Settings
    * SignIn
    * SignUp
  * Boilerplate code (main.js, app.vue)
* **Dan Pilsbury**:
  * schemas
    * User.js
  * controllers:
    * user-controller.js
    * reqiests-controller.js
  * routes:
    * users.js
  * Components
    * AboutSection
    * CommentSection
    * Comment
    * DeleteReq
    * EditReq
    * HomeSection
    * Nav
    * Req
    * Resolved
    * Unresolved
    * VoteButton
  * views
    * About
    * Main
  * db 
* **Shannon Hagmaier**:
  * routes:
    * userMiddleware
    * users
    * session
  * components
    * AddTag
    * CreateRequest
    * DeleteRequest
    * EditRequest
    * Tags
    * Request
    * FollowingTags
  * views
    * Settings
    * FollowRequests
  * App.vue/router.js
  * base code (main.js, app.vue)
