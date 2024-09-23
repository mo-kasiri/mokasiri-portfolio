import * as THREE from 'three'
import Experience from "./Experience";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas =this.experience.canvas;

        this.CreatePerspectiveCamera();
        this.CreateOrthographicCamera();
        this.SetOrbitControls();
    }

    CreatePerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect,0.1, 1000);
        this.perspectiveCamera.position.set(-14,14,35);
        this.scene.add(this.perspectiveCamera);
    }

    CreateOrthographicCamera(){
        this.frustrum = 5;
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -15,
            15);

        this.orthographicCamera.position.y = 4;
        this.orthographicCamera.position.z = 7;
        this.orthographicCamera.rotation.x = -Math.PI/6;

            this.scene.add(this.orthographicCamera);

            /*this.helper = new THREE.CameraHelper(this.orthographicCamera);
            this.scene.add(this.helper);*/
    }

    SetOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera,this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }

    resize(){
        // updating perspective Camera on resize
        /*this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();*/

        // Update Orthographic camera on Resize
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum/2;
        this.orthographicCamera.bottom = - this.sizes.frustrum/2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update(){
        this.controls.update();
        /*this.helper.matrixWorldNeedUpdate = true;
        this.helper.update();
        this.helper.position.copy(this.orthographicCamera.position);
        this.helper.rotation.copy(this.orthographicCamera.rotation);*/
    }
}