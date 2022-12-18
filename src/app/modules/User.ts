class User extends CommentSystem { // класс пользователя
    private textarea: UserForm
    private nickname: string
    private ava: string

    constructor(nickname: string, ava: string) {
        super()

        this.nickname = nickname
        this.ava = ava
        
        this.textarea = new UserForm() // получения текстового поля с кнопкой пользователя
        
        this.createUser()
        this.comment() // разрешение пользователю комментировать
    }

    private createUser() { // метод создания пользователя
        const userAva: HTMLElement | null = document.querySelector('.ava')
        const userNickname: HTMLElement | null = document.querySelector('.userBlock__nickname')
        if(userNickname !== null) userNickname.innerHTML = this.nickname
        if(userAva !== null) userAva.setAttribute('src', this.ava)
    }

    private comment() { // метод обработки и отправки комментария на создание
        const sendBtnElement: HTMLElement | null = document.querySelector('.userBlock__btn')
        if(sendBtnElement !== null) {
                sendBtnElement.addEventListener('click', () => { 
                if(!(sendBtnElement.classList.contains('--disable'))) {
                    const text = this.textarea.getTextTextarea()
                    super.createComment(text)
                    this.textarea.clearText()
                } 
            })
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