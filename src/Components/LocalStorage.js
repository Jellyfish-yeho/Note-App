export function GetNote() {
    return JSON.parse(localStorage.getItem("NoteApp"));
}

export function SetNote(NoteApp){
    return localStorage.setItem("NoteApp", JSON.stringify(NoteApp));
}
