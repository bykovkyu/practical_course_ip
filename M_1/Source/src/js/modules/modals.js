const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll(),
            calcFormBtn = document.querySelector('.popup_calc_button'),
            calcProfileBtn = document.querySelector('.popup_calc_profile_button');

        let message = document.createElement('div');
        message.textContent = 'All fields are required';
        message.style.marginTop = '10px';
        message.style.color = 'red';

        const hideModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';
        };

        const hideAllModal = () => {
            windows.forEach((item) => (item.style.display = 'none'));
        };

        const showModal = () => {
            if (modal.getAttribute('data-calc') === 'form') {
                const formImgs = modal.querySelectorAll('.balcon_icons_img');
                formImgs.forEach((item) => item.classList.remove('do_image_more'));
                formImgs[0].classList.add('do_image_more');
                calcFormBtn.disabled = true;
                calcFormBtn.style.filter = 'grayscale(100%)';
                calcFormBtn.after(message);
            }
            if (modal.getAttribute('data-calc') === 'profile') {
                modal.querySelector('#view_type').value = '';
                modal.querySelectorAll('input').forEach((item) => {
                    item.checked = false;
                });
                calcProfileBtn.disabled = true;
                calcProfileBtn.style.filter = 'grayscale(100%)';
            }
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        };

        trigger.forEach((item) =>
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                hideAllModal();
                showModal();
            })
        );

        close.addEventListener('click', () => {
            hideAllModal();
            hideModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                hideAllModal();
                hideModal();
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    //   showModalByTime('.popup', 60000);
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
};

export default modals;
