import {Component, Output, EventEmitter} from "angular2/core";
import {Album} from "../entity/Album";
import {AlbumService} from "./album.service";
@Component({
    selector:"add-album",
    templateUrl:'./app/album/album-add.component.html'
})
export class AlbumAddComponent{
    album:Album;
    @Output()
    close:EventEmitter<string>=new EventEmitter();
    success:string;
    constructor(private _albumService:AlbumService){
        this.album=new Album();
    }

    add():void{
        if(this.album.name!==undefined){
            this._albumService.add(this.album).subscribe(data =>{
                this.success='ok';
                this.album=new Album();
                this.fireClose(this.success);
            }, error => {this.success='error';});
        }
    }

    fireClose(success:string):void{
        this.close.emit(success);
    }
}