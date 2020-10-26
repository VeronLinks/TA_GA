export class Stage {

  id:number;
  text:string;
  options:string[];
  nextStages:number[];
  request:string;
  url:string;

  constructor(id, text, options, nextStages, request, url)
  {
      this.id = id;
      this.text = text;
      this.options = options;
      this.nextStages = nextStages;
      this.request = request;
      this.url = url;
  }
}