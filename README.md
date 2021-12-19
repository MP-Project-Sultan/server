# Graduation-Project

## Description
### Creating Community WebSite of programmers , which users can register with new account 

## User Story 
 ### Register : Create New account and active account with confirmation email .
 ### Login : Signin and Start use features offered .
 ### Logout : As a user i can Signout so nobody can use my Inof
 ### Create : I can create new Posts related to event or programming problem , Comments , Answer to any questions
 ### Edit : Previous posts or comment or answers
 ### Delete : Previous posts or comment or answers
 ### Edit Profile : as user if signed can edit profile
 ### Answer : Can add Answers to questions
 ### Admins there have full control like Delete and update and spam users with admin dashboard
 ### Users Can add and update thire own Posts 
#### presentation  slides on https://www.sultan.com

###
 HTTP Method  | authorization     |    Path   , HTTP code                             |  Request  Body                 
------------- | -----------   | ---------------------------            |----------------------
POST          | everyone      |`/user/create` =>  ok = 200 , error = 400          |{email,username, password, role} 
POST          | user + admin  |`/user/login`  =>   ok = 200 , error = 400                      |{email or username, password}
GET           | admin only    |`/user/`   =>   ok = 200 , error = 400                          |
DELETE        | admin only    |`/user/deleteusrid/:_id` => ok = 200 , error = 400                |
GET           | user          |`/user/confirmation/:confcode/` => ok = 200 , error = 400         |
PUT           | user          |`/user/forgetPassword`  => ok = 200 , error = 400            |{email}
PUT           | user          |`/user/resetPassword` => ok = 200 , error = 400|{resetCode, newPassword}
POST          | everyone      |`/user/googlelogin` =>  ok = 200 , error = 400 |{Token id}
post          | admin + user  |`/likes/`    =>   ok = 200 , error = 400 |{userId, PostId}
delete        | admin + user  |`/likes/:id`  =>          ok = 200 , error = 400                |{like id}
GET           | admin + user  |`/likes/:PostId`  =>    ok = 200 , error = 400                  |{postId}
POST          | admin + user  |`/comment/addComment` =>  ok = 200 , error = 400                 |{title, postId, userId}
PUT           | admin + user  |`/comment/update`  =>    ok = 200 , error = 400                  |{commentId, description}
DELETE        | admin + user  |`/comment/delete/:id` =>  ok = 200 , error = 400                 |
GET           | admin + user  |`/posts/`                               |
GET           | admin + user  |`/posts/getPost/:postid` => ok = 200 , error = 400                |
POST          | admin + user  |`/posts/addpost`   =>    ok = 200 , error = 400                 |{img, description}
PUT           | admin + user  |`/posts/updatepost/:_id` => ok = 200 , error = 400              |{id}
DELETE        | admin + user  |`/posts/delete/:_id`  =>   ok = 200 , error = 400               |

 


## ERD
![ERD](./ERD2.png)

## Models

- user model

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| username   | String          | required, unique | n/a           |
| email      | String          | required, unique | n/a           |
| password   | String          | required         | n/a           |
| roles      | Schema <roles>  | required         | n/a           |
| status     | Boolean         | n/a              | false         |

- roles model

| key  | type   | options          | default value |
| ---- | ------ | ---------------- | ------------- |
| role | String | required, unique | n/a           |

- posts model

| key         | type              | options  | default value |
| ----------- | ----------------- | -------- | ------------- |
| description | String            | required | n/a           |
| userId      | Schema <user>     | required | n/a           |
| time        | Number            | required | n/a           |

- comments model

| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| userId      | Schema <user>   | required | n/a           |
| description | String          | required | n/a           |
| postId      | Schema <post>   | required | n/a           |

- room model

| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| to          | Schema <user>   | required | n/a           |
| from        | Schema <user>   | required | n/a           |
| description | String          | required | n/a           |

- like model

| key         | type            | options  | default value |
| ----------- | --------------- | -------- | ------------- |
| userId      | Schema <user>   | required | n/a           |
| postId      | Schema <posts> | required | n/a            |

- message model 

| key      | type             | options  | default value |
| -------- | ---------------- | -------- | ------------- |
| user1    | Schema <user>    | required | n/a           |
| user2    | Schema <user>    | required | n/a           |
| messages | array of objects | required | n/a           |

## UML
![UML](./UML.png)





