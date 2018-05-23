const list = document.querySelector('.content-list');
let blockInfo = document.querySelector('.information');
let dataArray = [];
const xhr = new XMLHttpRequest();

xhr.open('GET', 'clients.json');

xhr.send();

xhr.addEventListener('readystatechange', () => {
    console.log(xhr.readyState); // 2 3 4 с ответом от сервера

    if (xhr.readyState === 4) { // состояние готовности, запрос выполнен, данные пришли
        if (xhr.status === 200) {

            dataArray = JSON.parse(xhr.response);

            dataArray.forEach(function(item) {
                let li = list.appendChild(document.createElement('li'));
                li.classList.add('content-list__item');

                let avatar = document.createElement('img');
                avatar.setAttribute('src', item.general.avatar);

                const divAvatar = document.createElement('div');
                divAvatar.classList.add('avatar');
                divAvatar.innerHTML = "<img src=\"" + avatar.getAttribute("src") + "\">";

                const divName = document.createElement('div');
                divName.classList.add('name');
                divName.innerHTML = item.general.firstName + ' ' + item.general.lastName;

                const divTitle = document.createElement('div');
                divTitle.classList.add('title');
                divTitle.innerHTML = item.job.title;

                const divCompany = document.createElement('div');
                divCompany.classList.add('company');
                divCompany.innerHTML = item.job.company;


                li.appendChild(divAvatar);
                li.appendChild(divName);
                li.appendChild(divTitle);
                li.appendChild(divCompany);
            });
            blockInfo.innerHTML = '';
            handleEvents();

        } else {
            throw Error (xhr.status + ' ' + xhr.responseText);
        }

    }
});

function handleEvents() {
    const listItems = document.querySelectorAll('.content-list__item');
    dataArray = JSON.parse(xhr.response, (key, value) => {
        if (key === 'firstName') {
            return value;
        }
    });

    for (let i = 0; i < listItems.length; i++) {
        let listItem = listItems[i];
        listItem.querySelector('.name').addEventListener('click', function() {
            // let copyInfo = listItem.cloneNode(this);
            // blockInfo.append(copyInfo);


        });
    }
}