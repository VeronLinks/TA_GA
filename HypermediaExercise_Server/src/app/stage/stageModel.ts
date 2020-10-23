export class Stage
{
    id:number;
    text:string;
    options:string[];
    nextStages:number[];

    constructor(id, text, options, nextStages)
    {
        this.id = id;
        this.text = text;
        this.options = options;
        this.nextStages = nextStages;
    }
}