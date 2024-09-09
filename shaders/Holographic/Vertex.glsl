
uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;
#include ../includes/random2D.glsl

void main()
{
// Position
vec4 modelPosition = modelMatrix * vec4(position, 1.0);

// Glitch
float glitchTime = uTime - modelPosition.y;
float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime*8.76);
glitchStrength /= 3.0;
glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
glitchStrength *= 0.25;

modelPosition.x += (random2D(modelPosition.xz) - 0.5) * glitchStrength;

// Final Position
gl_Position = projectionMatrix * viewMatrix * modelPosition;

// Varying
vPosition = modelPosition.xyz;
vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
vNormal = modelNormal.xyz;
}