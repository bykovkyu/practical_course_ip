export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Loading...',
            success: 'Thank you. We will contact you soon.',
            failure: 'Something went wrong...',
        };
        this.path = 'assets/question.php';
    }

    clearIntputs() {
        this.inputs.forEach((input) => {
            input.value = '';
        });
    }

    checkMailInputs() {
        const txtInputs = document.querySelectorAll('[type="email"]');

        txtInputs.forEach((input) => {
            input.addEventListener('input', (e) => {
                input.value = input.value.replace(/[^a-z 0-9 @ \.]/gi, '');
            });
        });
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');

            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, (char) => {
                return /[_\d]/.test(char) && i < val.length
                    ? val.charAt(i++)
                    : i >= val.length
                    ? ''
                    : char;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll('[name="phone"]');

        inputs.forEach((input) => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData(url, data) {
        let res = await fetch(url, { method: 'POST', body: data });
        return await res.text();
    }

    init() {
        this.checkMailInputs();

        this.initMask();

        this.forms.forEach((form) => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then((res) => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearIntputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                    });
            });
        });
    }
}
