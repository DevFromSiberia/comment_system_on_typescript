/* Script for autosize user's textarea */

const textarea: HTMLElement | null = document.querySelector('.userBlock__textarea')
if(textarea !== null) {
    textarea.addEventListener('keydown', autosize)
}  

function autosize(){
    setTimeout(function(){
        if(textarea !== null) {
            textarea.style.cssText = 'height: 21px; padding: 0;';
            textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
        }
    },0)
}
