class User { // класс пользователя
    
    private nickname: string
    private ava: string
    private userForm: UserForm
    
    constructor(nickname: string, ava: string) {
        this.nickname = nickname
        this.ava = ava

        this.userForm = new UserForm(this.nickname, this.ava) // создание формы пользователя
        this.createUser() // метод создания пользователя
    }

    private createUser() { // метод создания пользователя
        const userAva: HTMLElement | null = document.querySelector('.ava')
        const userNickname: HTMLElement | null = document.querySelector('.userBlock__nickname')
        if(userNickname !== null) userNickname.innerHTML = this.nickname
        if(userAva !== null) userAva.setAttribute('src', this.ava)
    }
}