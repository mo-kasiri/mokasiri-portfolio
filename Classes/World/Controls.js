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

        this.setPath();
    }

    setPath(){
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
        });
        //console.log(this.room);
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