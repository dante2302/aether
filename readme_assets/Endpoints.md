# ENDPOINTS FOR THE AETHER WEB API
# Table of Contents

<details>
  <summary>Authentication</summary>

  - [Sign Up](#sign-up)
  - [Login](#login)
</details>

<details>
  <summary>User</summary>

  - [Get Related Channels](#get-related-channels)
  - [Get Related Posts](#get-related-posts)
  - [Get Username by User ID](#get-username-by-user-id)
  - [Get User by Username](#get-user-by-username)
  - [Get Posts by User ID](#get-posts-by-user-id)
</details>

<details>
  <summary>Channel</summary>

  - [Get Channel by Name](#get-channel-by-name)
  - [Get Popular Channels](#get-popular-channels)
  - [Search Channels](#search-channels)
  - [Get Channel by ID](#get-channel-by-id)
  - [Get Channel Name by ID](#get-channel-name-by-id)
  - [Create Channel](#create-channel)
  - [Update Channel](#update-channel)
  - [Delete Channel](#delete-channel)
  - [Join Channel](#join-channel)
  - [Leave Channel](#leave-channel)
  - [Check Channel Membership](#check-channel-membership)
  - [Get Channel Member Count](#get-channel-member-count)
</details>

<details>
  <summary>Post</summary>

  - [Create Post](#create-post)
  - [Get Post by ID](#get-post-by-id)
  - [Get Popular Posts](#get-popular-posts)
  - [Get Likes Count for Post](#get-likes-count-for-post)
  - [Get Dislikes Count for Post](#get-dislikes-count-for-post)
  - [Get Comments for Post](#get-comments-for-post)
  - [Get Comment Count for Post](#get-comment-count-for-post)
</details>

<details>
  <summary>Comment</summary>

  - [Create Comment](#create-comment)
  - [Update Comment](#update-comment)
  - [Delete Comment](#delete-comment)
  - [Get Replies to Comment](#get-replies-to-comment)
  - [Create Reply](#create-reply)
  - [Update Reply](#update-reply)
  - [Delete Reply](#delete-reply)
</details>

<details>
  <summary>User Post Interaction</summary>
  
  <details>
  <summary>Like</summary>

  - [Get Likes by User ID](#get-likes-by-user-id)
  - [Create Like](#create-like)
  - [Delete Like](#delete-like)
  </details>
  
  <details>
  <summary>Dislike</summary>

  - [Get Dislikes by User ID](#get-dislikes-by-user-id)
  - [Create Dislike](#create-dislike)
  - [Delete Dislike](#delete-dislike)
  </details>
  
  <details>
  <summary>Save</summary>

  - [Create Save](#create-save)
  - [Get Saves by User ID](#get-saves-by-user-id)
  - [Delete Save](#delete-save)
  </details>
</details>

------

# Auth Endpoints
## Sign Up

- **Endpoint**: `/auth/signup`
- **Description**: Registers a new user with the provided sign-up data.
- **HTTP Method**: POST
- **Parameters**:
  - `signUpData`: JSON body containing sign-up data
- **Returns**: User data and access token upon successful registration
- **Authorization**: Allowed for all users

## Login

- **Endpoint**: `/auth/login`
- **Description**: Authenticates a user with provided credentials.
- **HTTP Method**: POST
- **Parameters**:
  - `userCredentials`: JSON body containing user credentials (username/email and password)
- **Returns**: User data and access token upon successful authentication
- **Authorization**: Allowed for all users
# User Endpoints

## Get Related Channels

- **Endpoint**: `/users/{id:guid}/related/channels`
- **Description**: Retrieves channels related to a user by their ID.
- **HTTP Method**: GET
- **Parameters**:
  - `{id}`: ID of the user (GUID)
- **Returns**: List of related channels
- **Authorization**: Allowed for all users

## Get Related Posts

- **Endpoint**: `/users/{id:guid}/related/posts`
- **Description**: Retrieves posts related to a user by their ID.
- **HTTP Method**: GET
- **Parameters**:
  - `{id}`: ID of the user (GUID)
  - `limit`: Optional query parameter for limiting the number of posts
  - `offset`: Optional query parameter for pagination offset
- **Returns**: List of related posts
- **Authorization**: Allowed for all users

## Get Username by User ID

- **Endpoint**: `/users/{id:guid}/username`
- **Description**: Retrieves the username of a user by their ID.
- **HTTP Method**: GET
- **Parameters**:
  - `{id}`: ID of the user (GUID)
- **Returns**: User's username
- **Authorization**: Allowed for all users

## Get User by Username

- **Endpoint**: `/users/{username}`
- **Description**: Retrieves user data by username.
- **HTTP Method**: GET
- **Parameters**:
  - `{username}`: Username of the user
- **Returns**: User data
- **Authorization**: Allowed for all users

## Get Posts by User ID

- **Endpoint**: `/users/{id:guid}/posts`
- **Description**: Retrieves posts authored by a user by their ID.
- **HTTP Method**: GET
- **Parameters**:
  - `{id}`: ID of the user (GUID)
- **Returns**: List of user's posts
- **Authorization**: Allowed for all users


-----

# Channel Endpoints

## Get Channel by Name

- **Endpoint**: `/channels/{name}`
- **Description**: Retrieves channel data by its name.
- **HTTP Method**: GET
- **Parameters**:
  - `{name}`: Name of the channel
- **Returns**: Channel data
- **Authorization**: Allowed for all users

## Get Popular Channels

- **Endpoint**: `/channels/popular`
- **Description**: Retrieves a list of popular channels.
- **HTTP Method**: GET
- **Returns**: List of popular channels
- **Authorization**: Allowed for all users

## Search Channels

- **Endpoint**: `/channels/search`
- **Description**: Searches for channels by name.
- **HTTP Method**: GET
- **Parameters**:
  - `name`: Name to search for
- **Returns**: Matching channels
- **Authorization**: Allowed for all users

## Get Channel by ID

- **Endpoint**: `/channels/{id:guid}`
- **Description**: Retrieves channel data by its ID.
- **HTTP Method**: GET
- **Parameters**:
  - `{id}`: ID of the channel (GUID)
- **Returns**: Channel data
- **Authorization**: Allowed for all users

## Get Channel Name by ID

- **Endpoint**: `/channels/{id:guid}/name`
- **Description**: Retrieves the name of a channel by its ID.
- **HTTP Method**: GET
- **Parameters**:
  - `{id}`: ID of the channel (GUID)
- **Returns**: Name of the channel
- **Authorization**: Allowed for all users

## Create Channel

- **Endpoint**: `/channels`
- **Description**: Creates a new channel.
- **HTTP Method**: POST
- **Parameters**:
  - `newChannel`: JSON body containing channel data
- **Returns**: Created channel data
- **Authorization**: Requires JWT authentication

## Update Channel

- **Endpoint**: `/channels`
- **Description**: Updates an existing channel.
- **HTTP Method**: PUT
- **Parameters**:
  - `updatedChannel`: JSON body containing updated channel data
- **Authorization**: Requires JWT authentication

## Delete Channel

- **Endpoint**: `/channels/{id:guid}`
- **Description**: Deletes a channel by its ID.
- **HTTP Method**: DELETE
- **Parameters**:
  - `{id}`: ID of the channel (GUID)
- **Authorization**: Requires JWT authentication

## Join Channel

- **Endpoint**: `/channels/{id:guid}/join`
- **Description**: Allows a user to join a channel.
- **HTTP Method**: POST
- **Parameters**:
  - `{id}`: ID of the channel (GUID)
  - `userId`: ID of the user to join the channel
- **Authorization**: Requires JWT authentication

## Leave Channel

- **Endpoint**: `/channels/{id:guid}/leave`
- **Description**: Allows a user to leave a channel.
- **HTTP Method**: DELETE
- **Parameters**:
  - `{id}`: ID of the channel (GUID)
  - `userId`: ID of the user to leave the channel
- **Authorization**: Requires JWT authentication

## Check if User Joined Channel

- **Endpoint**: `/channels/{channelId:guid}/isjoinedby/{userId:guid}`
- **Description**: Checks if a user has joined a channel.
- **HTTP Method**: GET
- **Parameters**:
  - `{channelId}`: ID of the channel (GUID)
  - `{userId}`: ID of the user (GUID)
- **Returns**: Boolean indicating if the user has joined the channel
- **Authorization**: Allowed for all users

## Get Member Count of Channel

- **Endpoint**: `/channels/{id:guid}/membercount`
- **Description**: Retrieves the number of members in a channel.
- **HTTP Method**: GET
- **Parameters**:
  - `{id}`: ID of the channel (GUID)
- **Returns**: Number of members in the channel
- **Authorization**: Allowed for all users

## Get Posts from Channel

- **Endpoint**: `/channels/{channelId:guid}/posts`
- **Description**: Retrieves posts from a specific channel.
- **HTTP Method**: GET
- **Parameters**:
  - `{channelId}`: ID of the channel (GUID)
  - `limit`: Optional query parameter for limiting the number of posts
  - `offset`: Optional query parameter for pagination offset
- **Returns**: List of posts from the channel
- **Authorization**: Allowed for all users

-----

# Post Endpoints
## Core Post Endpoints

## Create Post

- **Endpoint**: `/posts`
- **Description**: Creates a new post.
- **HTTP Method**: POST
- **Parameters**:
  - `newPost`: JSON body containing post data
- **Returns**: Created post data
- **Authorization**: Allowed for all users

## Get Post by ID

- **Endpoint**: `/posts/{postId:guid}`
- **Description**: Retrieves post data by its ID.
- **HTTP Method**: GET
- **Parameters**:
  - `{postId}`: ID of the post (GUID)
- **Returns**: Post data
- **Authorization**: Allowed for all users

## Get Popular Posts

- **Endpoint**: `/posts/popular`
- **Description**: Retrieves a list of popular posts.
- **HTTP Method**: GET
- **Parameters**:
  - `limit`: Optional query parameter for limiting the number of posts
  - `offset`: Optional query parameter for pagination offset
- **Returns**: List of popular posts
- **Authorization**: Allowed for all users

## Post UPI Endpoints

## Get Likes Count of Post

- **Endpoint**: `/posts/{postId:guid}/likescount`
- **Description**: Retrieves the number of likes for a specific post.
- **HTTP Method**: GET
- **Parameters**:
  - `{postId}`: ID of the post (GUID)
- **Returns**: Number of likes
- **Authorization**: Allowed for all users

## Get Dislikes Count of Post

- **Endpoint**: `/posts/{postId:guid}/dislikescount`
- **Description**: Retrieves the number of dislikes for a specific post.
- **HTTP Method**: GET
- **Parameters**:
  - `{postId}`: ID of the post (GUID)
- **Returns**: Number of dislikes
- **Authorization**: Allowed for all users

## Post Comment Endpoints

## Get Comments from Post

- **Endpoint**: `/posts/{postId:guid}/comments`
- **Description**: Retrieves comments associated with a specific post.
- **HTTP Method**: GET
- **Parameters**:
  - `{postId}`: ID of the post (GUID)
- **Returns**: List of comments
- **Authorization**: Allowed for all users

## Get Comment Count of Post

- **Endpoint**: `/posts/{postId:guid}/commentCount`
- **Description**: Retrieves the number of comments for a specific post.
- **HTTP Method**: GET
- **Parameters**:
  - `{postId}`: ID of the post (GUID)
- **Returns**: Number of comments
- **Authorization**: Allowed for all users

-----

## Comment Endpoints

### Create Comment

- **Endpoint**: `/comments`
- **Description**: Creates a new comment.
- **HTTP Method**: POST
- **Parameters**:
  - `newComment`: JSON body containing comment data
- **Returns**: Created comment data
- **Authorization**: Requires JWT authentication

### Update Comment

- **Endpoint**: `/comments`
- **Description**: Updates an existing comment.
- **HTTP Method**: PUT
- **Parameters**:
  - `updatedComment`: JSON body containing updated comment data
- **Authorization**: Requires JWT authentication

### Delete Comment

- **Endpoint**: `/comments/{id:guid}`
- **Description**: Deletes a comment by its ID.
- **HTTP Method**: DELETE
- **Parameters**:
  - `{id}`: ID of the comment (GUID)
- **Authorization**: Requires JWT authentication

## Reply Endpoints

### Get Replies from Comment

- **Endpoint**: `/comments/{commentId:guid}/replies`
- **Description**: Retrieves replies associated with a specific comment.
- **HTTP Method**: GET
- **Parameters**:
  - `{commentId}`: ID of the comment (GUID)
- **Returns**: List of replies
- **Authorization**: Allowed for all users

### Create Reply

- **Endpoint**: `/replies`
- **Description**: Creates a new reply.
- **HTTP Method**: POST
- **Parameters**:
  - `newReply`: JSON body containing reply data
- **Returns**: Created reply data
- **Authorization**: Requires JWT authentication

### Update Reply

- **Endpoint**: `/replies`
- **Description**: Updates an existing reply.
- **HTTP Method**: PUT
- **Parameters**:
  - `updatedReply`: JSON body containing updated reply data
- **Authorization**: Requires JWT authentication

### Delete Reply

- **Endpoint**: `/replies/{id:guid}`
- **Description**: Deletes a reply by its ID.
- **HTTP Method**: DELETE
- **Parameters**:
  - `{id}`: ID of the reply (GUID)
- **Authorization**: Requires JWT authentication
  
-----

# UPI Endpoints

## Like Endpoints

## Get Likes by User ID

- **Endpoint**: `/likes/{userId:guid}`
- **Description**: Retrieves likes associated with a specific user.
- **HTTP Method**: GET
- **Parameters**:
  - `{userId}`: ID of the user (GUID)
- **Returns**: List of likes
- **Authorization**: Allowed for all users

## Create Like

- **Endpoint**: `/likes`
- **Description**: Creates a like for a post.
- **HTTP Method**: POST
- **Parameters**:
  - `newLike`: JSON body containing like data
- **Returns**: Success message or error message
- **Authorization**: Requires JWT authentication

## Delete Like

- **Endpoint**: `/likes`
- **Description**: Deletes a like for a post.
- **HTTP Method**: DELETE
- **Parameters**:
  - `postId`: Query parameter for post ID
  - `userId`: Query parameter for user ID
- **Returns**: Success message or error message
- **Authorization**: Requires JWT authentication

## Dislike Endpoints

## Create Dislike

- **Endpoint**: `/dislikes`
- **Description**: Creates a dislike for a post.
- **HTTP Method**: POST
- **Parameters**:
  - `newDislike`: JSON body containing dislike data
- **Returns**: Success message or error message
- **Authorization**: Requires JWT authentication

## Get Dislikes by User ID

- **Endpoint**: `/dislikes/{userId:guid}`
- **Description**: Retrieves dislikes associated with a specific user.
- **HTTP Method**: GET
- **Parameters**:
  - `{userId}`: ID of the user (GUID)
- **Returns**: List of dislikes
- **Authorization**: Allowed for all users

## Delete Dislike

- **Endpoint**: `/dislikes`
- **Description**: Deletes a dislike for a post.
- **HTTP Method**: DELETE
- **Parameters**:
  - `postId`: Query parameter for post ID
  - `userId`: Query parameter for user ID
- **Returns**: Success message or error message
- **Authorization**: Requires JWT authentication

## Save Endpoints

## Create Save

- **Endpoint**: `/saves`
- **Description**: Creates a save for a post.
- **HTTP Method**: POST
- **Parameters**:
  - `newSave`: JSON body containing save data
- **Returns**: Success message or error message
- **Authorization**: Allowed for all users

## Get Saves by User ID

- **Endpoint**: `/saves/{userId:guid}`
- **Description**: Retrieves saves associated with a specific user.
- **HTTP Method**: GET
- **Parameters**:
  - `{userId}`: ID of the user (GUID)
- **Returns**: List of saves
- **Authorization**: Allowed for all users

## Delete Save

- **Endpoint**: `/saves`
- **Description**: Deletes a save for a post.
- **HTTP Method**: DELETE
- **Parameters**:
  - `postId`: Query parameter for post ID
  - `userId`: Query parameter for user ID
- **Returns**: Success message or error message
- **Authorization**: Requires JWT authentication
