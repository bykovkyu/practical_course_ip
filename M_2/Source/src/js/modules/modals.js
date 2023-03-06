const modals = () => {
    let btnPressed = false;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll(),
            calcFormBtn = document.querySelector('.popup_calc_button'),
            calcProfileBtn = document.querySelector('.popup_calc_profile_button'),
            gift = document.querySelector('.fixed-gift');

        let message = document.createElement('div');
        message.textContent = 'All fields are required';
        message.style.marginTop = '10px';
        message.style.color = 'red';

        const hideModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';
            if (gift) {
                gift.style.right = '';
            }
        };

        const hideAllModal = () => {
            windows.forEach((item) => {
                item.style.display = 'none';
                item.classList.add('animated', 'fadeIn');
            });
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
            if (gift) {
                gift.style.right = `${+getComputedStyle(gift).right.slice(0, -2) + scroll}px`;
            }
        };

        trigger.forEach((item) =>
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
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
            if (e.target === modal) {
                hideAllModal();
                hideModal();
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            let display;

            document.querySelectorAll('[data-modal]').forEach((item) => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });
            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
                const gift = document.querySelector('.fixed-gift');
                if (gift) {
                    gift.style.right = `${+getComputedStyle(gift).right.slice(0, -2) + scroll}px`;
                }
            }
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

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight // document.body.scrollHeight - для поддержки старых браузеров
            );
            if (
                !btnPressed &&
                window.scrollY + document.documentElement.clientHeight >= scrollHeight // document.documentElement.scrollHeight вместо scrollHeight если не нужна поддержка старых браузеров
            ) {
                document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift ', '.popup-gift', '.popup-gift .popup-close', true);
    showModalByTime('.popup-consultation', 6000);
    openByScroll('.fixed-gift');
};

export default modals;
