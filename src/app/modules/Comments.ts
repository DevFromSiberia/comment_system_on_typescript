class Comments extends CommentSystem { // класс создания коммент блока
    private commentID: number
    public replyes: Replyes

    constructor() {
        super()
        this.commentID = Object.keys(super.getDATA().history).length// получение id комментария исходя из количества комментариев в истории 
        
        this.replyes = new Replyes()

        this.updateComments()
    }

    public createCommentBlock(userNickname: string, userAva: string, commentsText: string) {       
        const currentDate = super.getCurrentDate() // получение текущей даты
        const commetsText = commentsText

        const newCommentBlock = { // запись блока с комментарием
            id: this.commentID,
            comment: {
                commentNickname: userNickname,
                commentAvaPath: userAva,
                commentTime: currentDate,
                commentText: commetsText
            },
            reply: {}
        }
        super.updateHistory(this.commentID, newCommentBlock) // обновление истории
        super.updateIdList() // обновление списка с id комментариев

        
        const commentHTMLTemplate = this.getTemplateComment(this.commentID, userNickname, userAva, commetsText, currentDate)
        this.renderComment(commentHTMLTemplate) // отрисовка шаблона
        this.replyes.addListenerReplyBtn(this.commentID)
        this.commentID++
    }

    private renderComment(html: string) { // метод отрисовки комментариев
        const comments: HTMLElement | null = document.querySelector('.commentSystem__comments')
        if(comments) comments.insertAdjacentHTML("afterbegin" , html)
    }

    private updateComments() { // метод для обновления списка комментария в соответствии с историей
        const currentData = super.getDATA()
        
        let htmlTemplateComment: string;
        // let htmlTemplateReply: string;
        let commentBlock: string | number

        for(commentBlock in currentData.history) {
            htmlTemplateComment = this.getTemplateComment(
                currentData.history[commentBlock].id,
                currentData.history[commentBlock].comment.commentNickname,
                currentData.history[commentBlock].comment.commentAvaPath,
                currentData.history[commentBlock].comment.commentText,
                currentData.history[commentBlock].comment.commentTime,
            )
            this.renderComment(htmlTemplateComment)
            this.replyes.addListenerReplyBtn(currentData.history[commentBlock].id)
        }
    }

    private getTemplateComment(id:number, userNickname: string, userAva: string, commentsTxt:string, date: string)       { // для хранения и получения шаблона комментария по необходимости
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
}  