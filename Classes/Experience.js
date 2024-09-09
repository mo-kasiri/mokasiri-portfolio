import * as THREE from 'three';
import {EventEmitter} from 'events';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from "./Renderer"

import World from './World/World';
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

export default class Experience{
    static instance;
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();

        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);


        this.world = new World();

        this.time.on("update",()=>{
            this.update();
        });

        this.sizes.on("resize",()=>{
            this.resize();
        });
    }

    resize(){
        this.camera.resize();
        this.renderer.resize();
    }

    update(){
        this.world.update();
        this.camera.update();
        this.renderer.update();
    }
}