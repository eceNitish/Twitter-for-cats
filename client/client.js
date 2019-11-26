console.log("Hello World")

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const mewsElement = document.querySelector('.mews');
const API_URL = "http://localhost:3000/mews";

loadingElement.style.display = '';
//console.log(form.name);

listAllMews();
loadingElement.style.display = 'none';

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const content = formData.get('content');
    //console.log(name + ", " + content);

    const mew = {
        name,
        content
    };

    console.log(mew);
    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL, {
        method: "POST",
        cache: "no-cache",
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(mew)
    }).then(res => res.json())
        .then(createdMew => {
            //console.log(createdMew);
            loadingElement.style.display = 'none';
            form.reset();
            form.style.display = '';
        });

})

function listAllMews () {
    fetch(API_URL)
        .then(res => res.json())
        .then(mews => {
            console.log(mews);
            mews.forEach(mew => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = mew.name;

                const content = document.createElement('p');
                content.textContent = mew.content;

                div.appendChild(header);
                div.appendChild(content);

                mewsElement.appendChild(div);
            });      
        })
};