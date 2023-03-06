const fieldValidation = (state, selector) => {
    const calcFormBtn = document.querySelector('.popup_calc_button'),
        calcProfileBtn = document.querySelector('.popup_calc_profile_button');

    switch (selector) {
        case 'form':
            if (!(state.width && state.height && state.form)) {
                calcFormBtn.disabled = true;
                calcFormBtn.style.filter = 'grayscale(100%)';
            } else {
                calcFormBtn.disabled = false;
                calcFormBtn.style.filter = '';
            }
            break;
        case 'profile':
            if (!(state.type && state.profile)) {
                calcProfileBtn.disabled = true;
                calcProfileBtn.style.filter = 'grayscale(100%)';
            } else {
                calcProfileBtn.disabled = false;
                calcProfileBtn.style.filter = '';
            }
            break;
    }
};

export default fieldValidation;
