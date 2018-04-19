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
room.create (on)            | token, state                                  | id, *rooms emit, status - 201
room.connect (on)           | token, game_id                                | *room.connect (emit), status - 201
room.connect (emit)         |                                               | time, state, first_player, second_player
room.connect-visitor (on)   | token, game_id                                | time, state, first_player, second_player, status - 201
room.move (on)              | token, game_id, state, is_give_up = false     | *room.move emit, status - 201
chat.local (on)             | token, game_id, limit = 50, offset = 0        | all messages local, status - 201
chat.general (on)           | token, limit = 50, offset = 0                 | all messages general, status - 201
chat.local.insert (on)      | token, message, game_id                       | *chat.local emit, status - 201
chat.general.insert (on)    | token, message                                | *chat.general emit, status - 201
chat.local (emit)           |                                               | username, message, time, game_id, status - 201
chat.general (emit)         |                                               | username, message, time, game_id, status - 201
disconnect (on)             |                                               | unsubscribe
