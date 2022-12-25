class Rating {

    public addListenerCommentsRatingBtns(commentID: number) {
        const commentBlockEl: HTMLElement | null = document.querySelector(`[data-commentid="${commentID}"]`)
        if(commentBlockEl) {
            const ratingBtnBlock = commentBlockEl.querySelector('.btnBlock__rating')

            const ratingBtnBlockListener = () => {
                console.log(commentBlockEl.dataset.commentid)
            }

            if(ratingBtnBlock) ratingBtnBlock.addEventListener('click', ratingBtnBlockListener)
        }
    }

    public addListenerReplyRatingBtns(commentID: number | undefined, replyID: number) {
        const commentBlockEl: HTMLElement | null = document.querySelector(`[data-commentid="${commentID}"]`)
        if(commentBlockEl) {
            const replyEl: HTMLElement | null = commentBlockEl.querySelector(`[data-replyid="${replyID}"]`)
            if(replyEl) {
                const ratingBtnBlock = replyEl.querySelector('.btnBlock__rating')

                const ratingBtnBlockListener = () => {
                    console.log(commentBlockEl.dataset.commentid, replyEl.dataset.replyid)
                }

                if(ratingBtnBlock) ratingBtnBlock.addEventListener('click', ratingBtnBlockListener)
            }
        }
    }
}