import $ from '../core';

$.prototype.addClass = function (...classNames) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].classList) {
            this[i].classList.add(...classNames);
        }
    }
    return this.init;
};

$.prototype.removeClass = function (...classNames) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].classList) {
            this[i].classList.remove(...classNames);
        }
    }
    return this;
};

$.prototype.toggleClass = function (className) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].classList) {
            this[i].classList.toggle(className);
        }
    }
    return this;
};