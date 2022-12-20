class CommentSystem {
    private DATA: string | null
    protected comments: HTMLElement | null
    constructor() {
        if(!localStorage.getItem('DATA')) {
            this.DATA = '{"history": {}}'
            localStorage.setItem('DATA', this.DATA)
        } else {
            this.DATA = localStorage.getItem('DATA')
        }
        this.comments = document.querySelector('.commentSystem__comments')
    }

    public createCommentBlock(id:number, userNickname: string, userAva: string, commentsTxt:string, currentDate: string) { // метод для создания комментария
        const currentData = this.getDATA()  
        currentData.history[`commentBlock${id}`] = {
            id: id,
            comment: {
                commentNickname: userNickname,
                commentAvaPath: userAva,
                commentTime: currentDate,
                commentText: commentsTxt
            },
            reply: {}
        }
        
        localStorage.setItem('DATA', JSON.stringify(currentData))

        const commentHTMLTemplate = this.createTemplateComment(id, userNickname, userAva, commentsTxt, currentDate)
        this.render(this.comments, commentHTMLTemplate, "afterbegin")       
    }

    public getDATA(): any {
        const currentData: string | null = localStorage.getItem('DATA')
        if(currentData) {
            const parseData = JSON.parse(currentData)
            if(Object.keys(parseData).includes('history')) {
                return parseData
            }
        }
    }

    public createReply(id:number, userNickname: string, preNickname: string, userAva: string, replyTxt:string, date: string) {

        const replyHTMLTemplate = this.createTemplateReply(userNickname, preNickname, userAva, replyTxt, date)

        if(this.comments) {
            const commentBlock: HTMLElement | null = this.comments.querySelector(`.commentSystem__commentBlock[data-id="${id}"`)
            this.render(commentBlock, replyHTMLTemplate, "afterend")
        }
    }

    protected updateComments() {
        const currentData = this.getDATA()
        let htmlTemplateComment: string;
        let commentBlock: string | number
        for(commentBlock in currentData.history) {
            htmlTemplateComment = this.createTemplateComment(
                currentData.history[commentBlock].id,
                currentData.history[commentBlock].comment.commentNickname,
                currentData.history[commentBlock].comment.commentAvaPath,
                currentData.history[commentBlock].comment.commentText,
                currentData.history[commentBlock].comment.commentTime
            )
            this.render(this.comments, htmlTemplateComment, "afterbegin")
        }
    }

    private createTemplateComment(id:number, userNickname: string, userAva: string, commentsTxt:string, date: string) {
        return `
        <div class="commentSystem__commentBlock" data-id=${id}>
            <div class="commentBlock__comment">
                <div class="commentBlock__ava">
                    <img  src="${userAva}" alt="avatar">
                </div>
                <div class="commentBlock__content">
                    <div class="commentBlock__title">
                        <h3 class="commentBlock__nickname">${userNickname}</h3>
                        <time class="commentBlock__time">${date}</time>
                    </div>
                    <p class="commentBlock__text">
                        ${commentsTxt}
                    </p>
                    <div class="commentBlock__btnBlock">
                        <button class="commentBlock__btnReply">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.55556 7.8V3L1 11.4L9.55556 19.8V14.88C15.6667 14.88 19.9444 16.8 23 21C21.7778 15 18.1111 9 9.55556 7.8Z" fill="black" fill-opacity="0.4"/>
                            </svg>
                            Ответить</button>
                        <button class="commentBlock__btnLike">
                            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.76429e-08 3.3004C-7.37892e-05 2.86187 0.0856773 2.42772 0.252242 2.02333C0.418806 1.61894 0.662843 1.25242 0.970088 0.94519C1.27733 0.63796 1.64163 0.396184 2.04167 0.233992C2.44172 0.0717996 2.86949 -0.00755503 3.3 0.000565904C3.80938 -0.00218914 4.31351 0.105347 4.77899 0.316048C5.24448 0.526749 5.66067 0.835802 6 1.22273C6.33933 0.835802 6.75552 0.526749 7.22101 0.316048C7.68649 0.105347 8.19062 -0.00218914 8.7 0.000565904C9.13051 -0.00755503 9.55828 0.0717996 9.95833 0.233992C10.3584 0.396184 10.7227 0.63796 11.0299 0.94519C11.3372 1.25242 11.5812 1.61894 11.7478 2.02333C11.9143 2.42772 12.0001 2.86187 12 3.3004C12 6.57334 8.1726 9.04455 6 11C3.8322 9.02805 4.76429e-08 6.57578 4.76429e-08 3.3004Z" fill="black" fill-opacity="0.4"/>
                            </svg>
                            В избранном
                        </button>
                        <div class="btnBlock__rate">
                            <button class="minus">-</button>
                            <span class="likeCounter">0</span>
                            <button class="plus">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    }

    private createTemplateReply(userNickname: string, preNickname: string, userAva: string, replyTxt:string, date: string) {
        return `
        <div class="commentBlock__reply">
            <div class="commentBlock__ava">
                <img  src="${userAva}" alt="">
            </div>
            <div class="commentBlock__content">
                <div class="commentBlock__title">
                    <h3 class="commentBlock__nickname">${userNickname}</h3>
                    <h3 class="commentBlock__prenickname">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.55556 7.8V3L1 11.4L9.55556 19.8V14.88C15.6667 14.88 19.9444 16.8 23 21C21.7778 15 18.1111 9 9.55556 7.8Z" fill="black" fill-opacity="0.4"/>
                        </svg>${preNickname}
                    </h3>
                    <time class="commentBlock__time">${date}</time>
                </div>
                <p class="commentBlock__text">
                    ${replyTxt}
                </p>
                <div class="commentBlock__btnBlock">
                    <button class="commentBlock__btnLike">
                        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 5.10061V5.10052C0.499895 4.48966 0.622268 3.88483 0.860046 3.32136C1.09783 2.75788 1.44629 2.24697 1.88521 1.81856C2.32414 1.39016 2.84473 1.05286 3.41663 0.826543C3.98854 0.60022 4.60018 0.489455 5.2158 0.50079L5.21579 0.50093L5.22764 0.500868C5.96375 0.496982 6.69219 0.648671 7.36467 0.945788C8.03715 1.2429 8.63819 1.6786 9.12807 2.22384L9.5 2.63779L9.87193 2.22384C10.3618 1.6786 10.9629 1.2429 11.6353 0.945788C12.3078 0.648671 13.0363 0.496982 13.7724 0.500868V0.501008L13.7842 0.50079C14.3998 0.489455 15.0115 0.60022 15.5834 0.826543C16.1553 1.05286 16.6759 1.39016 17.1148 1.81856C17.5537 2.24697 17.9022 2.75788 18.14 3.32136C18.3777 3.88483 18.5001 4.48966 18.5 5.10052V5.10061C18.5 7.4253 17.1052 9.52192 15.1846 11.4621C14.231 12.4255 13.1673 13.331 12.1187 14.1904C11.8187 14.4362 11.5187 14.6792 11.2229 14.9189C10.6205 15.407 10.0351 15.8812 9.50162 16.3372C8.9441 15.8563 8.33 15.3572 7.69843 14.8438C7.42938 14.6251 7.15717 14.4039 6.8848 14.1804C5.83611 13.3197 4.77208 12.4153 3.8178 11.4535C1.89607 9.5168 0.5 7.42669 0.5 5.10061Z" stroke="black" stroke-opacity="0.4"/>
                        </svg>
                        В избранное
                    </button>
                    <div class="btnBlock__rate">
                        <button class="minus">-</button>
                        <span class="likeCounter">0</span>
                        <button class="plus">+</button>
                    </div>
                </div>
            </div>
        </div>`
    }

    private render(element: HTMLElement | null, html: string, wayToAdd: InsertPosition) {
       if(element) element.insertAdjacentHTML(wayToAdd , html)
    }
}