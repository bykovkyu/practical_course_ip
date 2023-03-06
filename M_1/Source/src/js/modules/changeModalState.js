import checkNumInputs from './checkNumInputs';
import fieldValidation from './fieldValidation';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    const bindActionToElems = (event, elem, prop) => {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case 'SPAN':
                        state[prop] = item.firstElementChild.alt;
                        fieldValidation(state, 'form');
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            state[prop] = item.nextElementSibling.id;
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                            fieldValidation(state, 'profile');
                        } else {
                            state[prop] = item.value;
                            fieldValidation(state, 'form');
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        fieldValidation(state, 'profile');
                        break;
                }
                console.log(prop);
                console.log(state);
            });
        });
    };

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;
