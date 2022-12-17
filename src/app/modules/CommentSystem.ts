class CommentSystem {
    DATA: string = "" // some data in localStorage

    public redraw(data: string) {
        
    }

    public createUser(nickname: string, ava: string) {
        const user = new User(nickname, ava)
        return user
    }

    public render() { //redraws the interface with the new data and creates the user
        this.redraw(this.DATA)
    }
}