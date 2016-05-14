import {Video} from "./Video";
export class User{
    id:number;
    createdBy:number;
    lastModifiedBy:number;
    createdDate:Date;
    lastModifiedDate:Date;
    userName:string;
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    address:string;
    active:boolean;
    lastLoggedInDate:Date;
    favouriteVideos:Array<Video>;
}