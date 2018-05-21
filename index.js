const list = document.querySelector('.main-list');

const xhr = new XMLHttpRequest();

xhr.open('GET', 'clients.json');

xhr.send();

xhr.addEventListener('readystatechange', () => {
    console.log(xhr.readyState); // 2 3 4 с ответом от сервера
    if (xhr.readyState === 4) { // состояние готовности, запрос выполнен, данные пришли
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.response));
            let elements = JSON.parse(xhr.response);
            list.innerHTML = elements;
            // allList(elements);
        } else {
            throw Error (xhr.status + ' ' + xhr.responseText);
        }

    }
});

// function allList(elements) {
//     elements.forEach(function(element) {
//         let li = list.appendChild(document.createElement('li'));
//         li.innerHTML = element.name;
//         console.log(element);
//     });
// }