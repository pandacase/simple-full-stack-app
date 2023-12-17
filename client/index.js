
///////////////////////////
////// load the page //////
///////////////////////////
document.addEventListener('DOMContentLoaded', getAll());

function getAll() {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    } else {
        let tableHtml = "";
        data.forEach(function ({id, name, date_added}) {
            tableHtml += '<tr>';
            tableHtml += `<td>${id}</td>`;
            tableHtml += `<td>${name}</td>`;
            tableHtml += `<td>${formatDate(date_added)}</td>`;
            tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
            tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
            tableHtml += '</tr>';
        });
    
        table.innerHTML = tableHtml;
    }

}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}


///////////////////////////
///// Add-name botton /////
///////////////////////////
const addBtn = document.querySelector('#add-name-btn');
addBtn.onclick = function() {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    if (name.length === 0) {
        return;
    }
    nameInput.value = "";

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name : name})
    })
    .then(response => {
        if (!response.ok) {
            console.log(response.status);
        } else {
            getAll();
        }
    })
}


///////////////////////////
///// Row edit/delete /////
///////////////////////////

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === 'delete-row-btn') {
        deleteRowById(event.target.dataset.id);
    } else if (event.target.className === 'edit-row-btn') {

    }
});

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            getAll();
        }
    });
}







