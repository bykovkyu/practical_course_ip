const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach((input) => {
        // input.addEventListener('keypress', (e) => {
        //     if (e.key.match(/[^а-яё 0-9]/gi)) {
        //         e.preventDefault();
        //     }
        // });
        input.addEventListener('input', (e) => {
            input.value = input.value.replace(/[^а-яё 0-9]/gi, '');
        });
    });
};

export default checkTextInputs;
