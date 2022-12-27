class Filter extends CommentSystem {
    private filterDropdown: HTMLElement | null
    private filterItems: NodeListOf<Element> | null
    private filterSelected: HTMLElement | null
    private filterList: HTMLElement | null
    constructor() {
        super()
        this.filterDropdown = document.querySelector('.filter__dropdown')
        this.filterSelected = this.filterDropdown !== null ? this.filterDropdown.querySelector('.filter__selected') : null
        this.filterList = this.filterDropdown !== null ? this.filterDropdown.querySelector('.filter__list') : null
        this.filterItems = this.filterDropdown !== null ? this.filterDropdown.querySelectorAll('.filter__item') : null
        this.dropdown()        
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
        
        item.addEventListener('click', (event: any) => {
            if(this.filterSelected !== null) this.filterSelected.innerHTML = event.target.innerHTML
    
            if(this.filterItems !== null) this.filterItems.forEach(item => {
                const svg:SVGSVGElement | null = item.querySelector('svg')
                if(svg !== null) svg.style.display = 'none'
            })
            
            if(span && this.filterSelected && span.innerHTML === this.filterSelected.innerHTML) {
                if(svg !== null) svg.style.display = 'block'
            }
    
            if(this.filterList !== null) this.filterList.style.display = 'none'
        })
    }
}