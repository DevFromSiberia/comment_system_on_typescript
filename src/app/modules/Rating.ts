class Rating extends CommentSystem {

    public addListenerCommentsRatingBtns(commentID: number) {
        const commentBlockEl: HTMLElement | null = document.querySelector(`[data-commentid="${commentID}"]`)
        if(commentBlockEl) {
            const ratingBtnBlock: HTMLElement | null = commentBlockEl.querySelector('.btnBlock__rating')
            if(ratingBtnBlock) this.listenerBtnBlock(ratingBtnBlock, commentID)
        }
    }

    public addListenerReplyRatingBtns(commentID: number, replyID: number) {
        const commentBlockEl: HTMLElement | null = document.querySelector(`[data-commentid="${commentID}"]`)
        if(commentBlockEl) {
            const replyEl: HTMLElement | null = commentBlockEl.querySelector(`[data-replyid="${replyID}"]`)
            if(replyEl) {
                const ratingBtnBlock: HTMLElement | null = replyEl.querySelector('.btnBlock__rating')
                if(ratingBtnBlock) this.listenerBtnBlock(ratingBtnBlock, commentID, replyID)
            }
        }
    }

    private listenerBtnBlock(ratingBlock: HTMLElement | null, commentID: number, replyID?: number) {
        const currentData = super.getDATA()
        let curCounter: number
        
        if(ratingBlock) {
            const plusBtn: HTMLElement | null = ratingBlock.querySelector('.plus')
            const minusBtn: HTMLElement | null = ratingBlock.querySelector('.minus')
            const counter: HTMLElement | null = ratingBlock.querySelector('.likeCounter')
            if(counter) {
                if(replyID === undefined) {
                    curCounter = currentData.history[`commentBlock_${commentID}`].rating === undefined 
                    ? 0 
                    : currentData.history[`commentBlock_${commentID}`].rating
                    counter.innerHTML = String(curCounter)
                } else {
                    curCounter = currentData.history[`commentBlock_${commentID}`].replyes[`reply_${replyID}`].rating === undefined 
                    ? 0 
                    : currentData.history[`commentBlock_${commentID}`].replyes[`reply_${replyID}`].rating
                    counter.innerHTML = String(curCounter)
                }
                this.changeStyleCounter(counter, curCounter)

                const ratingBtnBlockListener = (event: Event) => {
                        
                    if(event.target === plusBtn) {
                        curCounter++
                        counter.innerHTML = String(curCounter)
                        this.updateCounterHistory(curCounter, commentID, replyID)
                        this.changeStyleCounter(counter, curCounter)
                    } else if(event.target === minusBtn) {
                        curCounter--
                        counter.innerHTML = String(curCounter)
                        this.updateCounterHistory(curCounter, commentID, replyID)
                        this.changeStyleCounter(counter, curCounter)
                    }
                }
                if(ratingBlock) ratingBlock.addEventListener('click', ratingBtnBlockListener)
            }         
        }
    }

    private updateCounterHistory(curCounter: number, commentID: number, replyID?: number) {
        const currentData = super.getDATA()
        if(replyID === undefined) {
            currentData.history[`commentBlock_${commentID}`].rating = curCounter
            super.updateHistoryComments(commentID, currentData.history[`commentBlock_${commentID}`])
        } else {
            currentData.history[`commentBlock_${commentID}`].replyes[`reply_${replyID}`].rating = curCounter
            super.updateHistoryReply(commentID, replyID, currentData.history[`commentBlock_${commentID}`].replyes[`reply_${replyID}`])
        }
       
    }

    private changeStyleCounter(counterElement: HTMLElement, counterNumber: number) {
        if(counterNumber > 0) {
            counterElement.style.color = '#8AC540'
        } else if (counterNumber < 0) {
            counterElement.style.color = '#FF0000'
            counterElement.innerHTML = String(+counterElement.innerHTML * -1)
        } else {
            counterElement.style.color = '#000000'
        }
    }
}