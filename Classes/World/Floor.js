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
        this.setCircles();
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

    setCircles(){
        const geometry = new THREE.CircleGeometry(5,32);
        const material = new THREE.MeshStandardMaterial({color: 0xe5a1aa });
        const material2 = new THREE.MeshStandardMaterial({color: 0x8395CD });
        const material3 = new THREE.MeshStandardMaterial({color: 0x7AD0AC });
        this.circleFirst = new THREE.Mesh(geometry,material);
        this.circleSecond = new THREE.Mesh(geometry,material2);
        this.circleThird = new THREE.Mesh(geometry,material3);
        this.circleFirst.position.y = -0.49;
        this.circleSecond.position.y = -0.48;
        this.circleSecond.position.x = 1.5;
        this.circleThird.position.y = -0.47;
        this.circleFirst.scale.set(0,0,0);
        this.circleSecond.scale.set(0,0,0);
        this.circleThird.scale.set(0,0,0);
        this.circleFirst.rotation.x = this.circleSecond.rotation.x = this.circleThird.rotation.x = -Math.PI/2;
        this.circleFirst.receiveShadow = this.circleSecond.receiveShadow = this.circleThird.receiveShadow = true;

        this.scene.add(this.circleFirst, this.circleSecond, this.circleThird);
    }


    resize(){

    }

    update(){

    }
}