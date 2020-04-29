console.log("Note app");
showNotes();

// Function for add a notes 
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addtext = document.getElementById('addText');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addtext.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtext.value = "";
    console.log(notesObj);
    showNotes();
})

// Function for Display Notes from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    

    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card mx-2 my-2 " style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id=${index} onclick="deleteNotes(this.id)" class="btn btn-primary border-dark" id="dtlBtn">Delete</button>
                </div>
            </div>`;
    });
    let notesElement = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElement.innerHTML = html;
    }
    else {

        notesElement.innerHTML = `Nothing to show! Use "<u>Add a note</u>" section above to add notes`;
    }

}
//Function for delete notes from localstorage
function deleteNotes(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// Function for seach text from notes

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value;
    // console.log('search fired',inputVal);    
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // element.style.autocompleted = "off";
        if (cardTxt.includes(inputVal)){
            element.style.display = "block";
        } 
        else{
            element.style.display = "none";
        }
        
        // console.log(cardTxt);
    })
})