import {EventEmitter} from 'events';
import * as THREE from 'three';

export default class Time extends EventEmitter{
    constructor(){
        super();
        this.clock = new THREE.Clock();
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.elapsedTime = this.clock.getElapsedTime();
        this.delta = 16;

        this.update();
    }

    update(){
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;
        this.elapsedTime = this.clock.getElapsedTime();

        this.emit('update');
        window.requestAnimationFrame(this.update.bind(this));

        //console.log(this.delta);
    }
}