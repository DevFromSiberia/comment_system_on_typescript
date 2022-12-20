class User extends CommentSystem { // класс пользователя
    private textarea: UserForm
    private nickname: string
    private ava: string
    private commentID: number
    private sendBtnElement: HTMLElement | null
    private sendBtnListener: EventListener

    constructor(nickname: string, ava: string) {
        super()
        this.updateComments()
        
        this.nickname = nickname
        this.ava = ava
        
        this.textarea = new UserForm() // получения текстового поля с кнопкой пользователя

        this.sendBtnListener = () => {}
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

                this.reply(this.commentID) // добавляется возможность ответить на конкретный комментарий 

                this.commentID++
                this.textarea.clearTextarea() // очищается поле
            }   
        }
        if(this.sendBtnElement) this.sendBtnElement.addEventListener('click', this.sendBtnListener)
    }

    private reply(id: number) {
        this.comments = document.querySelector('.commentSystem__comments')
        const commentBlock = this.comments !== null ? this.comments.querySelector(`.commentSystem__commentBlock[data-id="${id}"`) : null
        
        if(commentBlock && this.comments) {
            const prenicknameElement: HTMLElement | null = commentBlock.querySelector('.commentBlock__nickname') // получение ника того кому отвечают
            const replyBtn: HTMLElement | null = commentBlock.querySelector('.commentBlock__btnReply') // получение кнопки "ответить" 

            this.comments.addEventListener('click', (event) => { // обработчик нажатия на кнопку ответить
                if(event.target === replyBtn) {
                    if(this.sendBtnElement) this.sendBtnElement.removeEventListener('click', this.sendBtnListener)
                    this.textarea.changeForm('Введите ваш ответ пользователю', 'Ответить')

                    this.sendBtnListener = () => { // перезапись обработчика кнопки отправки сообщения для ответа
                        if(this.sendBtnElement && !(this.sendBtnElement.classList.contains('--disable'))) {
                            const preparedComment = this.prepareComment()
                            if(prenicknameElement) {
                                const prenickname: string = prenicknameElement.innerHTML
                                super.createReply(id, this.nickname, prenickname, this.ava, preparedComment.text, preparedComment.currentDate) // создание ответа
                                this.textarea.changeForm('Введите текст сообщения...', 'Отправить')
                                this.textarea.clearTextarea()
                            }
                        }
                    }
                    if(this.sendBtnElement) this.sendBtnElement.addEventListener('click', this.sendBtnListener)
                }
                else this.comment()
            })
        }        
    }

    private prepareComment() {
        const text = this.textarea.getTextTextarea() // получение текста из текстового поля
        const date = new Date()
        const currentDate = `${date.getDate()}.${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`

        return {
            text: text,
            currentDate: currentDate
        }
    }

    like() {

    }

    rate() {

    }

    applyFilter() {

    }
}