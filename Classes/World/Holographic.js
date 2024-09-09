import * as THREE from 'three'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import Experience from "../Experience";
import holographicVertexShader from '../../shaders/Holographic/Vertex.glsl'
import holographicFragmentShader from '../../shaders/Holographic/Fragment.glsl'
import {EventEmitter} from "events";

console.log(holographicFragmentShader)

export default class Holographic{
    constructor() {
        //super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas =this.experience.canvas;
        this.camera = this.experience.camera;
        this.time = this.experience.time;
        this.resources = this.experience.resources;
        this.room = this.resources.items.holographicBot;
        this.holographicBot = this.room.scene;
        this.blade = null;
        this.material = null;
        this.gui = new GUI();

        this.SetModel();
        //this.update();

    }

    SetModel(){
       /* this.holographicBot.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;
        })*/

        const materialParameters = {};
        materialParameters.color = '#70c1ff';

        this.gui
            .addColor(materialParameters, 'color')
            .onChange(()=>{
                this.material.uniforms.uColor.value.set(materialParameters.color)
            })

        this.material = new THREE.ShaderMaterial({
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

        this.holographicBot.traverse((child) =>
        {

            if(child.isMesh)
            {
                child.material = this.material
                if(child.name === "Circle026"){
                    this.blade = child;
                }
            }
        })



        this.scene.add(this.holographicBot);
        console.log(this.holographicBot);
        //this.bots.scale.set(0.01,0.01,0.01);
    }


    resize(){

    }

    update(){
        if(this.blade){
            this.blade.rotation.y += 0.15;
        }

        if(this.holographicBot){
            this.holographicBot.position.y = Math.sin(this.time.elapsedTime * 2) * 0.1 + Math.sin(this.time.elapsedTime * 2 + 3.45) * 0.05;
        }
        this.material.uniforms.uTime.value = this.time.elapsedTime;

    }
}