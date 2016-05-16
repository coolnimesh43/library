import {Image} from "./Image";
export class Localized{
    title:string;
    description:string;
}
export class Thumbnail{
    default:Image;
    medium:Image;
    high:Image;
}
export class Snippet{
    publishedAt:string;
    channelId:string;
    title:string;
    description:string;
    thumbnails:Thumbnail;
    channelTitle:string;
    tags:Array<string>;
    categoryId:string;
    liveBroadcastContent:string;
    localized:Localized;
}
export class Item{
    kind:string;
    etag:string;
    id:string;
    snippet:Snippet;
    contentDetails:ContentDetails;
    statistics:Statistics;
}
export class ContentDetails{
    duration:string;
    dimension:string;
    definition:string;
    caption:boolean;
}
export class Statistics{
    viewCount:string;
    likeCount:string;
    dislikeCount:string;
}
export class PageInfo{
    totalResults:number;
    resultsPerPage:number;
}
export class YoutubeResponse{
    kind:string;
    etag:string;
    pageInfo:PageInfo;
    items:Array<Item>;
}