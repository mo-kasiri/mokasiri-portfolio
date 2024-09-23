import * as THREE from 'three'
import Experience from "../Experience.js";
import GSAP from "gsap"
import {UltraHDRLoader} from "three/addons/loaders/UltraHDRLoader.js";
import Environment from "./Environment.js";

export default class ControlsTest {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.time = this.experience.time;
        this.deltaTime = this.experience.time.delta;
        this.resources = this.experience.resources;
        //this.lerp = {current:0, target:0,ease:0.1};
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