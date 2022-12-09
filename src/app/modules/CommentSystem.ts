class CommentSystem {
    DATA: string = "" // some data in localStorage

    private getData() {
        const LSdata = localStorage.getItem('DATA')
        if(LSdata) {
            this.DATA = LSdata
        }
    }

    private createUser() {

    }

    public redraw(data: string) {
        
    }

    public render() { //redraws the interface with the new data and creates the user
        this.createUser()
        this.getData()
        this.redraw(this.DATA)
    }
}