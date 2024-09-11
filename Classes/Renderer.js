import * as THREE from 'three'
import Experience from "./Experience";


export default class Renderer{
    renderer;
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas =this.experience.canvas;
        this.gui = this.experience.gui;
        this.camera = this.experience.camera;
        this.SetBackgroundColor();
        this.setRenderer();

    }

    setRenderer(){
        this.renderer = new THREE.WebGLRenderer(
            {canvas:this.canvas,
            antialias: true});

            /*this.renderer.physicallyCorrectLights = true;
            this.renderer.ouputEncoding = THREE.SRGBEncoding;
            this.renderer.toneMapping = THREE.CineonToneMapping;
            this.renderer.toneMappingExposure = 2.;
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFShadowMap;
            this.renderer.setSize(this.sizes.width, this.sizes.height);
            this.renderer.setPixelRatio(this.sizes.pixelRatio);*/

            //this.renderer.setSize(sizes.width, sizes.height)
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.9;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;

    }

    SetBackgroundColor(){
        const rendererParameters = {}
        rendererParameters.clearColor = '#363A7A'
        this.gui
            .addColor(rendererParameters, 'clearColor')
            .onChange(() =>
            {
                this.renderer.setClearColor(rendererParameters.clearColor)
            })
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update(){
        this.renderer.render(this.scene,this.camera.perspectiveCamera);
    }

}