let users = [];

function getUserStatusClassName(presence) {
    switch (presence) {
        case 1:
            return 'online';
        case 2:
            return 'busy';
        case 3:
            return 'idle';
        default:
            return 'not-logged-in';
    }
}

function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach((user) => {
        const li = document.createElement('li');

        const userMainDiv = document.createElement('div');
        userMainDiv.classList.add('user-main-container');

        const userContainerDiv = document.createElement('div');
        userContainerDiv.classList.add('user-container');

        const img = document.createElement('img');
        const statusClassName = getUserStatusClassName(user.presence);
        const icon = document.createElement('span');
        const moreVertIcon = document.createTextNode('more_vert');
        img.src = user.profilepicture;
        img.alt = `Profile picture of ${user.name}`;
        img.classList.add('profile-picture', statusClassName);

        userContainerDiv.appendChild(img);

        const userDiv = document.createElement('div');
        userDiv.classList.add('user-details');
        userDiv.innerHTML = `<strong>${user.name}</strong><br>${user.statusMessage}`;
        userContainerDiv.appendChild(userDiv);

        userMainDiv.appendChild(userContainerDiv);

        const iconDiv = document.createElement('div');
        iconDiv.classList.add('material-icons', 'more-icon', 'icon-div');
        iconDiv.appendChild(icon);
        icon.appendChild(moreVertIcon);
        icon.textContent = 'more_vert';

        userMainDiv.appendChild(iconDiv);

        li.appendChild(userMainDiv);

        userList.appendChild(li);
    });
}

function addUser(user) {
    users.unshift(user);
    displayUsers();
}

function removeUser(userId) {
    const index = users.findIndex((user) => user.userId === userId);
    if (index !== -1) {
        users.splice(index, 1);
        displayUsers();
    }
}

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

var ul = document.getElementById('userList');

document.addEventListener('DOMContentLoaded', () => {
    displayUsers();
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('/buddylist')
        .then(response => response.json())
        .then(data => {
            users = data;
            localStorage.setItem('buddyList', JSON.stringify(data));
            displayUsers();
        })
        .catch(error => console.error('Error:', error));
});
