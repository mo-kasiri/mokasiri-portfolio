import * as THREE from 'three';
import Experience from "../Experience.js";
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js';

export default class Environment {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.renderer = this.experience.renderer;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.room = this.resources.items.bots;
        this.bots = this.room.scene;
        //console.log(this.room);

        const size = 20;
        const divisions = 20;

       /* const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);*/

        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);

        const cubeTextureLoader = new THREE.CubeTextureLoader();
        this.environmentMap = cubeTextureLoader.load([
            '/textures/environmentMaps/2/px.jpg',
            '/textures/environmentMaps/2/nx.jpg',
            '/textures/environmentMaps/2/py.jpg',
            '/textures/environmentMaps/2/ny.jpg',
            '/textures/environmentMaps/2/pz.jpg',
            '/textures/environmentMaps/2/nz.jpg',
        ]);

        this.SetSunLight();
        this.SetEnvLights();
        this.SetEnvironmentBackground();
    }



    SetSunLight(){
       this.sunLight = new THREE.DirectionalLight("#ffffff",3);
       this.sunLight.castShadow = true;
       this.sunLight.shadow.camera.far = 20;
       this.sunLight.shadow.mapSize.set(2048,2048);
       this.sunLight.shadow.normalBias = 0.05;
       this.sunLight.position.set(1.5,7,3);
       this.scene.add(this.sunLight);

       this.Ambientlight = new THREE.AmbientLight(0xffffff, 1);
       this.scene.add(this.Ambientlight);


    }

    SetEnvLights(){
        this.BlueAreaLight = new THREE.PointLight(0x8AEBFF, 20);
        this.BlueAreaLight.distance = 0;
        this.BlueAreaLight.position.set(3,3,1);

        this.RedAreaLight = new THREE.PointLight(0xFF7D7F, 25);
        this.RedAreaLight.position.set(-2,3,-1);

        this.OrangeAreaLight = new THREE.PointLight(0xFF9C6B,15);
        this.OrangeAreaLight.distance = 0;
        this.OrangeAreaLight.position.set(0,2.5,-3);


        this.scene.add(this.BlueAreaLight, this.RedAreaLight, this.OrangeAreaLight);


    }

    SetEnvironmentBackground(){

        const loader = new UltraHDRLoader();
        loader.setDataType( THREE.FloatType );
        this.environmentMap.encoding = THREE.sRGBEncoding;
        //this.scene.background = this.environmentMap;
    }

}