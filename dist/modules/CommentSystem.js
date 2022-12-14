"use strict";
class CommentSystem {
    constructor() {
        this.DATA = ""; // some data in localStorage
    }
    getData() {
        const LSdata = localStorage.getItem('DATA');
        if (LSdata) {
            this.DATA = LSdata;
        }
    }
    createUser() {
    }
    redraw(data) {
    }
    render() {
        this.createUser();
        this.getData();
        this.redraw(this.DATA);
    }
}
