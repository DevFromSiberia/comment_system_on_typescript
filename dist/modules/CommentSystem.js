"use strict";
class CommentSystem {
    constructor() {
        this.DATA = ""; // some data in localStorage
    }
    redraw(data) {
    }
    createUser(nickname, ava) {
        const user = new User(nickname, ava);
        return user;
    }
    render() {
        this.redraw(this.DATA);
    }
}
