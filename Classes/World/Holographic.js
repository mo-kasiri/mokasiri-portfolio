import * as THREE from "three";

import Experience from "../Experience";
import holographicVertexShader from "../../shaders/Holographic/Vertex.glsl";
import holographicFragmentShader from "../../shaders/Holographic/Fragment.glsl";

export default class Holographic {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    //sdfsdf;
    this.room = this.resources.items.holographicBot;
    this.holographicHead = this.room.scene;
    this.material = new THREE.Material();

    this.SetModel();
  }

  SetModel() {
    this.material = new THREE.ShaderMaterial({
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
      vertexShader: holographicVertexShader,
      fragmentShader: holographicFragmentShader,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uColor: new THREE.Uniform(new THREE.Color(materialParameters.color)),
      },
    });

    this.holographicHead.traverse((child) => {
      if (child.isMesh) {
        child.material = this.material;
        if (child.name === "Circle026") {
          this.blade = child;
        }
      }
    });

    this.scene.add(this.holographicHead);
  }

  resize() {}

  update() {
    if (this.holographicHead) {
      this.holographicHead.position.y =
        0.6 +
        Math.sin(this.time.elapsedTime) * 0.1 +
        Math.sin(this.time.elapsedTime * 2 + 3.45) * 0.05;
    }
    this.material.uniforms.uTime.value = this.time.elapsedTime;
  }
}
