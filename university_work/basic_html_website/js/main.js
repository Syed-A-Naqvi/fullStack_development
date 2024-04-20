/**
 * this function retrieves data from the `<input>` tags on the page,
 * transforms the values into a `<tr>` element and appends the `<tr>` to
 * the `<tbody>` element of the `<table>`
 */
function add_record() {

    // this is an example on how to get the value of an `<input>` tag
    //   you do not have to use this layout

    // TO DO ...

    let name_value = document.getElementById("name").value;
    let id_value = document.getElementById("id").value;
    let gpa_value = document.getElementById("gpa").value;

    if(!(name_value == "") && !(id_value=="") && !(gpa_value=="")){
        
        name_value = "<td>" + name_value + "</td>";
        id_value = "<td>" + id_value + "</td>";
        gpa_value = "<td>" + gpa_value + "</td>";

        let newRow = "<tr>" + name_value + id_value + gpa_value + "</tr>";

        document.getElementById("chart").getElementsByTagName("tbody")[0].innerHTML += newRow;
    }

    document.getElementById("name").value = null;
    document.getElementById("id").value = null;
    document.getElementById("gpa").value = null;


    return false;




}
