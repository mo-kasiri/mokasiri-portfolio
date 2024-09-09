import * as THREE from 'three'
import Experience from "../Experience.js";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.room = this.resources.items.bots;
        this.bots = this.room.scene;
        //console.log(this.room);


        this.SetModel();

    }

    SetModel(){
        this.bots.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;
        })
        this.scene.add(this.bots);
        //this.bots.scale.set(0.01,0.01,0.01);
    }


    resize(){
        
    }

    update(){
        
    }

}