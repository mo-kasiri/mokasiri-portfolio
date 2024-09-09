uniform float uTime;
uniform vec3 uColor;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    // Normal
    vec3 normal = normalize(vNormal);
    if(!gl_FrontFacing)
    normal *= -1.0;
    // Stripes
    float stripes = mod((vPosition.y - uTime * 0.2) * 20.0, 1.0);
    stripes = pow(stripes, 3.0);

    // Frensel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel,3.0);

    // Falloff
    float falloff = smoothstep(0.8,0.0, fresnel);

    // Holographic
    float holographic = fresnel * stripes;
    holographic += fresnel * 1.25;
    holographic *= falloff;

    // Final Color
    gl_FragColor = vec4(uColor,holographic);
    //gl_FragColor = vec4(vNormal,1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}