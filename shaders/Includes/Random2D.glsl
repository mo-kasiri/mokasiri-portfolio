
float random2D(vec2 value){
    return fract(sin(uTime + dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
}