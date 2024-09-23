import * as THREE from 'three'
import Experience from "../Experience.js";
import GSAP from "gsap"
import {UltraHDRLoader} from "three/addons/loaders/UltraHDRLoader.js";
import Environment from "./Environment.js";

export default class ControlsTest {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.time = this.experience.time;
        this.deltaTime = this.experience.time.delta;
        this.resources = this.experience.resources;
        this.progress = 0;
        this.dummyVector = new THREE.Vector3( 0, 0, 0 );


        this.lerp = {current:0, target:0,ease:0.1};
        this.position = new THREE.Vector3( 0, 0, 0 );
        this.lookAtPosition = new THREE.Vector3( 0, 0, 0 );

        this.SetPath();
        this.onWheel();


    }

    SetPath(){
        //Create a closed wavey loop
        this.curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -8, 0, 0 ),
            new THREE.Vector3( 0, 0, -8 ),
            new THREE.Vector3( 8, 0, 0 ),
            new THREE.Vector3( 0, 0, 8)
        ] , true);



        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const material = new THREE.LineBasicMaterial( { color: 0xf000f0 } );

// Create the final object to add to the scene
        const curveObject = new THREE.Line( geometry, material );
        this.scene.add(curveObject);
    }

    onWheel(){
        window.addEventListener("wheel",e=>{
            if(e.deltaY > 0){
                this.lerp.target +=0.01;
                this.back = true;
            }else{
                this.lerp.target -=0.01;
                this.back = false;
            }
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

        this.lerp.target = GSAP.utils.clamp(0,1,this.lerp.target);
        this.lerp.current = GSAP.utils.clamp(0,1,this.lerp.current);


        this.curve.getPointAt(this.lerp.current, this.position);
        //console.log(this.lerp.current);
        //console.log(this.position);
        //this.curve.getPointAt(this.lerp.current+0.00001,this.lookAtPosition);


        this.camera.orthographicCamera.position.copy(this.position);
        this.position.normalize();
        this.position.multiplyScalar(1000)
        //console.log(this.position);

        //this.camera.orthographicCamera.lookAt(this.lookAtPosition);
        //this.camera.orthographicCamera.lookAt(new THREE.Vector3(0,0,0));
        //this.camera.orthographicCamera.lookAt(this.position);
        this.camera.orthographicCamera.lookAt(this.position);
    }

}