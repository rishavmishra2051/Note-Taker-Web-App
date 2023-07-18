//controller deals with I/O + Event + Talk to service
import {noteOperations} from '../services/note-service.js';
window.addEventListener('load',init);

function init(){
    showCounts();
    bindEvent();
    //disableButton();
    disableButton1();
}

const enableButton=()=>document.querySelector('#delete').disabled=false;
const enableButton1=()=>document.querySelector('#update').disabled=false;
const disableButton=()=>document.querySelector('#delete').disabled=true;
const disableButton1=()=>document.querySelector('#update').disabled=true;


function bindEvent(){
    document.querySelector('#add').addEventListener('click',addNote);
    document.querySelector('#delete').addEventListener('click',deleteMarked);
    document.querySelector('#search').addEventListener('click',searchNote);
    document.querySelector('#deleteall').addEventListener('click',deleteAll);
    document.querySelector('#sort').addEventListener('click',sortNote);
    document.querySelector('#clear').addEventListener('click',clearNote);
    document.querySelector('#update').addEventListener('click',updateNote);
    
}
function showCounts(){
    noteOperations.marktotal()>0?enableButton():disableButton();
    document.querySelector('#total').innerText=noteOperations.total();
    document.querySelector('#marktotal').innerText=noteOperations.marktotal();
    document.querySelector('#unmarktotal').innerText=noteOperations.unmarktotal();
}

const counterID=(function (){
    var counter=1000;
    function count(){
        counter++;
        return counter;
    }
    return count;
})();

function addNote(){
    //Read id, title, description, date of completion, importance
    //Use DOM
    //const id=document.querySelector('#id').value;
    //const title=document.querySelector('#title').value;

    document.querySelector('#id').value=counterID();
    const fields=['id','title','desc','cdate','importance'];
    const noteObject={};//object literal
    for(let field of fields){
        noteObject[field]=document.querySelector(`#${field}`).value.trim();
    }
    noteOperations.add(noteObject);
    printNote(noteObject);
    showCounts();
}

function deleteMarked(){
    noteOperations.remove();
    printNotes(noteOperations.getNotes());
}

function updateNote(){
    addNote();
    printNotes(noteOperations.getNotes());
}

function searchNote(){    
    const key=document.querySelector('#searchkey').value;
    noteOperations.searchById(key);
    printNote1(noteOperations.searchById(key));
    //printNotes(noteOperations.getsearchNotes());
}

function printNote1(){
    const tbody=document.querySelector("#searchnotes");
    tbody.innerHTML='';
    printNote(searchnotes);
    showCounts;
}

function deleteAll(){
    noteOperations.delall();
    printNotes(noteOperations.getNotes());
}

function sortNote(){
    noteOperations.sort(); 
    printNotes(noteOperations.getNotes());
}

function clearNote(){
    const fields=['id','title','desc','cdate','importance'];
    for(let field of fields){
        document.querySelector(`#${field}`).value='';
    }
}

function printIcon(myClassName='trash',fn,id){
    //<i class="fa-solid fa-trash"></i>
    //<i class="fa-solid fa-user-pen"></i>
    const iTag=document.createElement('i');
    iTag.setAttribute('note-id',id);
    iTag.className=`fa-solid fa-${myClassName} me-3 hand`;
    iTag.addEventListener('click',fn)
    return iTag;
}

function toggleMark(){
    const icon=this;
    const id=this.getAttribute('note-id');
    noteOperations.toggleMark(id);
    const tr=icon.parentNode.parentNode;
    //tr.className='table-danger';
    tr.classList.toggle('table-danger');
    showCounts();

}

function editIcon(){
    const id=this.getAttribute('note-id');
    const noteObject=noteOperations.searchById(id);
    const fields=['id','title','desc','cdate','importance'];
    for(let field of fields){
        document.querySelector(`#${field}`).value=noteObject[field];
    }
    enableButton1();
    noteOperations.update(id);
}

function printNotes(notes){
    const tbody=document.querySelector('#notes');
    tbody.innerHTML='';
    notes.forEach(note=>printNote(note));
    showCounts();
}

function printNote(noteObject){
    const tbody=document.querySelector('#notes');
    const row=tbody.insertRow();//<tr>
    for(let key in noteObject){
        if(key=='isMarked'){
            continue;
        }
        if(key=='isUpdate'){
            continue;
        }
        const td=row.insertCell();//<td>
        td.innerText=noteObject[key];
    }
    const td=row.insertCell();
    td.appendChild(printIcon('user-pen',editIcon,noteObject.id));
    td.appendChild(printIcon('trash',toggleMark,noteObject.id));
    
    
}

