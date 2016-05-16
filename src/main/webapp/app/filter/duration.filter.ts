import {PipeTransform, Pipe} from "angular2/core";
@Pipe({
    name:'durationFilter'
})
export class DurationFilter implements PipeTransform{
    public transform(args: string):string{
        return args.substring(2);
    }
}