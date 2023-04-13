import $ from '../core';

$.prototype.addAttr = function (attributeName, attributeValue) {
    if (!attributeName) {
        return this;
    }

    for (let i = 0; i < this.length; i++) {
        if (!this[i].hasAttribute(attributeName)) {
            if (attributeValue !== undefined) {
                this[i].setAttribute(attributeName, attributeValue);
            } else {
                this[i].setAttribute(attributeName, '');
            }
        }
    }
    return this;
};

$.prototype.setAttr = function (attributeName, attributeValue) {
    if (!attributeName) {
        return this;
    }

    for (let i = 0; i < this.length; i++) {
        if (this[i].hasAttribute(attributeName)) {
            if (attributeValue !== undefined) {
                this[i].setAttribute(attributeName, attributeValue);
            } else {
                this[i].setAttribute(attributeName, '');
            }
        }
    }
    return this;
};

$.prototype.removeAttr = function (attributeName) {
    if (!attributeName) {
        return this;
    }

    for (let i = 0; i < this.length; i++) {
        if (this[i].hasAttribute(attributeName)) {
            this[i].removeAttribute(attributeName);
        }
    }
    return this;
};

$.prototype.toggleAttr = function (attributeName) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].hasAttribute(attributeName)) {
            this[i].removeAttribute(attributeName);
        } else {
            this[i].setAttribute(attributeName, '');
        }
    }
    return this;
};
