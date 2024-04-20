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

    if(!(name_value === "") && !(id_value === "") && !(gpa_value === "")){
        
        name_value = "<td>" + name_value + "</td>";
        id_value = "<td>" + id_value + "</td>";
        gpa_value = "<td>" + gpa_value + "</td>";

        let newRow = "<tr>" + name_value + id_value + gpa_value + "</tr>";

        document.getElementById("chart").getElementsByTagName("tbody")[0].innerHTML += newRow;
    }

    document.getElementById("name").value = null;
    document.getElementById("id").value = null;
    document.getElementById("gpa").value = null;

}
document.getElementById('submit').addEventListener('click',add_record);


//--------------------------------------------POST REQUEST TO SERVER--------------------------------------------
function post_to_server(endpoint, contentType) {

    // setting the url
    const url = "http://localhost:8080/lab6-1.0/api/format/" + endpoint;

    // getting the payload
    const payload = document.getElementById("chart").innerHTML;

    /// creating a response to the server
    const request = new XMLHttpRequest();
    request.open("POST", url);                              // setting the method
    request.setRequestHeader("Content-Type", "text/html");  // setting the sending content-type
    request.setRequestHeader("Accept", contentType);        // setting the receiving content-type

    // on response handler
    request.onload = () => {
        if (request.status !== 200) {
            console.error("Something went wrong when contacting the server");
            return
        }
        console.log("Received from the server: ", request.responseText) // this contains the received payload

        /**
         * this is how to programmatically download something in javascript.
         * 1. create an invisible anchor tag
         * 2. set the href attribute (contains file data)
         * 3. set the download attribute (contains the file name)
         * 4. click it
         */
        let element = document.createElement('a');
        element.setAttribute('href', `data:${contentType};charset=utf-8,` + encodeURIComponent(request.responseText));
        element.setAttribute('download', `students.${endpoint}`);
        element.click();
    }

    // sending the payload to the server
    request.send(payload);
}

let toCSV = document.getElementById('to_csv');
let toXML = document.getElementById('to_xml');
let toJSON = document.getElementById('to_json');

toCSV.addEventListener('click', () => {post_to_server("csv","text/csv")});
toXML.addEventListener('click', () => {post_to_server("xml","application/xml")});
toJSON.addEventListener('click', () => {post_to_server("json","application/json")});


(function () {
    fetch("http://localhost:8080/lab6-1.0/api/students/json").then((x) => {
        x.json().then((y) =>{

            for (const k of y.students) {

                let name_value = "<td>" + k.name + "</td>";
                let id_value = "<td>" + k.id + "</td>";
                let gpa_value = "<td>" + k.gpa + "</td>";

                let newRow = "<tr>" + name_value + id_value + gpa_value + "</tr>";

                document.getElementById("chart").getElementsByTagName("tbody")[0].innerHTML += newRow;
            }
        });
        })
        .catch((err) => {
            console.log("something went wrong: " + err);
        });
})();