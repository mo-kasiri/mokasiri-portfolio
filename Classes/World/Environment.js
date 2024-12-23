import * as THREE from 'three';
import Experience from "../Experience.js";
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js';
import GSAP from "gsap";

export default class Environment {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.renderer = this.experience.renderer;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.room = this.resources.items.bots;
        this.bots = this.room.scene;
        this.gui = this.experience.gui;
        this.obj = {
            colorObj: {r: 0, g:0, b:0},
            redLight: {r: 0, g:0},
            blueLight: {r: 0, g:0},
            orangeLight: {r: 0, g:0},
            intensity: 3,
        };

        const size = 20;
        const divisions = 20;

       /* const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);*/

        //const axesHelper = new THREE.AxesHelper(5);
        //this.scene.add(axesHelper);

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
        this.setGui();
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

    switchTheme(theme){
        if(theme === 'dark'){
            GSAP.to(this.sunLight.color,{
                r: 0.05,
                g: 0.05,
                b: 0.05,
            });
            GSAP.to(this.Ambientlight.color,{
                r: 0.2,
                g: 0.2,
                b: 0.5,
            });
            GSAP.to(this.BlueAreaLight.color,{
                r: 5/255,
                g: 64/255,
                b: 200/255,
            });
            GSAP.to(this.RedAreaLight.color,{
                r: 64/255,
                g: 23/255,
                b: 115/255,
            });
            GSAP.to(this.OrangeAreaLight.color,{
                r: 29/255,
                g: 68/255,
                b: 100/255,
            })
        }else{
            GSAP.to(this.sunLight.color,{
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.Ambientlight.color,{
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.BlueAreaLight.color,{
                r:0.54,
                g:0.92,
                b:1
            });
            GSAP.to(this.RedAreaLight.color,{
                r:1.7,
                g:0.5,
                b:0.5
            });
            GSAP.to(this.OrangeAreaLight.color,{
                r:1.5,
                g:0.61,
                b:0.41
            })
        }
    }

    setGui(){
        /*this.gui.addColor(this.obj, "colorObj").onChange(()=>{
            this.sunLight.color.copy(this.obj.colorObj);
            this.Ambientlight.color.copy(this.obj.colorObj);
            this.OrangeAreaLight.color.copy(this.obj.orangeLight);
        });

        this.gui.add(this.obj, 'intensity',0,10).onChange(()=>{
            this.sunLight.intensity = this.obj.intensity;
        });

        this.gui.addColor(this.obj,'blueLight').onChange(()=>{
            this.BlueAreaLight.color.copy(this.obj.blueLight);
        });
        this.gui.addColor(this.obj,'redLight').onChange(()=>{
            this.RedAreaLight.color.copy(this.obj.redLight);
        });
        this.gui.addColor(this.obj,'orangeLight').onChange(()=>{
            this.OrangeAreaLight.color.copy(this.obj.orangeLight);
        });*/

    }

    SetEnvironmentBackground(){

        const loader = new UltraHDRLoader();
        loader.setDataType( THREE.FloatType );
        this.environmentMap.encoding = THREE.sRGBEncoding;
        this.scene.background = this.environmentMap;
    }

}