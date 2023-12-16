
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function() {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name : name})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {

}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = `<tr>
                             <td class='no-data' colspan='5'>No Data</td>
                           </tr>`;
    } else {
        table.innerHTML = "";
        data.forEach(row => {
            const rowData = `<tr>
                              <td>${row.id}</td>
                              <td>${row.name}</td>
                              <td>${formatDate(row.data_added)}</td>
                              <td><button class='delete-row-btn'>Delete</button></td>
                              <td><button class='edit-row-btn'>Edit</button></td>
                            </tr>`;
            table.insertAdjacentHTML('beforeend', rowData);
        });
    }
}


function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}