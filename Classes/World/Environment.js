import * as THREE from 'three';
import Experience from "../Experience.js";
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js';
import GSAP from "gsap";

export default class Environment {
    constructor() {
        const experience = new Experience();
        this.scene = experience.scene;
        this.renderer = experience.renderer;
        this.camera = experience.camera;
        this.resources = experience.resources;

        this.obj = {
            intensity: 3,
        };

        this.environmentMap = new THREE.CubeTextureLoader().load([
            '/textures/environmentMaps/0/px.jpg',
            '/textures/environmentMaps/0/nx.jpg',
            '/textures/environmentMaps/0/py.jpg',
            '/textures/environmentMaps/0/ny.jpg',
            '/textures/environmentMaps/0/pz.jpg',
            '/textures/environmentMaps/0/nz.jpg',
        ]);
        this.environmentMap.encoding = THREE.sRGBEncoding;

        this.setSunLight();
        this.setEnvLights();
        this.setEnvironmentBackground();
    }

    setSunLight() {
        const sun = new THREE.DirectionalLight(0xffffff, this.obj.intensity);
        sun.castShadow = true;
        sun.shadow.camera.far = 20;
        sun.shadow.mapSize.set(1024, 1024); // reduced for better performance
        sun.shadow.normalBias = 0.05;
        sun.position.set(1.5, 7, 3);
        this.scene.add(sun);
        this.sunLight = sun;

        const ambient = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(ambient);
        this.ambientLight = ambient;
    }

    setEnvLights() {
        const makeLight = (color, intensity, pos) => {
            const light = new THREE.PointLight(color, intensity);
            light.position.set(...pos);
            this.scene.add(light);
            return light;
        };

        this.blueLight = makeLight(0x8AEBFF, 20, [3, 3, 1]);
        this.redLight = makeLight(0xFF7D7F, 25, [-2, 3, -1]);
        this.orangeLight = makeLight(0xFF9C6B, 15, [0, 2.5, -3]);
    }

    switchTheme(theme) {
        const to = (light, r, g, b) => GSAP.to(light.color, { r, g, b });

        if (theme === 'dark') {
            to(this.sunLight, 0.05, 0.05, 0.05);
            to(this.ambientLight, 0.2, 0.2, 0.5);
            to(this.blueLight, 5 / 255, 64 / 255, 200 / 255);
            to(this.redLight, 64 / 255, 23 / 255, 115 / 255);
            to(this.orangeLight, 29 / 255, 68 / 255, 100 / 255);
        } else {
            to(this.sunLight, 1, 1, 1);
            to(this.ambientLight, 1, 1, 1);
            to(this.blueLight, 0.54, 0.92, 1);
            to(this.redLight, 1, 0.5, 0.5);
            to(this.orangeLight, 1, 0.61, 0.41);
        }
    }

    setEnvironmentBackground() {
        // UltraHDRLoader is redundant here if you're not using .hdr format
        // Removed HDR loader usage if not needed
        this.scene.background = this.environmentMap;
    }
}
