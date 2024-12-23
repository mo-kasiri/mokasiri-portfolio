import * as THREE from 'three'
import Experience from "../Experience.js";
import GSAP from "gsap";


export default class Floor{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.time = this.experience.time;
        this.deltaTime = this.experience.time.delta;
        this.lerp = {current:0, target:0,ease:0.1};
        this.setFloor();
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100,100);
        this.material = new THREE.MeshStandardMaterial({color: 0xffffff, side:THREE.DoubleSide });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.receiveShadow = true;
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.5;
        this.scene.add(this.plane);
    }


    resize(){

    }

    update(){

    }
}