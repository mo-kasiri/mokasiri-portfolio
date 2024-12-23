import EventEmitter from "events";

export default class Sizes extends EventEmitter{
    constructor(){
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.modelsize = 1;
        this.aspect = 1;
        if(this.width> this.height){
            this.aspect = this.width/this.height;
            this.modelsize = 1.2/this.aspect;
        }else{
            this.aspect = this.height/this.width;
            this.modelsize = 0.55/this.aspect;
        }

        this.pixelRatio = Math.min(window.devicePixelRatio,2);
        this.frustrum = 5;

        window.addEventListener("resize",()=>{
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.aspect = this.width/this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio,2);
            this.emit("resize");
        });
    }
}