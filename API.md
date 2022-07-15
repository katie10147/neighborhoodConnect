# /users routes

### `GET` /user
##### returns the username of the current session user
##### status codes: [200]

### `GET` /:id?
##### returns user with id req.params.id
##### status codes: [200]

### `GET` /:username?/followedRequests
##### returns list of requests with at least one tag in user.followedTags
##### status codes: [200]

### `PATCH` /:username
##### updates the current username to req.params.username
##### status codes: [200]

### `PATCH` /followTag/:tagName?
##### adds tagName to current user.followedTags
##### status codes: [200]

### `DELETE` /
#### signs out the currently signed in user and deletes their account
#### status codes: [200, 403] 

# /requests routes
### `GET` /
##### returns list of all requests
##### status codes: [200]

### `GET` /comments/:reqId
##### returns list of all comments on request with reqId
##### status codes: [200]

### `GET` /resolve/:id
##### returns resolution status of a request
##### status codes: [200]

### `GET` /likes/:id
##### returns the number of likes for a request
##### status codes: [200]

### `GET` /dislikes/:id
##### returns the number of dislikes for a request
##### status codes: [200]

### `GET` /likes/:id/:username
##### checks if user liked a request
##### status codes: [200, 400]

### `POST` /
##### creates request with content from req.body
##### status codes: [200, 404]

### `POST` /comment
##### adds comment to request with req.body.reqId
##### status codes: [200]

### `PATCH` /edit
##### updates request with req.body.id to have req.body.content
##### status codes: [200, 404]

### `PATCH` /resolve/:id
##### resolves a request
##### status codes: [200, 404]

### `PATCH` /like/:id
##### likes or unlikes a request
##### status codes: [200, 404]

### `PATCH` /dislike/:id
##### dislikes or removes dislike from a request
##### status codes: [200, 404]

### `PATCH` /tags/:id
##### edits tags of a request
##### status codes: [200, 404]

### `DELETE` /:reqId
##### deletes request
##### status codes: [200, 404]

# /tags routes

### `GET` /allTags
##### returns an array of all the Tag objects
##### status codes: [200]

### `POST` /create
##### returns the created tag
##### status codes: [200]

### `DELETE` /:name?
##### returns the deleted tag
##### status codes: [200]

# /api/session routes

### `POST` /
##### creates user session
##### status codes: [200]

### `POST` /signIn
##### signs in user
##### status codes: [200, 400, 404]

### `DELETE` /
##### deletes session
##### status codes: [200, 404]
