import {Image} from "./Image";
import {Statistics} from "./YoutubeResponse";
export class Video{
    id:number;
    createdBy:number;
    lastModifiedBy:number;
    createdDate:Date;
    lastModifiedDate:Date;
    url:string;
    videoId:string;
    frameHeight:number;
    frameWidth:number;
    duration:string;
    name:string;
    active:boolean;
    shared:boolean;
    description:string;
    image:Image;
    statistics:Statistics;
}
