class CommentSystem {
    private DATA: string | null
    private commentIDList: Array<number>
    private numberComments: number
    
    protected userForm: UserForm
    
    constructor() {
        if(!localStorage.getItem('DATA')) { // инициализация переменной под данные
            this.DATA = '{"user": {}, "history": {}}'
            localStorage.setItem('DATA', this.DATA)
        } else {
            this.DATA = localStorage.getItem('DATA')
        }
        this.commentIDList = []

        this.userForm = new UserForm()

        this.numberComments = 0
    }

    protected userBlockHidden(bool: boolean) {
        const userBlock: HTMLElement | null = document.querySelector('.commentSystem__userBlock')
        if(bool) {
            if(userBlock) userBlock.style.display = 'none'
        } else {
            if(userBlock) userBlock.style.display = 'flex'
        }
    }

    public createUser(nickname: string, ava: string): void { // метод создания пользователя
        const userAva: HTMLElement | null = document.querySelector('.ava')
        const userNickname: HTMLElement | null = document.querySelector('.userBlock__nickname')
        if(userNickname !== null) userNickname.innerHTML = nickname
        if(userAva !== null) userAva.setAttribute('src', ava)

        const data = this.getDATA()
        
        data.user = {
            userNickName: nickname,
            userAva: ava,
            favorites: data.user.favorites === undefined || Object.keys(data.user.favorites).length === 0
            ? {} 
            : data.user.favorites
        }
        localStorage.setItem('DATA', JSON.stringify(data))

        const comment = new Comments(this.userForm)
        const filter = new Filter(comment)
    }

    protected getUserNickname() {
        const userNicknameElement: HTMLElement | null = document.querySelector('.userBlock__nickname')
        if(userNicknameElement) {
            const userNickname = userNicknameElement.innerHTML
            return userNickname
        }
    }

    protected getUserAva() {
        const userAvaElement: HTMLElement | null = document.querySelector('.ava')
        if(userAvaElement !== null) {
            const userAva = userAvaElement.getAttribute('src')
            return userAva
        }
    }
    
    protected getDATA(): any { //метод для получения данных из истории
        const currentData: string | null = localStorage.getItem('DATA')
        if(currentData) {
            const parseData = JSON.parse(currentData)
            if(Object.keys(parseData).includes('history')) {
                return parseData
            }
        }
    }

    protected getCurrentDate(): string {
        const date = new Date()
        const currentDate = `${date.getDate()}.${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`
        return currentDate
    }

    protected updateHistoryComments(commentID: number,commentBlock: object): void {
        const currentData = this.getDATA() // получение текущих данных
        currentData.history[`commentBlock_${commentID}`] = commentBlock
        localStorage.setItem('DATA', JSON.stringify(currentData)) // обновление истории
    } 
    
    protected updateHistoryReply(commentID: number | undefined, replyID: number, replyBlock: object) {
        const currentData = this.getDATA() // получение текущих данных
        currentData.history[`commentBlock_${commentID}`].replyes[`reply_${replyID}`] = replyBlock
        localStorage.setItem('DATA', JSON.stringify(currentData))
    }

    protected updateIdList() {
        const history = this.getDATA().history
        let commentBlock
        for(commentBlock in history) {
            if(!this.commentIDList.includes(history[commentBlock].commentID)) {
                this.commentIDList.push(history[commentBlock].commentID)
            }
        }
    }

    protected updateNumberComments() {
        const numberCommentsElement = document.querySelector('.commentSystem__count')
        this.numberComments = this.getNumberComments()
        if(numberCommentsElement) numberCommentsElement.innerHTML = `(${this.numberComments})`
    }

    protected getNumberComments(): number {
        return Object.keys(this.getDATA().history).length
    }
}