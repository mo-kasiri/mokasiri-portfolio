import * as THREE from 'three'
import Experience from "../Experience.js";
import GSAP from "gsap"
import {UltraHDRLoader} from "three/addons/loaders/UltraHDRLoader.js";
import Environment from "./Environment.js";
import {ScrollTrigger} from "gsap/ScrollTrigger";

export default class ControlsTest {
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.aspect = this.sizes.aspect;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.time = this.experience.time;
        this.deltaTime = this.experience.time.delta;
        this.resources = this.experience.resources;
        //this.lerp = {current:0, target:0,ease:0.1};
        //this.room = this.experience.world;
        this.gsap = GSAP;
        this.gsap.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();
    }

    /*setScrollTrigger(){
        this.world = this.experience.world;

        this.room = this.experience.world.room.bots;

        this.timeline = this.gsap.timeline();
        this.timeline.to(this.room.position,{
            x: ()=> {return this.sizes.width > this.sizes.height ? 5 / this.aspect : 1 / this.aspect},
            scrollTrigger:{
                trigger: ".first-move",
                markers: true,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });*/
        //console.log(this.room);

    setScrollTrigger(){

        this.world = this.experience.world;

        this.room = this.experience.world.room.bots;
        ScrollTrigger.matchMedia({
            // Desktop
            "(min-width: 968px)":  ()=> {


                // First Section -----------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: 3,
                        //invalidateOnRefresh: true,
                    }
                }).to(this.room.position,{
                    x:()=>{
                        return this.sizes.width * 0.0014
                    }
                });

                // Second Section -----------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: 3,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position,{
                    x: ()=>{
                        return 1;
                    },
                    z: ()=>{
                        return -this.sizes.height * 0.0001
                    }
                }, "same").to(this.room.scale,{
                    x:1.5,
                    y:1.5,
                    z:1.5
                }, "same");


                // Third Section ----------------------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: 3,
                        invalidateOnRefresh: true,
                        //markers: true
                        //toggleActions: "restart resume revers pause"
                    }
                }).to(this.room.position,{
                   x:()=>{
                       return 0.5;
                   }
                },"same").to(this.room.scale,{
                    x:1.5,
                    y:1.5,
                    z:1.5
                }, "same");

            },
            // Mobile ==============================================================================
            "(max-width: 968px)":  ()=>{
                console.log("Fired Mobile");
                this.room.position.set(0,0,0);

                // First Section -----------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        //markers: true,
                        start: "top bottom",
                        end: "bottom bottom",
                        ease: "back",
                        scrub: 2,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale,{
                    x:0.35,
                    y:0.35,
                    z:0.35
                })

                // Second Section -----------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top bottom",
                        end: "bottom bottom",
                        ease: "back",
                        scrub: 2,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position,{
                    x:1.5
                },"same").to(this.room.scale,{
                    x:0.8,
                    y:0.8,
                    z:0.8
                },"same")

                // Third Section ----------------------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: 2,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position,{
                    x:-1.5
                },"same")
            },


            // all
            all: () =>{
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section)=>{
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if(section.classList.contains("right")){
                        GSAP.to(section,{
                            borderTopLeftRadius: 10,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                //markers: true,
                                scrub: 0.6,
                            }
                        });
                        GSAP.to(section,{
                            borderBottomLeftRadius: 10,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                //markers: true,
                                scrub: 0.6,
                            }
                        })
                    }else{
                        GSAP.to(section,{
                            borderTopRightRadius: 10,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                //markers: true,
                                scrub: 0.6,
                            }
                        });
                        GSAP.to(section,{
                            borderBottomRightRadius: 10,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                //markers: true,
                                scrub: 0.6,
                            }
                        });
                    }

                    GSAP.from(this.progressBar,{
                        scaleY: 0,
                        scrollTrigger:{
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressBar,
                            pinSpacing: false,
                        }
                    })
                })


                // Mini Platform animation
                /*this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "center center",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position,{
                    x:-1.5
                },"same")*/
            },
        });
    }


    resize(){

    }

    update(){
        /*this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );*/
    }

}