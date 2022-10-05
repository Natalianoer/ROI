const forms = document.querySelectorAll('form');//еси вдруг будте несколько форм

const message = {
    loading: "Загрузка",
    succes: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так ..."
};

forms.forEach((item) => {
    postData(item);
});


function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        document.querySelector(".forms").append(statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');

        // request.setRequestHeader('Content-type', 'multipart/form-data');
        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        // JSON вывод
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });

        const json = JSON.stringify(object);

        // request.send(formData);
        request.send(json);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                statusMessage.textContent = message.succes;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                statusMessage.textContent = message.failure;
            }
        });
    });
}
