import * as THREE from 'three'
import Experience from "../Experience.js";
import Room from './Room.js';
import Holographic from "./Holographic.js";
import Controls from "./Controls.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import EventEmitter from "events";

export default class World extends EventEmitter {

    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas =this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;


        this.resources.on("ready",()=>{
            this.room = new Room();
            //this.HolographicRobot = new Holographic();
            this.environment = new Environment();
            this.environmentMap = this.environment.environmentMap;
            this.floor = new Floor();
            this.Controls = new Controls();
            this.emit("worldReady");
        });

        this.theme.on('switch',(theme)=>{
            this.switchTheme(theme);
        })

    }

    switchTheme(theme){
        if(this.environment){
            this.environment.switchTheme(theme);
        }
    }

    resize(){
        this.room.resize();
    }

    update(){
        if(this.Controls){
            this.Controls.update();
        }
        if(this.room)
            this.room.update();
        if(this.HolographicRobot){
            this.HolographicRobot.update();
        }
    }
}