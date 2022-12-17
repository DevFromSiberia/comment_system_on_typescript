"use strict";
class User extends CommentSystem {
    constructor(nickname, ava) {
        super();
        this.nickname = nickname;
        this.ava = ava;
        this.form = new UserForm();
        this.form.listenerTextArea();
    }
    comment() {
        console.log(this.form);
    }
    reply() {
    }
    like() {
    }
    rate() {
    }
    applyFilter() {
    }
}
