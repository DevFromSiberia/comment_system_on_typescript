"use strict";
class User extends CommentSystem {
    constructor(nickname, ava) {
        super();
        this.nickname = nickname;
        this.ava = ava;
        this.textarea = new UserForm(); // получения текстового поля с кнопкой пользователя
        this.createUser();
        this.comment(); // разрешение пользователю комментировать
    }
    createUser() {
        const userAva = document.querySelector('.ava');
        const userNickname = document.querySelector('.userBlock__nickname');
        if (userNickname !== null)
            userNickname.innerHTML = this.nickname;
        if (userAva !== null)
            userAva.setAttribute('src', this.ava);
    }
    comment() {
        const sendBtnElement = document.querySelector('.userBlock__btn');
        if (sendBtnElement !== null) {
            sendBtnElement.addEventListener('click', () => {
                if (!(sendBtnElement.classList.contains('--disable'))) {
                    const text = this.textarea.getTextTextarea();
                    super.createComment(text);
                    this.textarea.clearText();
                }
            });
        }
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
