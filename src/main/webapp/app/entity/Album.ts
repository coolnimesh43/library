import {Video} from "./Video";
export class Album{
    id:number;
    createdBy:number;
    lastModifiedBy:number;
    createdDate:Date;
    lastModifiedDate:Date;
    name:string;
    videos:Array<Video>;
}