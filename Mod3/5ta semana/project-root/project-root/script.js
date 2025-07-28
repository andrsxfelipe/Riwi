const JSON_EVENTS = "http://localhost:3000/events";
const JSON_USERS = "http://localhost:3000/users";

// CRUD -----------------------------------------------------------------------------

function postMethod(newEvent) {
    fetch(JSON_EVENTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
    })
        .then(response => response.json())
        .catch(error => alert("Error: ", error))
}

function userPostMethod(newUser) {
    fetch(JSON_USERS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    })
        .then(response => response.json())
        .catch(error => alert("Error: ", error))
}


function deleteMethod(eventId) {
    fetch(`${JSON_EVENTS}/${eventId}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                alert("Couldn't find any event with that ID");
                throw new Error("ID no encontrado");
            }
        })
        .catch(error => console.error('Error deleting the event ', error))
}

function putMethod(newEventInfo, eventId) {
    fetch(`${JSON_EVENTS}/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEventInfo)
    })
        .then(response => {
            if (!response.ok) {
                alert("Couldn't find any event with that ID");
                throw new Error("ID not found");
            }
            return response.json();
        })
        .catch(error => alert("Error: ", error))
}

async function newEnroll(eventId) {
    userId = JSON.parse(localStorage.getItem('Auth')).id;
    let info;
    try {
        const response = await fetch(`${JSON_USERS}/${userId}`);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        info = data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return;
    }

    if (info.events.includes(eventId)) {
        alert("You are already enrolled in this event");
        return
    } else {

        info.events.push(eventId);
        fetch(`${JSON_USERS}/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info)
        })
            .then(response => {
                if (!response.ok) {
                    alert("An error occurred while updating the user");
                    throw new Error("ID not found");
                }
                return response.json();
            })
            .catch(error => alert("Error: ", error))
    }

    try {
        const response = await fetch(`${JSON_EVENTS}/${eventId}`);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        eventData = data;
    }
    catch (error) {
        lateralBar = `<h2>Not Found</h2>
            ${error}`;
    }

    eventData.capacity -= 1;
    putMethod(eventData, eventId);

}

async function lateralBarContent(role) {
    let lateralBar;
    userRole = JSON.parse(localStorage.getItem('Auth')).role;
    userName = JSON.parse(localStorage.getItem('Auth')).name;
    if (role == "admin") {
        try {
            const response = await fetch("./dashboard/admin_lateralbar.html");
            if (!response.ok) {
                throw new Error(response.status);
            }
            const data = await response.text();
            lateralBar = data;
        }
        catch (error) {
            lateralBar = `<h2>Not Found</h2>
            ${error}`;
        }

    }
    else if (role == "user") {
        try {
            const response = await fetch("./dashboard/user_lateralbar.html");
            if (!response.ok) {
                throw new Error(response.status);
            }
            const data = await response.text();
            lateralBar = data;
        }
        catch (error) {
            lateralBar = `<h2>Not Found</h2>
            ${error}`;
        }
    }
    document.getElementById("lateralbar").innerHTML = lateralBar;
    document.querySelector(".user-name").innerHTML = userName;
    document.querySelector(".user-role").innerHTML = userRole;
}

async function bringUserInfo() {
    userId = JSON.parse(localStorage.getItem('Auth')).id;
    let userInfo;
    try {
        const response = await fetch(`${JSON_USERS}/${userId}`);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        userInfo = data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        userInfo = {};
    }
    return userInfo;
}

async function bringContent(url) {
    let content;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status)
        }
        const data = await response.text()
        content = data
    }
    catch (error) {
        content = `<h2>Not Found</h2>
        ${error}`
    }
    document.getElementById("content").innerHTML = content;
}

async function bringData(inputEmail, inputPass) {
    let userData;
    try {
        const response = await fetch(JSON_USERS);
        if (!response.ok) {
            throw new Error(response.status)
        }
        const data = await response.json();
        userData = data.find(email => email.email == inputEmail)
        if (!userData || inputPass != userData.password) {
            throw new Error("Usuario no encontrado")
        }
        return (userData)
    } catch (error) {
        alert("There was an error");
        return (false)
    }
}

async function getEvents() {
    let eventsData;
    userRole = JSON.parse(localStorage.getItem('Auth')).role;
    try {
        const response = await fetch(JSON_EVENTS);
        if (!response.ok) {
            throw new Error(response.status)
        }
        const data = await response.json();
        eventsData = data;
    } catch (error) {
        alert("Error fetching events:", error);
        eventsData = [];
    }
    if (userRole == "admin") {
        await bringContent("./dashboard/events.html");
        document.querySelector(".addnewevent").innerHTML += "<button id='btn_AddEvent'>ADD NEW EVENT</button>";
        eventsData.forEach(dato => {
            document.querySelector(".events-list").innerHTML += `
            <tr>
                <td><i class="fa-solid fa-user"></i><span style="display:none">${dato.id}<span></td>
                <td>${dato.title}</td>
                <td>${dato.description}</td>
                <td>${dato.capacity}</td>
                <td>${dato.date}</td>
                <td>
                    <i class="fa-solid fa-pen" id="editEvent"></i>
                    <i class="fa-solid fa-eraser" id="deleteEvent"></i>
                </td>
            </tr>`
        })
    } else if (userRole == "user") {
        await bringContent("./dashboard/events.html");
        eventsData.forEach(dato => {
            document.querySelector(".events-list").innerHTML += `
            <tr>
                <td><i class="fa-solid fa-user"></i><span style="display:none">${dato.id}<span></td>
                <td>${dato.title}</td>
                <td>${dato.description}</td>
                <td>${dato.capacity}</td>
                <td>${dato.date}</td>
                <td>
                ${dato.capacity > 0 ? `<button id="enroll" class="events-enroll">enroll</button>` : `<button class="events-soldout">sold out</button>`}
                </td>
            </tr>`
        })
    }
}

async function getEnrolls() {
    userEvents = await bringUserInfo().then(data => data.events);
    let enrollsData;
    try {
        const response = await fetch(JSON_EVENTS);
        if (!response.ok) {
            throw new Error(response.status)
        }
        const data = await response.json();
        enrollsData = data.filter(event => userEvents.includes(event.id));
    } catch (error) {
        alert("Error fetching enrolls:", error);
        enrollsData = [];
    }
    await bringContent("./dashboard/enrolls.html");
    enrollsData.forEach(dato => {
        document.querySelector(".events-list").innerHTML += `
        <tr>
            <td><i class="fa-solid fa-user"></i></td>
            <td>${dato.title}</td>
            <td>${dato.description}</td>
            <td>${dato.date}</td>
        </tr>`
    })
}

async function singIn() {
    document.getElementById("signin-form").addEventListener("submit", async function (event) {
        event.preventDefault();
        const inputEmail = this.querySelector("#login-email").value;
        const inputPass = this.querySelector("#login-password").value;
        userInfo = await bringData(inputEmail, inputPass);
        if (!userInfo) {
            document.querySelector(".invalid_credentials").innerHTML = "Incorrect credentials, please try again.";
            setTimeout(() => {
                document.querySelector(".invalid_credentials").innerHTML = ""
            }, 2500)
            return
        }
        localStorage.setItem('Auth', JSON.stringify(userInfo))
        if (userInfo.role == "admin") {
            await lateralBarContent("admin")
            await bringContent("./dashboard/home.html");function logout() {

}
            adminSignedIn();
        }
        else if (userInfo.role == "user") {
            await lateralBarContent("user")
            await bringContent("./dashboard/home.html");
            userSignedIn();
        }
    })
    document.getElementById("register").addEventListener("click", async function (event) {
        event.preventDefault();
        await bringContent("./dashboard/register.html");
        document.getElementById("signup-form").addEventListener("submit", async function (event) {
            event.preventDefault();
            let name = this.querySelector("#register-name").value;
            let email = this.querySelector("#register-email").value;
            let password = this.querySelector("#register-password").value;
            let confirmPassword = this.querySelector("#register-confirmPassword").value;
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            let newUser = {
                name: name,
                email: email,
                password: password,
                role: "user",
                events: []
            }
            await userPostMethod(newUser);
            document.querySelector(".registered").innerHTML = "User registered successfully!";
            setTimeout(() => {
                main();
            }, 2500)
        })
    })


}

async function editEvent(eventId) {
    await bringContent("./dashboard/events/edit.html");
    try {
        const response = await fetch(`${JSON_EVENTS}/${eventId}`);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const eventData = await response.json();
        document.getElementById("edit-name").value = eventData.title;
        document.getElementById("edit-description").value = eventData.description;
        document.getElementById("edit-date").value = eventData.date;
        document.getElementById("edit-capacity").value = eventData.capacity;
    } catch (error) {
        console.error("Error fetching event data:", error);
        return;
    }
    document.getElementById("edit-cancel").addEventListener("click", function (event) {
        event.preventDefault();
        main();
    })
    document.getElementById("edit-save").addEventListener("click", async function (event) {
        event.preventDefault();
        const title = document.getElementById("edit-name").value;
        const description = document.getElementById("edit-description").value;
        const date = document.getElementById("edit-date").value;
        const capacity = document.getElementById("edit-capacity").value;
        newEventInfo = {
            title: title,
            description: description,
            date: date,
            capacity: capacity
        }
        putMethod(newEventInfo, eventId);
    })
}

async function adminSignedIn() {
    document.getElementById("bar-navigation").addEventListener("click", async function (event) {
        event.preventDefault();
        if (event.target.getAttribute("href") === "events") {
            await getEvents();
            document.getElementById("btn_AddEvent").addEventListener("click", async function (event) {
                await bringContent("./dashboard/events/create.html");
                createEvent();
            })
            document.querySelector(".events-list").addEventListener("click", async function (event) {
                event.preventDefault();
                if (event.target.getAttribute("id") === "deleteEvent") {
                    let eventId = event.target.parentparentElement.Element.children[0].children[1].textContent;
                    deleteMethod(eventId);
                }
                if (event.target.getAttribute("id") === "editEvent") {
                    let eventId = event.target.parentElement.parentElement.children[0].children[1].textContent;
                    await editEvent(eventId);
                }
            })
        }

    })
    document.getElementById("logout").addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.clear();
        document.getElementById("lateralbar").innerHTML = "";
        document.getElementById("content").innerHTML = "";
        main();
    })

}

function createEvent() {
    document.getElementById("create-cancel").addEventListener("click", function (event) {
        event.preventDefault();
        main();
    })
    document.getElementById("create-save").addEventListener("click", async function (event) {
        event.preventDefault();
        const title = document.getElementById("create-name").value;
        const description = document.getElementById("create-description").value;
        const date = document.getElementById("create-date").value;
        const capacity = document.getElementById("create-capacity").value;
        newEvent = {
            title: title,
            description: description,
            date: date,
            capacity: capacity
        }
        postMethod(newEvent);
    })
}

async function userSignedIn() {
    document.getElementById("bar-navigation").addEventListener("click", async function (event) {
        event.preventDefault();
        if (event.target.getAttribute("href") === "events") {
            await getEvents();
            document.querySelector(".events-list").addEventListener("click", function (event) {
                if (event.target.getAttribute("id") === "enroll") {
                    let eventId = event.target.parentElement.parentElement.children[0].children[1].textContent;
                    newEnroll(eventId);
                }
            })
        }
        else if (event.target.getAttribute("href") === "enrrolls") {
            await getEnrolls();
        }
    })

    document.getElementById("logout").addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.clear();
        document.getElementById("lateralbar").innerHTML = "";
        document.getElementById("content").innerHTML = "";
        main();
    })
}

async function main() {
    if (!localStorage.getItem('Auth')) {
        await bringContent("./dashboard/login.html");
        singIn()
    }
    else {
        userInfo = JSON.parse(localStorage.getItem('Auth'));
        if (userInfo.role == "admin") {
            await lateralBarContent("admin")
            await bringContent("./dashboard/home.html");
            adminSignedIn();
        }
        else if (userInfo.role == "user") {
            await lateralBarContent("user")
            await bringContent("./dashboard/home.html");
            userSignedIn();
        }
    }
}

main()