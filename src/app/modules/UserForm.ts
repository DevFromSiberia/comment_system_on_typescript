class UserForm {
    private textarea: HTMLInputElement | null
    private charWarning: HTMLElement | null
    private paddingBottomPlusTop: number
    private maxChar: number
    private autosize
    private checkQuantityChar

    constructor() {
        this.textarea = document.querySelector('.userBlock__textarea')
        this.charWarning = document.querySelector('.userBlock__maxCharWarning')
        this.paddingBottomPlusTop = 40
        this.maxChar = 1000

        this.autosize = (): void => {
            if(this.textarea !== null) {
                this.textarea.style.height = '0px';
                this.textarea.style.height = (this.textarea.scrollHeight - this.paddingBottomPlusTop) + "px";
            }
        }

        this.checkQuantityChar = (): void => {
            if(this.textarea !== null) {
                const strTextarea: string = this.textarea.value
                if(this.charWarning !== null) {
                    if(+strTextarea.length >= this.maxChar) {
                        this.charWarning.style.display = 'block'
                    }
                    else {
                        this.charWarning.style.display = 'none'
                    }
                }
            }
        }
    }

    public listenerTextArea(): void {
        if(this.textarea !== null) {
            this.textarea.setAttribute("style", "height:" + (this.textarea.scrollHeight - this.paddingBottomPlusTop) + "px;overflow-y:hidden;");
            this.textarea.addEventListener("input", this.autosize, false);

            this.textarea.addEventListener("keyup", this.checkQuantityChar, false);
        }
    }
}
