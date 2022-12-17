"use strict";
const commentSystem = new CommentSystem();
const user = commentSystem.createUser('Саня', "/f/f/f");
user.comment();
commentSystem.render();
