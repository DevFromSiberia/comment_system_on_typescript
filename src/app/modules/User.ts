class User extends CommentSystem {
    private nickname: string
    private ava: string
    private form: UserForm
    constructor(nickname: string, ava: string) {
        super()
        this.nickname = nickname
        this.ava = ava

        this.form = new UserForm()
        this.form.listenerTextArea()
    }
    
    comment() {
        
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