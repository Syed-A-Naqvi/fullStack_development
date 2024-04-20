function add_row(id){

    // Get the tbody element
    const tbody = document.getElementById(id).getElementsByTagName('tbody')[0];

    // Create a new row element
    const newRow = document.createElement('tr');

    // Generate a unique key using a timestamp
    const uniqueKey = Date.now();

    // constructing the new row
    newRow.setAttribute('key', `${uniqueKey}`);
    newRow.innerHTML = "<td><input placeholder=\"name\"/></td>"
                     + "<td><input placeholder=\"weight\"/></td>"
                     + "<td><input placeholder=\"grade\"/></td>"
                     + `<td><button onClick=\"remove_row(${uniqueKey})\">remove</button></td>`
    // Append the new row element to the tbody
    tbody.appendChild(newRow);

}

function remove_row(value){

    //tbody reference
    const tbody = document.querySelector(`tr[key="${value}"]`).parentElement;

    //incase row is not the last row remove row
    tbody.removeChild(tbody.querySelector(`tr[key="${value}"]`));

}

function clear_table(id){

    const tbody = document.getElementById(`${id}`).getElementsByTagName('tbody')[0];

    tbody.innerHTML="";

}



