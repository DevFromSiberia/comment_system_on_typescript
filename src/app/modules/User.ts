class User extends CommentSystem { // класс пользователя
    
    private nickname: string
    private ava: string
    private commentID: number
    private sendBtnElement: HTMLElement | null
    
    constructor(nickname: string, ava: string) {
        super()
        this.updateComments()
        
        this.nickname = nickname
        this.ava = ava
        
        this.sendBtnElement = document.querySelector('.userBlock__btn')

        this.commentID = Object.keys(this.getDATA().history).length // получение id комментария исходя из количества комментариев в истории
        
        this.createUser() // метод создания пользователя

        this.comment() // активация режима комментирования
    }

    private createUser() { // метод создания пользователя
        const userAva: HTMLElement | null = document.querySelector('.ava')
        const userNickname: HTMLElement | null = document.querySelector('.userBlock__nickname')
        if(userNickname !== null) userNickname.innerHTML = this.nickname
        if(userAva !== null) userAva.setAttribute('src', this.ava)
    }

    private comment() {// метод обработки и отправки комментария на создание
        if(this.sendBtnElement) this.sendBtnElement.removeEventListener('click', this.sendBtnListener)
        this.textarea.changeForm('Введите текст сообщения...', 'Отправить')

        this.sendBtnListener = () => {
            if(this.sendBtnElement && !(this.sendBtnElement.classList.contains('--disable'))) { // проверяется доступность кнопки
                const preparedComment = this.prepareComment() // подготовка комментария
                
                super.createCommentBlock(this.commentID, this.nickname, this.ava, preparedComment.text, preparedComment.currentDate) // создается комментарий от текущего пользователя
                this.commentID++
                this.textarea.clearTextarea() // очищается поле
            }   
        }
        if(this.sendBtnElement) this.sendBtnElement.addEventListener('click', this.sendBtnListener)
    }

    like() {

    }

    rate() {

    }

    applyFilter() {

    }
}