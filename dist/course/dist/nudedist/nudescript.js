// import * as THREE from 'https://unpkg.com/three@0.142.0/build/three.module.js';
// import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js'
// import { CSS2DRenderer, CSS2DObject } from 'https://github.com/mrdoob/three.js/blob/master/examples/jsm/renderers/CSS2DRenderer.js';
// import * as dat from 'dat.gui';
// import * as THREE from 'three';

// let labelRenderer;
// importmap{
//   "imports": {
//       "folder": 'dist/nudedist'
//   }
// }

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
// const gui = new dat.GUI()

const mousePosition = new THREE.Vector2()
window.addEventListener('mousemove', function(e){
  mousePosition.x = (e.clientX / innerWidth) *2 - 1
  mousePosition.y = -(e.clientY / innerHeight) *2 + 1
});

const camera = new THREE.
  PerspectiveCamera(
    75,
    innerWidth / innerHeight, 
    0.1, 
    1000)
const renderer = new THREE.WebGLRenderer()
camera.position.z = 5
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)

var loader = new THREE.TextureLoader();
const monotexture = new THREE.MeshBasicMaterial ({map: loader.load("mono.png"), transparent:true});
const monogeo = new THREE.PlaneGeometry(2,3);
const mono = new THREE.Mesh(monogeo, monotexture);

scene.add(mono);




function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)

  window.addEventListener( 'resize', onWindowResize )
}
animate();



document.body.appendChild(renderer.domElement)


const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 0, 3 );

scene.add( light );

var particles = 6777;
var geometry1 = new THREE.BufferGeometry();
var geometry2 = new THREE.BufferGeometry();
var geometry3 = new THREE.BufferGeometry();
var geometry4 = new THREE.BufferGeometry();
var geometry5 = new THREE.BufferGeometry();

let positions = [];
let imaterial = [];
let positions1 = [];
let positions2 = [];
let positions3 = [];
let positions4 = [];
let positions5 = [];

var particlesAFRICA1 = 209;
var particlesEURO2 = 3937;
var particlesASIA3 = 109
var particlesNORTHAMERICA4 = 1792
var particlesSOUTHAMERICA5 = 16

var n = 16, n2 = n / 2;
var n11 =7, n12= n11 / 2;
var n21 =10, n22= n21 / 2;
var n31 =6, n32= n31 / 2;
var n41 =8, n42= n41 / 2;
var n51 =5, n52= n51 / 2;
for ( var i = 0; i < particles; i ++ ) {
  var x = Math.random() * n - n2;
  var y = Math.random() * n - n2;
  var z = Math.random() * n - n2;
  positions.push( x, y, z );

}
for ( var i = 0; i < 217; i ++ ) {
  var qmaterial = loader.load( 'resize/'+i+'.jpg' );
  var ematerial= new THREE.PointsMaterial( {size:0.3, map: qmaterial, } );
  imaterial.push(ematerial);
};
// console.log(imaterial.length)
for ( var i1 = 0; i1 < particlesAFRICA1; i1 ++ ) {

  var x1 = Math.random() * n11 - n12;
  var y1 = Math.random() * n11 - n12;
  var z1 = Math.random() * n11 - n12;

  positions1.push( x1, y1, z1 );}
for ( var i2 = 0; i2 < particlesEURO2; i2 ++ ) {
  var x2 = Math.random() * n21 - n22;
  var y2 = Math.random() * n21 - n22;
  var z2 = Math.random() * n21 - n22;

  positions2.push( x2, y2, z2 );}
for ( var i3 = 0; i3 < particlesASIA3; i3 ++ ) {
  var x3 = Math.random() * n31 - n32;
  var y3 = Math.random() * n31 - n32;
  var z3 = Math.random() * n31 - n32;

  positions3.push( x3, y3, z3 );}  
for ( var i3 = 0; i3 < particlesNORTHAMERICA4; i3 ++ ) {
  var x4 = Math.random() * n41 - n42;
  var y4 = Math.random() * n41 - n42;
  var z4 = Math.random() * n41 - n42;

  positions4.push( x4, y4, z4 );} 

for ( var i3 = 0; i3 < particlesSOUTHAMERICA5; i3 ++ ) {
  var x5 = Math.random() * n51 - n52;
  var y5 = Math.random() * n51 - n52;
  var z5 = Math.random() * n51 - n52;

  positions5.push( x5, y5, z5 );} 

geometry1.setAttribute( 'position', new THREE.Float32BufferAttribute( positions1, 3 ) );
geometry2.setAttribute( 'position', new THREE.Float32BufferAttribute( positions2, 3 ) );
geometry3.setAttribute( 'position', new THREE.Float32BufferAttribute( positions3, 3 ) );
geometry4.setAttribute( 'position', new THREE.Float32BufferAttribute( positions4, 3 ) );
geometry5.setAttribute( 'position', new THREE.Float32BufferAttribute( positions5, 3 ) );
// console.log(geometry)
geometry1.computeBoundingSphere();
geometry2.computeBoundingSphere();
geometry3.computeBoundingSphere();
geometry4.computeBoundingSphere();
geometry5.computeBoundingSphere();
// var materialpoints = new THREE.PointsMaterial( { color: 0xff0000, size: 0.3, vertexColors: false } );
// var qmaterial = textureLoader.load( 'resize/2.jpg' );
// var ematerial= new THREE.PointsMaterial( {size:0.3, map: qmaterial,blending: THREE.AdditiveBlending, depthTest: false, } );

var materialpointsred = new THREE.PointsMaterial( { color: 0xff0000, size: 0.3, vertexColors: false } );

const points1 = new THREE.Points( geometry1, materialpointsred );
const points2 = new THREE.Points( geometry2, materialpointsred );
const points3 = new THREE.Points( geometry3, materialpointsred );
const points4 = new THREE.Points( geometry4, materialpointsred );
const points5 = new THREE.Points( geometry5, materialpointsred );

let points=[];
const materials = [];
let count=0
for ( let i = 0; i < 217; i ++ ) {
  var geometry = new THREE.BufferGeometry();

  var sprite = loader.load( 'resize/'+i+'.jpg' );
  var material= new THREE.PointsMaterial( { size: 0.3, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: false } );
  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions.slice(count, count+31), 3 ) );
  geometry.computeBoundingSphere();

  var particle = new THREE.Points( geometry, imaterial[i] );
  count=count+31;
  points.push(particle)
  scene.add( particle );


}
// points.material=ematerial;
// console.log(points)
scene.add( points1, points2, points3, points4, points5 );

function updatePoints(ev) {

  points1.position.z = 55 - window.scrollY / 26.0;
  points1.position.x = 5 - window.scrollY / 150.0;
  
  points2.position.z = 55 - window.scrollY / 26.0;
  points2.position.x = 5 - window.scrollY / 80.0

  points3.position.z = 55 - window.scrollY / 26.0;
  points3.position.x = 0

  points4.position.z = 55 - window.scrollY / 26.0;
  points4.position.x = -5 + window.scrollY / 80.0

  points5.position.z = 55 - window.scrollY / 26.0;
  points5.position.x = -5 + window.scrollY / 150.0
}

window.addEventListener("scroll", updatePoints);
// -50 is the perfect number
function dissolveContinentPoints(){
  if (points1.position.z  > -90){
    points1.position.y = 0;
    points2.position.y = 0;
    points3.position.y = 0;
    points4.position.y = 0;
    points5.position.y = 0;
    // cube1.position.y = -20;
    // cube2.position.y = -20;
    // line.position.y = -20;
  } else {
    points1.position.y = 0 + window.scrollY / 5.0;    
    points2.position.y = 0 + window.scrollY / 5.0;
    points3.position.y = 0 + window.scrollY / 5.0;
    points4.position.y = 0 + window.scrollY / 5.0;
    points5.position.y = 0 + window.scrollY / 5.0;
    // cube1.position.y = 0;
    // cube2.position.y = 0;
    // line.position.y = 0;
  }
}
window.addEventListener("scroll", dissolveContinentPoints);
function addMetPoints(){
  if (window.scrollY < 500){
    for(let i=0;i<points.length;i++){
      points[i].position.y = -50 + window.scrollY / 10.0;
      points[i].position.z = -75
    }
  }else {
    for(let i=0;i<points.length;i++) {
      points[i].position.y = 0;
      points[i].position.z = -125 + window.scrollY / 10.0;
    }
  }
}
window.addEventListener("scroll", addMetPoints);






function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

