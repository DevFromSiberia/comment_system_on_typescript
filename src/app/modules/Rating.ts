class Rating {

    public addListenerCommentsRatingBtns(commentID: number) {
        const commentBlockEl: HTMLElement | null = document.querySelector(`[data-commentid="${commentID}"]`)
        if(commentBlockEl) {
            const ratingBtnBlock: HTMLElement | null = commentBlockEl.querySelector('.btnBlock__rating')
            if(ratingBtnBlock) this.listenerBtnBlock(ratingBtnBlock)
        }
    }

    public addListenerReplyRatingBtns(commentID: number | undefined, replyID: number) {
        const commentBlockEl: HTMLElement | null = document.querySelector(`[data-commentid="${commentID}"]`)
        if(commentBlockEl) {
            const replyEl: HTMLElement | null = commentBlockEl.querySelector(`[data-replyid="${replyID}"]`)
            if(replyEl) {
                const ratingBtnBlock: HTMLElement | null = replyEl.querySelector('.btnBlock__rating')
                if(ratingBtnBlock) this.listenerBtnBlock(ratingBtnBlock)
            }
        }
    }

    private listenerBtnBlock(ratingBlock: HTMLElement | null) {
        if(ratingBlock) {
            const plusBtn = ratingBlock.querySelector('.plus')
            const minusBtn = ratingBlock.querySelector('.minus')
            const counter = ratingBlock.querySelector('.likeCounter')
            const ratingBtnBlockListener = (event: Event) => {
                if(counter) {
                    if(event.target === plusBtn) {
                    
                        let curCounter: number = +counter.innerHTML
                        curCounter++
                        counter.innerHTML = String(curCounter)
                    
                    } else if(event.target === minusBtn) {
                        
                            let curCounter: number = +counter.innerHTML
                            curCounter--
                            counter.innerHTML = String(curCounter)
                        
                    }
                }
            }

            if(ratingBlock) ratingBlock.addEventListener('click', ratingBtnBlockListener)
        }
    }
}