/* Script for filter dropdown */

const filterDropdown: HTMLElement | null = document.querySelector('.filter__dropdown')

const filterSelected: HTMLElement | null = filterDropdown !== null 
? filterDropdown.querySelector('.filter__selected')
: null

const filterSelectedSVG: SVGSVGElement | null = filterSelected !== null 
? filterSelected.querySelector('svg')
: null

const filterSelectedSPAN: HTMLElement | null = filterSelected !== null 
? filterSelected.querySelector('span')
: null

const filterList: HTMLElement | null = filterDropdown !== null
? filterDropdown.querySelector('.filter__list')
: null

const filterItems: NodeListOf<Element> | null = filterList !== null
? filterList.querySelectorAll('.filter__item')
: null

if(filterSelected !== null) filterSelected.addEventListener('click', dropdown)

function dropdown() {
    if(filterList !== null) {
        if(filterList.style.display === 'block') {
            filterList.style.display = 'none'
            if(filterSelectedSVG !== null) filterSelectedSVG.style.rotate = '0deg'
        } else {
            filterList.style.display = 'block'
            if(filterSelectedSVG !== null) filterSelectedSVG.style.rotate = '180deg'
        }
    } 
    if(filterItems !== null) filterItems.forEach(chooseItem)
}

function chooseItem(item: any) {
    const span:HTMLElement | null = item.querySelector('span')
    const svg:SVGSVGElement | null = item.querySelector('svg')
    if(span?.innerHTML === filterSelectedSPAN?.innerHTML) {
        if(svg !== null) svg.style.display = 'block'
    } 
    
    item.addEventListener('click', (event: any) => {
        if(filterSelectedSPAN !== null) filterSelectedSPAN.innerHTML = event.target.innerHTML

        if(filterItems !== null) filterItems.forEach(item => {
            const svg:SVGSVGElement | null = item.querySelector('svg')
            if(svg !== null) svg.style.display = 'none'
        })
        
        if(span?.innerHTML === filterSelectedSPAN?.innerHTML) {
            if(svg !== null) svg.style.display = 'block'
        }

        if(filterList !== null) filterList.style.display = 'none'
        if(filterSelectedSVG !== null) filterSelectedSVG.style.rotate = '0deg'
    })
}