console.log("Hello World")

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = "http://localhost:3000/mews";

loadingElement.style.display = 'none';
//console.log(form.name);

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
            console.log(createdMew);
        });

})