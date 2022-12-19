class User extends CommentSystem { // класс пользователя
    private textarea: UserForm
    private nickname: string
    private ava: string
    private commentID: number
    private sendBtnElement: HTMLElement | null
    private sendBtnListener: EventListener

    constructor(nickname: string, ava: string) {
        super()

        this.nickname = nickname
        this.ava = ava
        
        this.textarea = new UserForm() // получения текстового поля с кнопкой пользователя
        
        this.commentID = 0

        this.sendBtnListener = () => {}
        this.sendBtnElement = document.querySelector('.userBlock__btn')

        

        this.createUser() // метод создания пользователя

        this.comment() // разрешение пользователю комментировать
    }

    private createUser() { // метод создания пользователя
        const userAva: HTMLElement | null = document.querySelector('.ava')
        const userNickname: HTMLElement | null = document.querySelector('.userBlock__nickname')
        if(userNickname !== null) userNickname.innerHTML = this.nickname
        if(userAva !== null) userAva.setAttribute('src', this.ava)
    }

    private comment() {// метод обработки и отправки комментария на создание
        if(this.sendBtnElement) this.sendBtnElement.removeEventListener('click', this.sendBtnListener)
        this.textarea.changePlaceholderTexarea('Введите текст сообщения...')
        this.textarea.changeSendBtnText('Отправить') 

        this.sendBtnListener = () => {
            if(this.sendBtnElement && !(this.sendBtnElement.classList.contains('--disable'))) { // проверяется доступность кнопки
                const text = this.textarea.getTextTextarea() // получение текста из текстового поля
                const date = new Date()
                const currentDate = `${date.getDate()}.${date.getMonth()} ${date.getHours()}:${date.getMinutes()}` // вывод даты
                
                super.createCommentBlock(this.commentID, this.nickname, this.ava, text, currentDate) // создается комментарий от текущего пользователя
                
                this.reply(this.commentID) // добавляется возможность ответить на кокретный комментарий
                this.commentID++
                this.textarea.clearTextarea() // очищается поле
            }   
        }
        if(this.sendBtnElement) this.sendBtnElement.addEventListener('click', this.sendBtnListener)
    }

    private reply(id: number) {
        const comments: HTMLElement | null = document.querySelector('.commentSystem__comments')
        const commentBlock = comments !== null ? comments.querySelector(`.commentSystem__commentBlock[data-id="${id}"`) : null
        
        if(commentBlock && comments) {
            const prenicknameElement: HTMLElement | null = commentBlock.querySelector('.commentBlock__nickname')
            const replyBtn: HTMLElement | null = commentBlock.querySelector('.commentBlock__btnReply')
            comments.addEventListener('click', (event) => {
                if(event.target === replyBtn) {
                    this.textarea.focusTexarea()
                    this.textarea.changePlaceholderTexarea('Введите ваш ответ пользователю')
                    this.textarea.changeSendBtnText('Ответить')

                    if(this.sendBtnElement) this.sendBtnElement.removeEventListener('click', this.sendBtnListener)
                    
                    this.sendBtnListener = () => {
                        if(this.sendBtnElement && !(this.sendBtnElement.classList.contains('--disable'))) {
                            const text = this.textarea.getTextTextarea() // получение текста из текстового поля
                            const date = new Date()
                            const currentDate = `${date.getDate()}.${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`

                            if(prenicknameElement) {
                                const prenickname: string = prenicknameElement.innerHTML
                                super.createReply(id, this.nickname, prenickname, this.ava, text, currentDate)
                                this.textarea.clearTextarea()
                            }
                        }
                    }
                    
                    if(this.sendBtnElement) this.sendBtnElement.addEventListener('click', this.sendBtnListener)
                }
                else {
                    this.comment()
                }
            })
        }        
    }

    like() {

    }

    rate() {

    }

    applyFilter() {

    }
}