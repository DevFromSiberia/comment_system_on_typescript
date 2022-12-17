    /* Script for autosize user's textarea */
    const textarea: HTMLInputElement | null = document.querySelector('.userBlock__textarea')
    const charWarning: HTMLElement | null = document.querySelector('.userBlock__maxCharWarning')
    const paddingBottomPlusTop = 40
    if(textarea !== null) {
    
    textarea.setAttribute("style", "height:" + (textarea.scrollHeight - paddingBottomPlusTop) + "px;overflow-y:hidden;");
    textarea.addEventListener("input", autosize, false);
    textarea.addEventListener("keyup", checkQuantityChar, false);

}

function autosize(): void{
    if(textarea !== null) {
        textarea.style.height = '0px';
        textarea.style.height = (textarea.scrollHeight - paddingBottomPlusTop) + "px";
    }
}

function checkQuantityChar(): void {
    if(textarea !== null) {
        const strTextarea: string = textarea.value
        if(charWarning !== null) {
            if(+strTextarea.length >= 1000) {
                charWarning.style.display = 'block'
            }
            else {
                charWarning.style.display = 'none'
            }
        }
    }
}
