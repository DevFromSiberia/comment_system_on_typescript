/* Script for autosize user's textarea */

const textarea: HTMLElement | null = document.querySelector('.userBlock__textarea')
if(textarea !== null) {
    textarea.addEventListener('keydown', autosize)
}  

function autosize(){
    setTimeout(function(){
        if(textarea !== null) {
            textarea.style.cssText = 'height: 16px; padding-bottom: 5px;';
            textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
        }
    },0)
}
