class CommentSystem {
    private DATA: string | null
    private commentIDList: Array<number>

    protected userForm: UserForm
    constructor() {
        if(!localStorage.getItem('DATA')) { // инициализация переменной под данные
            this.DATA = '{"history": {}}'
            localStorage.setItem('DATA', this.DATA)
        } else {
            this.DATA = localStorage.getItem('DATA')
        }
        this.commentIDList = []
        this.userForm = new UserForm()
    }

    public createUser(nickname: string, ava: string): void { // метод создания пользователя
        const userAva: HTMLElement | null = document.querySelector('.ava')
        const userNickname: HTMLElement | null = document.querySelector('.userBlock__nickname')
        if(userNickname !== null) userNickname.innerHTML = nickname
        if(userAva !== null) userAva.setAttribute('src', ava)
        const comment = new Comments(this.userForm)
    }

    public getUserNickname() {
        const userNicknameElement: HTMLElement | null = document.querySelector('.userBlock__nickname')
        if(userNicknameElement) {
            const userNickname = userNicknameElement.innerHTML
            return userNickname
        }
    }

    public getUserAva() {
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

    protected updateHistory(id: number,commentBlock: object): void {
        const currentData = this.getDATA() // получение текущей даты
        currentData.history[`commentBlock_${id}`] = commentBlock
        localStorage.setItem('DATA', JSON.stringify(currentData)) // обновление истории
    }  

    protected updateIdList() {
        const history = this.getDATA().history
        let commentBlock
        for(commentBlock in history) {
            if(!this.commentIDList.includes(history[commentBlock].id)) {
                this.commentIDList.push(history[commentBlock].id)
            }
        }
    }
}