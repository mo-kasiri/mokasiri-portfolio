import EventEmitter from "events";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader.js";
import Experience from "../Experience.js";

export default class Resources extends EventEmitter{
    constructor(assets){
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets;
        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;
        this.SetLoaders();
        this.StartLoading();
        //console.log(this.assets);
    };
    SetLoaders(){
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();

        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }
    StartLoading(){
        for(const asset of this.assets){
            if(asset.type ==="glbModel"){
                this.loaders.gltfLoader.load(asset.path,(file)=>{
                    this.SingleAssetLoaded(asset,file);
                });
            }else if(asset.type === "videoTexture"){
                this.video = {};
                this.videoTexture = {};

                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path;
                this.video[asset.name].playInline = true;
                this.video[asset.name].muted = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                //this.video[asset.name].play();

                this.videoTexture[asset.name] = new THREE.VideoTexture(
                    this.video[asset.name]
                );
                this.video[asset.name].flipY = true;
                this.video[asset.name].minFilter = THREE.NearestFilter;
                this.video[asset.name].mageFilter = THREE.NearestFilter;
                this.video[asset.name].generateMipmaps = false;
                this.video[asset.name].encoding = THREE.sRGBEncoding;

                this.SingleAssetLoaded(asset,this.video[asset.name]);
            }
        }
    }

    SingleAssetLoaded(asset,file){
        this.items[asset.name] = file;
        this.loaded++;
        console.log(this.loaded+ " are loaded")

        console.log("assets are loading")
        if(this.loaded === this.queue){
            console.log("all assets are done");
            this.emit("ready");
        }
    }
}