class Filter extends CommentSystem {
    private commentSystemFilter: HTMLElement | null
    private filterDropdown: HTMLElement | null
    private filterFavorites: HTMLElement | null

    private filterItems: NodeListOf<Element> | null
    private filterSelected: HTMLElement | null
    private filterList: HTMLElement | null

    private comments: Comments
    constructor(commentsObj: Comments) {
        super()
        this.comments = commentsObj

        this.commentSystemFilter = document.querySelector('.commentSystem__filter')
        this.filterDropdown = this.commentSystemFilter !== null ? this.commentSystemFilter.querySelector('.filter__dropdown') : null
        this.filterSelected = this.filterDropdown !== null ? this.filterDropdown.querySelector('.filter__selected') : null
        this.filterList = this.filterDropdown !== null ? this.filterDropdown.querySelector('.filter__list') : null
        this.filterItems = this.filterDropdown !== null ? this.filterDropdown.querySelectorAll('.filter__item') : null
        this.filterFavorites = this.commentSystemFilter !== null ? this.commentSystemFilter.querySelector('.filter__favorites') : null
        
        this.dropdown()
        this.favoritesCommentFilter() 
    }

    public currentFilter() {
        if(this.filterSelected) {
            switch (this.filterSelected.innerHTML) {
                case 'По дате размещения': 
                    this.dateFilter()
                    break
                case 'По количеству оценок': 
                    this.ratingFilter()
                    break
                case 'По количеству ответов': 
                    this.replyNumberFilter()
                    break
            }    
        }
    }

    private favoritesCommentFilter() {
        const listener = (event: any) => {
            event.target.classList.toggle('filter__favorites_active')
            if(event.target.classList.contains('filter__favorites_active')) {
                super.userBlockHidden(true)
                this.comments.hiddenComments(true)
                this.comments.favorites.renderFavoriteComments()
            } else {
                super.userBlockHidden(false)
                this.comments.hiddenComments(false)
                this.comments.favorites.cleanFavoriteComments()
            }
        }
        if(this.filterFavorites) this.filterFavorites.addEventListener('click', listener)
    }

    private dropdown() {
        if(this.filterDropdown) {
            if(this.filterSelected !== null) this.filterSelected.addEventListener('click', () => {
                if(this.filterList !== null) {
                    if(this.filterList.style.display === 'block') {
                        this.filterList.style.display = 'none'
                    } else {
                        this.filterList.style.display = 'block'
                    }
                } 
                if(this.filterItems !== null) this.filterItems.forEach((item: any) => this.chooseItem(item))
            })
        }   
    }

    private chooseItem(item: any) {
        const span: HTMLElement | null = item.querySelector('span')
        const svg: SVGSVGElement | null = item.querySelector('svg')
        if(span && this.filterSelected && span.innerHTML === this.filterSelected.innerHTML) {
            if(svg !== null) svg.style.display = 'block'
        } 
        
        item.removeEventListener('click', this.itemListener)
        item.addEventListener('click', this.itemListener)
    }

    private itemListener = (event: any) => {
            if(this.filterSelected !== null) {
                this.filterSelected.innerHTML = event.target.innerHTML
                
                switch(event.target.innerHTML) {
                    case 'По количеству ответов':
                        this.replyNumberFilter()
                        break
                    case 'По количеству оценок':
                        this.ratingFilter()
                        break
                    case 'По дате размещения':
                        this.dateFilter()
                        break
                }
            }
            
            if(this.filterItems !== null) this.filterItems.forEach(item => {
                const svg:SVGSVGElement | null = item.querySelector('svg')
                if(svg !== null) svg.style.display = 'none'
            })      
            if(this.filterList !== null) this.filterList.style.display = 'none'
    }

    private dateFilter() {
        const data = super.getDATA()
        const array = data.history
        
        const newArr = array.sort((commentBlock_1: any, commentBlock_2: any) => {
            const a = new Date(commentBlock_1.comment.commentTime.fullDate).getTime()
            const b = new Date(commentBlock_2.comment.commentTime.fullDate).getTime()
            return a - b
        })
        data.history = newArr
        localStorage.setItem('DATA', JSON.stringify(data))
        this.comments.updateComments()
    }

    private replyNumberFilter() {
        const data = super.getDATA()
        const array = data.history
        const newArr = array.sort((commentBlock_1: any, commentBlock_2: any) => {
            const a = Object.keys(commentBlock_1.replyes).length
            const b = Object.keys(commentBlock_2.replyes).length
            return a - b
        })
        data.history = newArr
        localStorage.setItem('DATA', JSON.stringify(data))
        this.comments.updateComments()
    }

    private ratingFilter() {
        const data = super.getDATA()
        const array = data.history
        const newArr = array.sort((commentBlock_1: any, commentBlock_2: any) => {
            const a = commentBlock_1.rating
            const b = commentBlock_2.rating
            return a - b
        })
        data.history = newArr
        localStorage.setItem('DATA', JSON.stringify(data))
        this.comments.updateComments()
    }
}