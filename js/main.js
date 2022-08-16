let elUsersWrapper = document.querySelector(".users__list")
let elPostsWrapper = document.querySelector(".posts__list")
let elCommentsWrapper = document.querySelector(".comments__list")
let elTempUsers = document.querySelector("#users__template").content
let elTempPosts = document.querySelector("#post__template").content
let elTempComments = document.querySelector("#comment__template").content

function renderUsers(array) {
    elUsersWrapper.innerHTML = null;
    
    let newFragment = document.createDocumentFragment();
    
    for (const item of array) {
        let newLi = elTempUsers.cloneNode(true);
        
        newLi.querySelector(".user__link").textContent = item.name;
        newLi.querySelector(".user__link").dataset.userId = item.id;
        
        newFragment.appendChild(newLi);
    }
    
    elUsersWrapper.appendChild(newFragment);
}

function renderPosts(array) {
    elPostsWrapper.innerHTML = null;
    let fragment = document.createDocumentFragment();
    
    for (const item of array) {
        let newLi = elTempPosts.cloneNode(true);
        
        newLi.querySelector(".post__id").textContent = item.id;
        newLi.querySelector(".post__link").dataset.postId = item.id;
        newLi.querySelector(".post__link").textContent = item.title;
        newLi.querySelector(".post__body").textContent = item.body;
        
        fragment.appendChild(newLi)
    }
    
    elPostsWrapper.appendChild(fragment)
}

function renderComments(array) {
    elCommentsWrapper.innerHTML = null;
    let fragment = document.createDocumentFragment();
    for (const item of array) {
        let newLi = elTempComments.cloneNode(true);

        newLi.querySelector(".span__email").textContent = item.email;
        newLi.querySelector(".span__comment").textContent = item.body;

        fragment.appendChild(newLi)
    }

    elCommentsWrapper.appendChild(fragment)
}

fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json())
.then(data => renderUsers(data))

elUsersWrapper.addEventListener("click", function (evt) {
    let datasetId = evt.target.dataset.userId
    
    if (datasetId) {
        fetch(`https://jsonplaceholder.typicode.com/users/${datasetId}/posts`)
        .then(res => res.json())
        .then(data => renderPosts(data))
    }
})

elPostsWrapper.addEventListener("click", function (evt) {
    let datasetId = evt.target.dataset.postId
    
    if (datasetId) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${datasetId}/comments`)
        .then(res => res.json())
        .then(data => renderComments(data))
    }
})