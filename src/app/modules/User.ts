class User { // класс пользователя
    
    public nickname: string
    public ava: string
    
    constructor(nickname: string, ava: string) {
        this.nickname = nickname
        this.ava = ava
        
        this.createUser() // метод создания пользователя
    }

    private createUser() { // метод создания пользователя
        const userAva: HTMLElement | null = document.querySelector('.ava')
        const userNickname: HTMLElement | null = document.querySelector('.userBlock__nickname')
        if(userNickname !== null) userNickname.innerHTML = this.nickname
        if(userAva !== null) userAva.setAttribute('src', this.ava)
    }

    

    like() {

    }

    rate() {

    }

    applyFilter() {

    }
}