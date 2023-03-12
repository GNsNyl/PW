#ifdef GL_ES
precision mediump float;
#endif

// Define constant values
#define TAU 6.2831853071
#define PI 3.1415926

#define a0 0.523


// Define uniforms that can be passed to this shader.
// We will use 'book of shaders' naming convention.
uniform vec2 u_resolution;
//uniform vec2 u_t6;
uniform float tx6;
uniform float ty6;

//uniform vec2 u_mouse;
uniform float u_time;

// Smooth HSV to RGB conversion
vec3 hsv2rgb_smooth( in vec3 c )
{
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb); // cubic smoothing
    return c.z * mix( vec3(1.0), rgb, c.y);
}
// 2D gradient
void main() {

    float ad=atan((gl_FragCoord.y-910.0)/(gl_FragCoord.x-500.0));
    float ag=ad*2.0*PI;
    vec3 hsv = hsv2rgb_smooth(vec3(ag+u_time, 1, 1));

    // Assign a vec4 value to gl_FragColor
    gl_FragColor = vec4(hsv, 1.);


}
