window.onload = loaded;

/**
 * Simple Function that will be run when the browser is finished loading.
 */
function loaded() {
    // Assign to a variable so we can set a breakpoint in the debugger!
    const hello = sayHello();
    console.log(hello);
}

/**
 * This function returns the string 'hello'
 * @return {string} the string hello
 */
function sayHello() {
    return 'hello';
}

/* Handler for adding an item */
document.getElementById("add-item").addEventListener("submit", function(event) {
    event.preventDefault();

    const id = parseInt(document.getElementById("id").value);
    const name = document.getElementById("name").value;
    const price = parseInt(document.getElementById("price").value);

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://w450sz6yzd.execute-api.us-east-2.amazonaws.com/items");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        "id": `${id}`,
        "price": `${price}`,
        "name": `${name}`
    }));
});

/* Handler for retrieving data from the server */
document.getElementById("load-items").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        updateTable(JSON.parse(xhr.response));
    });
    xhr.open("GET", "https://w450sz6yzd.execute-api.us-east-2.amazonaws.com/items");
    xhr.send();
});

/**
 * Updates the inventory table with json data.
 * @param {JSON} data 
 */
function updateTable(data) {
    const table = document.getElementById("inventory");
    const body = table.getElementsByTagName("tbody")[0];

    body.innerHTML = "";

    data.forEach(element => {
        const row = body.insertRow();
        const col1 = row.insertCell(0);
        const col2 = row.insertCell(1);
        const col3 = row.insertCell(2);
        const col4 = row.insertCell(3);

        col1.textContent = element.id;
        col2.textContent = element.name;
        col3.textContent = element.price;

        const del = document.createElement("button");
        del.textContent = "Delete";
        del.id = "delete-data";

        del.addEventListener("click", function() {
            const row = del.closest("tr");
            const id = row.cells[0].textContent;
            let xhr = new XMLHttpRequest();
            xhr.open("DELETE", `https://w450sz6yzd.execute-api.us-east-2.amazonaws.com/items/${id}`);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
            row.remove();
        });

        col4.appendChild(del);
    });
}