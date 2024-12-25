import EventEmitter from "events";
import Experience from "./Experience.js";
import {gsap} from "gsap";

export default class Preloader extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.aspect = this.sizes.aspect;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;
        this.modelSize = this.experience.sizes.modelsize;

        this.sizes.on("switchDevice",(device)=>{
            this.device = device;
        })

        this.world.on("worldReady",()=>{
            this.setAssets();
            this.playIntro();
            //this.update();
        });
    }

    setAssets(){
        this.room = this.experience.world.room.bots;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
        this.startingShape = this.roomChildren.StartingShape;
        this.startingShape.scale.set(1,1,1);
    }

    firstIntro(){
        return new Promise((resolve=>{
            this.timeline = gsap.timeline();
            if(this.device === "desktop"){
                this.timeline.to(this.startingShape.scale,{
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,

                },"same").to(this.startingShape.position,{
                    x:-2,
                    z:-2,
                    y:-0.3,
                    ease: "power1.out",
                    duration: 0.7,
                    onComplete: resolve,
                },"same");

                // Mobile
            }else{
                this.timeline.to(this.startingShape.scale,{
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7
                },"same").to(this.startingShape.position,{
                    y: 0.5,
                    ease: "power1.out",
                    duration: 0.7,
                    onComplete: resolve,
                },"same");
            }
        }))
    }

    onScroll(e){
        if(e.deltaY > 0){
            //console.log("added event");
            window.removeEventListener("wheel",this.scrollOnceEvent);
            this.playSecondIntro();
        }
    }

    async playIntro(){
        await this.firstIntro();
        this.scrollOnceEvent = this.onScroll.bind(this)
        window.addEventListener("wheel",this.scrollOnceEvent);
    }

    async playSecondIntro(){
        await this.secondIntro();
    }

    secondIntro(){
        return new Promise((resolve)=>{
            this.secondTimeline = gsap.timeline();
            if(this.device === "desktop"){
                this.secondTimeline.to(this.startingShape.position,{
                    x:-0.5,
                    z:-0.5,
                    y:0.1,
                    ease: "bounce",
                    duration: 1.5,
                    onComplete: resolve,
                },"same").to(this.startingShape.scale,{
                    x: 8,
                    y: 8,
                    z: 8
                },"same").to(this.startingShape.scale,{
                    x:0,
                    y:0,
                    z:0,
                    duration:0.15,
                    ease: "power1.out"
                });
                this.secondTimeline.to(this.roomChildren.Platform.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "back.out(2.5)",
                    duration: 0.5,
                }).to(this.roomChildren.MetallicObjects.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "circ",
                    duration: 0.2,
                }).to(this.roomChildren.Boxes.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "circ",
                    duration: 0.2,
                }).to(this.roomChildren.ProductionLine.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "back.in",
                    duration: 0.3,
                }).to(this.roomChildren.FloorItems.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "circ",
                    duration: 0.4,
                }).to(this.roomChildren.HoloBot.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "circ",
                    duration: 0.2,
                }).to(this.roomChildren.Computer.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "circ",
                    duration: 0.4,
                }).to(this.roomChildren.Main_Bot.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "back",
                    duration: 0.1
                }).to(this.roomChildren.Main_Bot.position,{
                    y:1,
                    ease: "circ.out",
                    duration: 1.5,
                })
            }
        })
    }

    /*update(){
        if(this.roomChildren.Main_Bot){
            console.log("hello")
            this.Main_Bot.position.y = 1 + Math.sin(this.time.elapsedTime * 2) * 0.2 + Math.sin(this.time.elapsedTime * 2 + 3.45) * 0.1;
        }
    }*/
}