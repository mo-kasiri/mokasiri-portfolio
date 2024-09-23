import * as THREE from 'three'
import Experience from "../Experience.js";
import GSAP from "gsap";
import {metalness} from "three/tsl";
import {UltraHDRLoader} from "three/addons/loaders/UltraHDRLoader.js";
import Environment from "./Environment.js";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.time = this.experience.time;
        this.deltaTime = this.experience.time.delta;
        this.resources = this.experience.resources;
        this.room = this.resources.items.bots;
        this.bots = this.room.scene;
        this.lerp = {current:0, target:0,ease:0.1};
        this.blades = []
        this.mainBot = null;
        this.SetModel();
        this.onMouseMove();
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
            if(child.name === "MainBot"){
                this.mainBot = child;
            }

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
                        //ior: params.ior,
                        roughness: params.roughness,
                        metalness: params.metalness
                    });
            }
        })

        this.bots.scale.set(0.7,0.7,0.7);
        this.scene.add(this.bots);
    }

    onMouseMove(){
        window.addEventListener("mousemove",e=>{
            this.rotation = (e.clientX - window.innerWidth/2)/window.innerWidth*2;
            this.lerp.target = this.rotation * 0.1;
           // console.log(this.rotation);
        })
    }

    resize(){
        
    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
           this.lerp.current,
           this.lerp.target,
           this.lerp.ease
       );
        if(this.bots){
            this.bots.rotation.y = this.lerp.current + Math.PI/3;
        }

        if(this.mainBot){
            this.mainBot.position.y = 1.2 + Math.sin(this.time.elapsedTime * 2) * 0.2 + Math.sin(this.time.elapsedTime * 2 + 3.45) * 0.1;
        }
        if(this.blades.length){
            this.blades.forEach(blade=>{
                if(blade.name === "MainBotBlade"){
                    blade.rotation.y += 0.17;
                }
                blade.rotation.y += 0.1;
            })
        }
    }
}