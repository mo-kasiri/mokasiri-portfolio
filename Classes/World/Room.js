import * as THREE from 'three'
import Experience from "../Experience.js";
import holographicVertexShader from '../../shaders/Holographic/Vertex.glsl'
import holographicFragmentShader from '../../shaders/Holographic/Fragment.glsl'
import GSAP from "gsap";
import {metalness} from "three/tsl";
import {UltraHDRLoader} from "three/addons/loaders/UltraHDRLoader.js";
import Environment from "./Environment.js";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.modelSize = 1;
        this.sizes = this.experience.sizes;
        this.aspect = this.sizes.aspect;
        this.modelSize = this.sizes.modelsize;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.time = this.experience.time;
        this.deltaTime = this.experience.time.delta;
        this.resources = this.experience.resources;
        this.preloader = this.experience.preloader;
        this.preloader.done = this.experience.preloader.done;

        this.room = this.resources.items.bots;
        this.roomChildren = {};
        this.bots = this.room.scene;

        /* Separate Objects */
        //this.Boxes = null;


        this.holobot = null;
        this.holobotBlade = null;
        this.lerp = {current:0, target:0, ease:0.1};
        this.blades = []
        this.mainBot = null;
        this.SetModel();
        this.onMouseMove();
    }


    SetModel(){
        const materialParameters = {};
        materialParameters.color = '#70c1ff';

        this.holoMaterial = new THREE.ShaderMaterial({
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            side: THREE.DoubleSide,
            vertexShader: holographicVertexShader,
            fragmentShader: holographicFragmentShader,
            uniforms:{
                uTime: new THREE.Uniform(0),
                uColor: new THREE.Uniform(new THREE.Color(materialParameters.color)),
            }
        });


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

        //console.log(this.bots);
        this.bots.traverse((child) =>
        {
            if(child.name === "HoloBot"){
                this.holobot = child;
                this.holobot.material = this.holoMaterial;
            }
            if(child.name === "HoloBlade"){
                //console.log("found HoloBlade")
                this.holobotBlade = child;
                this.holobotBlade.material = this.holoMaterial;
            }

            if(child.name === "Main_Bot"){
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
            if(child.name === "MetallicObjects")
            {
                child.material = new THREE.MeshStandardMaterial({
                        envMap: this.environmentMap,
                        //color: new THREE.Color(0.356,0.356,0.356),
                        //ior: params.ior,
                        roughness: params.roughness,
                        metalness: params.metalness
                    });
            }

            //if(child.name !=="StartingShape")
            //child.scale.set(0,0,0);
            if(child.name === "Boxes"){
                child.scale.set(0,0,0);
            }
            if(child.name === "FloorItems"){
                child.scale.set(0,0,0);
            }
            if(child.name === "ProductionLine"){
                child.scale.set(0,0,0);
            }
            if(child.name === "Platform"){
                child.scale.set(0,0,0);
            }
            if(child.name === "Computer"){
                child.scale.set(0,0,0);
            }
            if(child.name === "MetallicObjects"){
                child.scale.set(0,0,0);
            }
            if(child.name === "HoloBot"){
                child.scale.set(0,0,0);
            }
            if(child.name === "Main_Bot"){
                child.position.y = 6;
                child.scale.set(0,0,0);
            }
            this.roomChildren[child.name]  = child;
        });


        this.bots.scale.set(this.modelSize,this.modelSize, this.modelSize);
        //this.roomChildren.scale.set(this.modelSize);



        this.HoloLight = new THREE.PointLight(0xFF9C6B,5);
        this.HoloLight.distance = 0;
        if(this.holobot){
           this.HoloLight.position.set(this.holobot.position.x, this.holobot.position.y, this.holobot.position.z);
            //console.log("In position")
        }

        this.scene.add(this.bots,this.HoloLight);
    }

    onMouseMove(){
        window.addEventListener("mousemove",e=>{
            this.rotation = (e.clientX - window.innerWidth/2)/window.innerWidth*2;
            this.lerp.target = this.rotation * 0.1;
        })
    }

    resize(){
        //this.modelSize = Math.sqrt(this.sizes.width)/80;
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
            this.mainBot.position.y += 0.04*(Math.sin(this.time.elapsedTime * 2) * 0.2 + Math.sin(this.time.elapsedTime * 2 + 3.45) * 0.1);
            this.mainBot.position.x += 0.01*(Math.sin(this.time.elapsedTime * 2) * 0.2 + Math.sin(this.time.elapsedTime * 2 + 3.45) * 0.2);
            this.mainBot.position.z += 0.01*(Math.sin(this.time.elapsedTime * 2) * 0.2 + Math.sin(this.time.elapsedTime * 2 + 3.45) * 0.3);
        }

        if(this.blades.length){
            this.blades.forEach(blade=>{
                if(blade.name === "Main_Bot_Blade"){
                    blade.rotation.y += 0.17;
                }
                blade.rotation.y += 0.1;
            })
        }

        /* Holo bot update material */
        if(this.holobot){
            this.holobot.rotation.y += 0.01;
            this.holobot.position.y = 0.6 + Math.sin(this.time.elapsedTime) * 0.1 + Math.sin(this.time.elapsedTime * 2 + 3.45) * 0.05;
        }
        this.holoMaterial.uniforms.uTime.value = this.time.elapsedTime;
    }
}