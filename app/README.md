##Server 

###Install
First, you need to create database for ChessGame:
```sh
psql
CREATE DATABASE chess;
```

Second, you start from `nextiva-chess-game/app` command:
```sh
nodemon server.js
```



###Authorization
For authorization needs to add to headers:
`Authorization: Bearer ${token}`



###API

You need to add `/api/v1` to route.

For `user`:

Route   | Params                                        | Return
--------|-----------------------------------------------|------------------------
/signup | email, username, password, repeat_password    | token
/signin | email, password                               | username, token


For socket:

Route   | Params                                        | Return
--------|-----------------------------------------------|------------------------
/socket | token*                                        | *connection for socket on server

####Socket

Emit

Route                       | Params                                        | Return
----------------------------|-----------------------------------------------|------------------------
connection (on)             |                                               | subscribe, *rooms emit
rooms (emit)                |                                               | all rooms (array)
room.create (on)            | token, state                                  | room, *rooms emit, status - 201
room.connect (on)           | token, game_id                                | *rooms emit, status - 201
room.connect-visitor (on)   | token, game_id                                | *rooms emit, status - 201
disconnect (on)             |                                               | unsubscribe
