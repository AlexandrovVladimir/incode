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
            const inputSearch = document.querySelector('.content__input');

            //search
            inputSearch.addEventListener('keypress', (event) => {
                if (event.keyCode === 13) {
                    list.innerHTML = '';
                    let inputCount = inputSearch.value.length;
                    dataArray = JSON.parse(xhr.response);
                    for (let i = 0; i < dataArray.length; i++) {
                        let item = dataArray[i];

                        if ((inputSearch.value === item.general.lastName.substring(0, inputCount)) || (inputSearch.value === item.general.firstName.substring(0, inputCount)) || (inputSearch.value === '')) {
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

                            clientInfo();
                        }
                    }
                }
            });
            //search

            //json

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

                const divEtcInfo = document.createElement('div');
                divEtcInfo.classList.add('content-list__information');

                const divContact = document.createElement('div');
                divContact.classList.add('contact');
                divContact.innerHTML = item.contact.email + '<br/>' + item.contact.phone;
                divEtcInfo.append(divContact);

                const divAddress = document.createElement('div');
                divAddress.classList.add('address');
                divAddress.innerHTML = item.address.street + '<br/>' + item.address.city + '<br/>' + item.address.zipCode + '<br/>' + item.address.country;
                divEtcInfo.append(divAddress);

                li.appendChild(divAvatar);
                li.appendChild(divName);
                li.appendChild(divTitle);
                li.appendChild(divCompany);
                li.appendChild(divEtcInfo);

            });
            clientInfo();

            //json

        } else {
            throw Error (xhr.status + ' ' + xhr.responseText);
        }
    }
});

function clientInfo() {
    // dataArray = JSON.parse(xhr.response, (key, value) => {
    //     if (key === 'firstName') {
    //         return value;
    //     }
    // });

    const listItems = document.querySelectorAll('.content-list__item');
    for (let i = 0; i < listItems.length; i++) {
        let listItem = listItems[i];


        listItem.querySelector('.name').addEventListener('click', () => {
            let copyInfo = listItem.cloneNode(listItem);

            blockInfo.innerHTML = '';
            blockInfo.append(copyInfo);
        });
    }
}