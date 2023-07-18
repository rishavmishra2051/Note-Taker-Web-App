class Note{
    constructor(noteObject){
        for(let key in noteObject){
            this[key]=noteObject[key];
        }
        this.isMarked=false;
        this.isUpdate=false;
    }
    toggleMark(){
        this.isMarked=!this.isMarked;
    }
    updateicon(){
        this.isUpdate=!this.isUpdate;
    }
}
export default Note;