const images = () => {
    const imgPopup = document.createElement('div'),
        workSection = document.querySelector('.works'),
        bigImage = document.createElement('img'),
        scroll = calcScroll();

    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.width = '100vw';
    imgPopup.style.height = '100vh';
    imgPopup.style.padding = '20px';
    imgPopup.style.display = 'none';
    bigImage.style.objectFit = 'contain';
    bigImage.style.height = '100%';
    bigImage.style.marginBottom = '0';

    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;
        console.log(e);

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            document.body.style.marginRight = `${scroll}px`;
            document.body.style.overflow = 'hidden';
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
        }

        if (target && target.matches('div.popup')) {
            imgPopup.style.display = 'none';
            document.body.style.marginRight = '0px';
            document.body.style.overflow = '';
        }
    });

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
};

export default images;
