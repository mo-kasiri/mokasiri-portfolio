import * as THREE from 'three';
import Experience from "../Experience.js";
export default class Environment {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.room = this.resources.items.bots;
        this.bots = this.room.scene;
        console.log(this.room);

        const size = 10;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);

        this.SetSunLight();
    }
    SetSunLight(){
       this.sunLight = new THREE.DirectionalLight("#ffffff",3);
       this.sunLight.castShadow = true;
       this.sunLight.shadow.camera.far = 20;
       this.sunLight.shadow.mapSize.set(2048,2048);
       this.sunLight.shadow.normalBias = 0.05;
       this.sunLight.position.set(1.5,7,3);
       this.scene.add(this.sunLight);
    }
}