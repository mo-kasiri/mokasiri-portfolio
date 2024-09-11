import * as THREE from 'three'
import Experience from "../Experience.js";
import {metalness} from "three/tsl";
import {UltraHDRLoader} from "three/addons/loaders/UltraHDRLoader.js";
import Environment from "./Environment.js";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.room = this.resources.items.bots;
        this.bots = this.room.scene;
        this.blades = []
        //this.environmentMap = this.experience.world.environmentMap;

        this.SetModel();

    }



    SetModel(){
        const params = {
            autoRotate: true,
            metalness: 1,
            roughness: 0.35,
            exposure: 1.0,
            resolution: '2k',
            ior: 1.45,
            type: 'HalfFloatType'
        };

        const cubeTextureLoader = new THREE.CubeTextureLoader();
        this.environmentMap = cubeTextureLoader.load([
            '/textures/environmentMaps/2/px.jpg',
            '/textures/environmentMaps/2/nx.jpg',
            '/textures/environmentMaps/2/py.jpg',
            '/textures/environmentMaps/2/ny.jpg',
            '/textures/environmentMaps/2/pz.jpg',
            '/textures/environmentMaps/2/nz.jpg',
        ]);



        this.bots.traverse((child) =>
        {

            if(child.isMesh)
            {
                child.castShadow = true;
                child.receiveShadow = true;
                if(child.name.includes("Blade")){
                    this.blades.push(child);
                }
            }
            if(child.name === "Basement" ||
                child.name === "Plane006" ||
                child.name === "Plane005" ||
                child.name === "Plane024" ||
                child.name === "Plane026" ||
                child.name === "Plane009" ||
                child.name === "Circle011"||
                child.name === "Battery" ||
                child.name === "Circle015")
            {
                child.material = new THREE.MeshStandardMaterial({
                        envMap: this.environmentMap,
                        //color: new THREE.Color(0.356,0.356,0.356),
                        ior: params.ior,
                        roughness: params.roughness,
                        metalness: params.metalness
                    });
            }
        })

        this.scene.add(this.bots);
        //this.bots.scale.set(0.01,0.01,0.01);
    }


    resize(){
        
    }

    update(){
        if(this.blades.length){
            this.blades.forEach(blade=>{
                blade.rotation.y += 0.1;
            })
        }
    }

}