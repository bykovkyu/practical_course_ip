// import checkNumInputs from './checkNumInputs';
import { postData } from '../services/requests';

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');

    // checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Loading...',
        success: 'Thank you. We will contact you soon.',
        failure: 'Something went wrong...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png',
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php',
    };

    const clearInputs = () => {
        inputs.forEach((item) => {
            item.value = '';
        });
        upload.forEach((item) => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };

    upload.forEach((item) => {
        item.addEventListener('input', () => {
            console.log(item.files[0].name);
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 6 ? (dots = '...') : (dots = '.');
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach((item) => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form')
                ? (api = path.designer)
                : (api = path.question);
            console.log(api);

            if (item.classList.contains('calc-form')) {
                const sum = document.querySelector('.calc-price').value;
                formData.append('sum', sum);
            }

            postData(api, formData)
                .then((res) => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 3000);
                    document.body.style.overflow = '';
                    if (item.getAttribute('data-calc') === 'end') {
                        for (let key in state) {
                            delete state[key];
                        }
                        state.form = 'Тип1';
                    }
                });
        });
    });
};

export default forms;