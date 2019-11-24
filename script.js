let index = 0;
let users = [];
let editIndex = null;

function onFormSubmit() {
    if (editIndex === null) {
        index++;
        var data = readFormData();
        addToList(data);
        users.push(data);
    } else {
        var user = users.find(user => {
            return user.index === editIndex;
        });
        Object.assign(user, readFormData());
        refreshList();
        editIndex = null;
    }

}

function readFormData() {
    var formData = {};
    formData["Name"] = document.getElementById("name").value;
    formData["Surname"] = document.getElementById("surname").value;
    formData["Address"] = document.getElementById("address").value;
    formData["City"] = document.getElementById("city").value;
    formData["Country"] = document.getElementById("country").value;
    formData["Zip"] = document.getElementById("zip").value;

    if (editIndex === null) {
        formData["index"] = index;
    }
    else{
        formData["index"] = editIndex;
    }
    return formData;

}

function addToList(data) {
    var list = document.getElementById("list");
    var newElement = `<tr>
    <td>${data.index}</td>
    <td>${data.Name}</td>
    <td>${data.Surname}</td>
    <td>${data.Address}</td>
    <td>${data.City}</td>
    <td>${data.Country}</td>
    <td>${data.Zip}</td>
    <td><button type="button" onclick="fillForm(${data.index})" class="btn btn-success">Update</button></td>
    <td><button type="button" onclick="deleteForm(${data.index})" class="btn btn-danger">Delete</button></td>
</tr> `;
    list.innerHTML += newElement;
    document.getElementById("form").reset();

}

function fillForm(index) {
    var user = users.find(user => {
        return user.index === index;
    });
    document.getElementById("name").value = user["Name"];
    document.getElementById("surname").value = user["Surname"];
    document.getElementById("address").value = user["Address"];
    document.getElementById("city").value = user["City"];
    document.getElementById("country").value = user["Country"];
    document.getElementById("zip").value = user["Zip"];
    editIndex = user.index;
}

function refreshList() {
    var list = document.getElementById("list");
    list.innerHTML = "";
    users.forEach(user => addToList(user));


}

function deleteForm(userIndex) {
    var index = users.findIndex(user => {
        return user.index === userIndex;

    });
    console.log(index);

    users.splice(index, 1);
    refreshList();
}