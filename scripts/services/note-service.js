//CRUD
import Note from '../model/note.js';
export const noteOperations={
    notes:[],searchnotes:[],
    add(noteObject){
        const note=new Note(noteObject);
        this.notes.push(note);
    },
    searchById(id){
        return this.notes.find(note=>note.id==id);
    },
    toggleMark(id){
        this.searchById(id).toggleMark();

        //const noteObject=this.searchById(id);
        //noteObject.isMarked=!noteObject.isMarked;
    }
    ,
    total(){
        return this.notes.length;
    },
    marktotal(){
        return this.notes.filter(note=>note.isMarked==true).length;
    },
    unmarktotal(){
        return this.total()-this.marktotal();
    },
    getNotes(){
        return this.notes;
    },
    update(id){
        //const key=this.notes.find(note=>note.id==id);
        this.notes=this.notes.filter(note=>note.id!=id);
    },
    remove(){
        this.notes=this.notes.filter(note=>(!note.isMarked));
    },
    search(key){
        this.searchnotes=this.notes.find(note=>note.id==key);
        //this.notes.find(note=>(note.id==key)?this.searchnotes.push(note):this.searchnotes.push(null));
    },
    getsearchNotes(){
        return this.searchnotes;
    },
    sort(){
        this.notes=this.notes.sort((a,b)=>b.id-a.id);
    },
    
    delall(){
        this.notes=this.notes.filter(note=>note!=note);
    }
}