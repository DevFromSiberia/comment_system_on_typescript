class UserForm { // класс текстового поля с кнопкой пользователя
    private textarea: HTMLInputElement | null
    private charWarning: HTMLElement | null
    public sendBtn: HTMLElement | null
    private paddingBottomPlusTop: number
    private maxChar: number

    private autosize
    private checkQuantityChar

    constructor() {
        this.textarea = document.querySelector('.userBlock__textarea') // получение элемента текстового поля
        this.charWarning = document.querySelector('.userBlock__maxCharWarning') // получение элемента предупрежния о превышении символов
        this.sendBtn = document.querySelector('.userBlock__btn') // получение элемента кнопки отправить

        this.paddingBottomPlusTop = 40 // сумма верхнего и нижнего внутренних отступов в текстовом поле, нужна для корректного отображения текстового поля при изменении высоты
        this.maxChar = 1000 // максимальное количество символов в тестовом поле

        this.autosize = (): void => { // коллбэк функция для динамического изменения высоты текстового поля в зависимости от количество строк текста
            if(this.textarea !== null) {
                this.textarea.style.height = '0px';
                this.textarea.style.height = (this.textarea.scrollHeight - this.paddingBottomPlusTop) + "px";
            }
        }

        this.checkQuantityChar = (): void => { // коллбэк функция для проверки количества введенных символов
            const maxCharElement = document.querySelector('.userBlock__maxChar')
            if(this.textarea !== null && this.sendBtn !== null && this.charWarning !== null && maxCharElement !== null) {
                const strTextarea: string = this.textarea.value
                

                if(+strTextarea.length === 0) {
                    this.sendBtn.classList.add('--disable')
                    maxCharElement.innerHTML = `Макс. ${this.maxChar} символов`
                } else if(+strTextarea.length > 0) {
                    this.sendBtn.classList.remove('--disable')
                    maxCharElement.innerHTML = `${+strTextarea.length}/${this.maxChar}`
                }

                if(+strTextarea.length >= this.maxChar) {
                    this.charWarning.style.display = 'block'
                    this.sendBtn.classList.add('--disable')  
                } else if(+strTextarea.length < this.maxChar) {
                    this.charWarning.style.display = 'none'
                } 
                    
                    
            }
        }
        this.listenerUserForm()
    }

    private listenerUserForm(): void { // метод для определения прослушивателей событий на текстовом поле
        if(this.textarea && this.sendBtn) {
            this.textarea.setAttribute("style", "height:" + (this.textarea.scrollHeight - this.paddingBottomPlusTop) + "px;overflow-y:hidden;");
            this.textarea.addEventListener("input", this.autosize, false);

            this.textarea.addEventListener("keyup", this.checkQuantityChar, false);
        }
    }

    public getTextTextarea(): string { // метод для получения текста из текстового поля
        const textareaElement: HTMLInputElement | null = document.querySelector('.userBlock__textarea')
        const text = textareaElement !== null ? textareaElement.value: ""
        return text
    }

    public clearTextarea() { // метод очистки текстового поля текстового поля
        const textareaElement: HTMLInputElement | null = document.querySelector('.userBlock__textarea')
        const maxCharElement: HTMLInputElement | null = document.querySelector('.userBlock__maxChar')
        if(textareaElement) textareaElement.value = ""
        if(maxCharElement) maxCharElement.innerHTML = `Макс. ${this.maxChar} символов`
        if(this.sendBtn) this.sendBtn.classList.add('--disable')
    }

    public changeTextarea(textareaText: string) {
        if(this.textarea) this.textarea.placeholder = textareaText
    }

    public changeBtn(text: string) {
        if(this.sendBtn) this.sendBtn.innerHTML = text
    }
}
