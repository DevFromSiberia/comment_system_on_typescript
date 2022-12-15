/* Script for autosize user's textarea */
const textarea: HTMLElement | null = document.querySelector('.userBlock__textarea')
    const paddingBottomPlusTop = 40
    if(textarea !== null) {
    
    textarea.setAttribute("style", "height:" + (textarea.scrollHeight - paddingBottomPlusTop) + "px;overflow-y:hidden;");
    textarea.addEventListener("input", OnInput, false);
}

function OnInput() {
    if(textarea !== null) {
        textarea.style.height = '0px';
        textarea.style.height = (textarea.scrollHeight - paddingBottomPlusTop) + "px";
    }
}


