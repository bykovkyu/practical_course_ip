import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(value) {
        super(value);
        this.slideCount = [...this.slides].filter((child) => {
            return child.tagName !== 'BUTTON';
        }).length;
    }

    decorizeSlides() {
        [...this.slides].forEach((slide) => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        this.slides[0].classList.add(this.activeClass);

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        this.slides[this.slideCount - 1].insertAdjacentElement('afterend', this.slides[0]);
        this.decorizeSlides();
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            this.container.insertBefore(this.slides[this.slideCount - 1], this.slides[0]);
            this.decorizeSlides();
        });

        if (this.autoplay) {
            [this.container, this.next, this.prev].forEach((item) => {
                item.addEventListener('mouseenter', () => {
                    this.suspended = true;
                });
            });

            [this.container, this.next, this.prev].forEach((item) => {
                item.addEventListener('mouseleave', () => {
                    this.suspended = false;
                });
            });
        }
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        if (this.autoplay) {
            setInterval(() => {
                if (!this.suspended) this.nextSlide();
            }, 5000);
        }

        this.bindTriggers();
        this.decorizeSlides();
    }
}
