import EventEmitter from "events";
import Experience from "./Experience.js";
import {gsap} from "gsap";
import convert from "./Utils/convertDivsToSpans.js"

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
        });
    }

    setAssets(){
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));
        this.room = this.experience.world.room.bots;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
        this.startingShape = this.roomChildren.StartingShape;
        this.startingShape.scale.set(1,1,1);
    }

    firstIntro(){
        return new Promise((resolve=>{
            this.timeline = gsap.timeline();
            this.timeline.set(".animatedis",{y:0, yPercent: 100})
            this.timeline.to(".preloader",{
                opacity: 0,
                onComplete: ()=>{
                    document.querySelector(".preloader").classList.add(".hidden");
                }
            })

            if(this.device === "desktop"){
                this.timeline.to(this.startingShape.scale,{
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,

                },"same").to(this.startingShape.position,{
                    x:-1.1,
                    z:-1.1,
                    y:-0.5,
                    ease: "power1.out",
                    duration: 0.7,
                    //onComplete: resolve,
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
                    //onComplete: resolve,
                },"same");
            }

            this.timeline.to(".intro-text .animatedis",{
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.2)",
            }).to(".arrow-svg-wrapper",{
                opacity: 1,
            }).to(".toggle-bar",{
                opacity: 1,
                onComplete: resolve,
            })
        }))
    }

    onScroll(e){
        if(e.deltaY > 0){
            this.removeEventListeners();
            this.playSecondIntro();
        }

    }

    onTouch(e){
        this.intialY = e.touches[0].clientY;
    }

    onTouchMove(e){
        let currentY = e.touches[0].clientY;
        let difference = this.intialY - currentY;
        if(difference > 0){
            console.log("swiped up");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.intialY = null;
    }

    removeEventListeners(){
        window.removeEventListener("wheel",this.scrollOnceEvent);
        window.removeEventListener("touchstart",this.touchStart);
        window.removeEventListener("touchmove",this.touchMove);
    }

    async playIntro(){
        await this.firstIntro();
        this.moveFlage = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel",this.scrollOnceEvent);
        window.addEventListener("touchstart",this.touchStart);
        window.addEventListener("touchmove",this.touchMove);
    }

    async playSecondIntro(){
        this.scaleFlag = true;
        this.moveFlag = false;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enableControls");
    }

    secondIntro(){
        return new Promise((resolve)=>{
            this.secondTimeline = gsap.timeline();
            //if(this.device === "desktop"){
            this.timeline.to(".intro-text .animatedis",{
                yPercent: 100,
                stagger: 0.07,
                ease: "back.inOut(1.2)",
            },"fadeout").to(".arrow-svg-wrapper",{
                opacity: 0,
            }, "fadeout");

                this.secondTimeline.to(this.startingShape.position,{
                    x:0,
                    z:0,
                    y:0.1,
                    ease: "elastic",
                    duration: 1.5,
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
                    duration: 0.5,
                }).to(this.roomChildren.FloorItems.scale,{
                    x:1,
                    y:1,
                    z:1,
                    ease: "circ",
                    duration: 0.4,
                }).to(this.roomChildren.HoloBot.scale,{
                    x:1.2,
                    y:1.2,
                    z:1.2,
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
                    duration: 1.8,
                    onComplete: resolve,
                }).to(".arrow-svg-wrapper",{
                    opacity: 1,
                })

            this.timeline.to(".hero-main-title .animatedis",{
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.2)",
            }).to(".hero-main-description .animatedis",{
                yPercent: 0,
                stagger: 0.03,
                ease: "back.out(1.2)",
            }).to(".first-sub .animatedis",{
                yPercent: 0,
                stagger: 0.03,
                ease: "back.out(1.2)",
            }).to(".second-sub .animatedis",{
                yPercent: 0,
                stagger: 0.03,
                ease: "back.out(1.2)",
            })
            //}
        })
    }

    move(){
        if(this.device === "desktop"){
            this.room.position.set(-1,0,-1);
        }else{
            this.room.position.set(0,0,-1);
        }
    }

    scale(){
       /* if(this.device === "desktop"){
            this.room.scale.set(0.11,0.11,0.11);
        }else{
            this.room.scale.set(0.07,0.07,0.07);
        }*/
    }

    update(){
        if(this.moveFlage)
            //this.move();

        if(this.scaleFlag){
            //this.scale();
        }
    }
}