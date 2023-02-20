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
// const raycaster = new THREE.Raycaster();

// const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf)
// gridHelper.position.y = -1
// scene.add(gridHelper)

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
// function controls() {new OrbitControls(camera, renderer.domElement)};
// function orbitStart(){
//   if (window.scrollY < 800){
//   controls.diabled = true}
//   else{
//     controls.diabled = false
//   }
// }
// window.addEventListener("scroll", orbitStart);

var loader = new THREE.TextureLoader();
const monotexture = new THREE.MeshBasicMaterial ({map: loader.load("mono.png"), transparent:true});
const monogeo = new THREE.PlaneGeometry(2,3);
const mono = new THREE.Mesh(monogeo, monotexture);

scene.add(mono);


const textureCube1 = [
  new THREE.MeshStandardMaterial( { map: loader.load("1N.png") } ),
  new THREE.MeshStandardMaterial( { map: loader.load("2N.png") } ),
  new THREE.MeshStandardMaterial( { map: loader.load("3N.png") } ),
  new THREE.MeshStandardMaterial( { map: loader.load("4N.png") } ),
  new THREE.MeshStandardMaterial( { map: loader.load("5N.png") } ),
  new THREE.MeshStandardMaterial( { map: loader.load("6N.png") } ),
];
const textureCube2 = [
	new THREE.MeshStandardMaterial( { map: loader.load("1C.png") } ),
  new THREE.MeshStandardMaterial( { map: loader.load("2C.png") } ),
  new THREE.MeshStandardMaterial( { map: loader.load("3C.png") } ),
  new THREE.MeshStandardMaterial( { map: loader.load("4C.png") } ),
  new THREE.MeshStandardMaterial( { map: loader.load("5C.png") } ),
  new THREE.MeshStandardMaterial( { map: loader.load("6C.png") } ),

] ;

const cubegeometry = new THREE.BoxGeometry( 1, 1, 1 );

const cube1 = new THREE.Mesh( cubegeometry, textureCube1 );
const cube2 = new THREE.Mesh( cubegeometry, textureCube2 );
// cube1.position.x = -2
// cube2.position.x = 2

const lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
const linepoints = [];
linepoints.push( new THREE.Vector3( - 1, 0, 0 ) );
// linepoints.push( new THREE.Vector3( 0, 4, 0 ) );
linepoints.push( new THREE.Vector3( 1, 0, 0 ) );

const linegeometry = new THREE.BufferGeometry().setFromPoints( linepoints );
const line = new THREE.Line(linegeometry, lineMaterial)

// scene.add(line)
// scene.add(cube1, cube2 );

function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  // raycaster.setFromCamera(mousePosition, camera)
  // const intersects = raycaster.intersectObject(scene.children)
  // if ( intersects.length > 0 ) {
  //   for(let i = 0; i<intersects.lenght; i++){
  //     if (intersects[i].object.id === meshID){
  //       intersects[i].object.material.color.set(0xff0000)      
  //       }
  //   }
  // } else {
  //   if ( intersects[i].object ) intersects[i].object.material.emissive.setHex( INTERSECTED.currentHex );

  //   intersects[i].object = null;
  // }

  cube1.rotation.x += 0.01
  cube2.rotation.x -= 0.01
  cube1.rotation.y += 0.01
  cube2.rotation.y -= 0.01

  window.addEventListener( 'resize', onWindowResize )
}
animate();

// const openimgMaterial1 = new THREE.MeshLambertMaterial({
//   map: loader.load('./headnudePic.png'),
//   transparent: true
// });
// const openimgMaterial = new THREE.MeshLambertMaterial({
//   map: loader.load('./headPic.png'),
//   transparent: true
// });

// const imggeometry = new THREE.PlaneGeometry(19, 19);
// const openimg1 = new THREE.Mesh(imggeometry, openimgMaterial1);
// const openimg = new THREE.Mesh(imggeometry, openimgMaterial);
// openimg.position.z = -83
// openimg1.position.z = -82

// openimg.position.y = 20.25
// scene.add(openimg, openimg1);

function dissolveOpenImg(){
  if (window.scrollY < 500){
    openimg.position.y = 4.5
    openimg1.position.y = 4.5 + window.scrollY / 7.0
  } else {
    openimg.position.y = 250
    openimg1.position.y = 250
  }
}
window.addEventListener("scroll", dissolveOpenImg);

document.body.appendChild(renderer.domElement)





// const planeGeometry = new THREE.PlaneGeometry(2,2,2,10)
// const mesh = new THREE.Mesh(boxGeometry, material)
// const mesh1 = new THREE.Mesh(planeGeometry, material1)
// // const meshID = mesh.id;
const light = new THREE.DirectionalLight( 0xffffff, 1 );
// const backlight = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 0, 3 );

scene.add( light );
// backlight.position.set( 0, 0, -3 );

// const world = {
//   plane: {
//     width: 10,
//     height: 10,
//     widthSegments: 10,
//     heightSegments: 10,
//   }
// }
// .add(world.plane, 'width', 1, 10).onChange(generatePlane)
// gui.add(world.plane, 'height', 1, 10).onChange(generatePlane)
// gui.add(world.plane, 'widthSegments', 5, 10).onChange(generatePlane)
// gui.add(world.plane, 'heightSegments', 5, 10).onChange(generatePlane)

// function generatePlane() {
//   mesh1.geometry.dispose()
//   mesh1.geometry = new THREE.PlaneGeometry(
//     world.plane.width, 
//     world.plane.height,
//     world.plane.widthSegments, 
//     world.plane.heightSegments )
//   const { array } = mesh1.geometry.attributes.position
//   for (let i=0; i < array.length; i+= 3) {
//     const x = array[i]
//     const y = array[i + 1]
//     const z = array [i + 2]
//     array[i +2] = z + Math.random()
//   }
// }

// let geometry = new THREE.SphereGeometry( 15, 32, 16 )
// let materialp = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.05 })
// const meshp = new THREE.Points(geometry, materialp)

// scene.add(meshp)
var particles = 6777;
var geometry = new THREE.BufferGeometry();
var geometry1 = new THREE.BufferGeometry();
var geometry2 = new THREE.BufferGeometry();
var geometry3 = new THREE.BufferGeometry();
var geometry4 = new THREE.BufferGeometry();
var geometry5 = new THREE.BufferGeometry();

let positions = [];
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
// var colors = [];
// var color = new THREE.Color();
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
  // var vx = ( x / n ) + 0.5;
  // var vy = ( y / n ) + 0.5;
  // var vz = ( z / n ) + 0.5;
  // color.setRGB( 000, 000, 000 );
  // colors.push( color.r, color.g, color.b );

}
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

geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
geometry1.setAttribute( 'position', new THREE.Float32BufferAttribute( positions1, 3 ) );
geometry2.setAttribute( 'position', new THREE.Float32BufferAttribute( positions2, 3 ) );
geometry3.setAttribute( 'position', new THREE.Float32BufferAttribute( positions3, 3 ) );
geometry4.setAttribute( 'position', new THREE.Float32BufferAttribute( positions4, 3 ) );
geometry5.setAttribute( 'position', new THREE.Float32BufferAttribute( positions5, 3 ) );

// geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
geometry.computeBoundingSphere();
geometry1.computeBoundingSphere();
geometry2.computeBoundingSphere();
geometry3.computeBoundingSphere();
geometry4.computeBoundingSphere();
geometry5.computeBoundingSphere();
var materialpoints = new THREE.PointsMaterial( { color: 0xff0000, size: 0.3, vertexColors: false } );
var materialpointsred = new THREE.PointsMaterial( { color: 0xff0000, size: 0.3, vertexColors: false } );

// const materialpointscolor = ['']
const points = new THREE.Points( geometry, materialpoints );
const points1 = new THREE.Points( geometry1, materialpointsred );
const points2 = new THREE.Points( geometry2, materialpointsred );
const points3 = new THREE.Points( geometry3, materialpointsred );
const points4 = new THREE.Points( geometry4, materialpointsred );
const points5 = new THREE.Points( geometry5, materialpointsred );

// const gazetexture = new THREE.MeshStandardMaterial({map:loader.load("gaze.png"), transparent:true});
// const gazegeo = new THREE.PlaneGeometry(16, 16);
// const gaze = new THREE.Mesh(gazegeo,gazetexture);
// scene.add(gaze)
// points.position.z = -150 - window.scrollY / 150.0;
// points.position.y = 5;

// points1.position.z = 75 - window.scrollY / 40.0;
// points2.position.z = 75 - window.scrollY / 40.0;
// points3.position.z = 75 - window.scrollY / 40.0;
// points4.position.z = 75 - window.scrollY / 40.0;
// points5.position.z = 75 - window.scrollY / 40.0;

scene.add( points, points1, points2, points3, points4, points5 );

// mesh1.position.z = -1.5 + window.scrollY / 250.0;
function updatePoints(ev) {


  points1.position.z = 55 - window.scrollY / 26.0;
  points1.position.x = 5 - window.scrollY / 150.0;
  
  points2.position.z = 55 - window.scrollY / 26.0;
  points2.position.x = 5 - window.scrollY / 80.0
  // points2.position.y = 0 + window.scrollY / 250.0

  points3.position.z = 55 - window.scrollY / 26.0;
  points3.position.x = 0

  points4.position.z = 55 - window.scrollY / 26.0;
  points4.position.x = -5 + window.scrollY / 80.0

  points5.position.z = 55 - window.scrollY / 26.0;
  points5.position.x = -5 + window.scrollY / 150.0
}
// console.log(mesh1.position.z)

window.addEventListener("scroll", updatePoints);
// -50 is the perfect number
function dissolveContinentPoints(){
  if (points1.position.z  > -90){
    points1.position.y = 0;
    points2.position.y = 0;
    points3.position.y = 0;
    points4.position.y = 0;
    points5.position.y = 0;
    cube1.position.y = -20;
    cube2.position.y = -20;
    line.position.y = -20;

  } else {
    points1.position.y = 0 + window.scrollY / 5.0;    
    points2.position.y = 0 + window.scrollY / 5.0;
    points3.position.y = 0 + window.scrollY / 5.0;
    points4.position.y = 0 + window.scrollY / 5.0;
    points5.position.y = 0 + window.scrollY / 5.0;
    cube1.position.y = 0;
    cube2.position.y = 0;
    line.position.y = 0;


  }
}
window.addEventListener("scroll", dissolveContinentPoints);
function addMetPoints(){
  if (window.scrollY < 500){
    // gaze.position.z = -75+8;
    // gaze.position.y = -50 + window.scrollY / 10.0;
    points.position.y = -50 + window.scrollY / 10.0;
    points.position.z = -75
  }else {
    points.position.y = 0;
    // gaze.position.y = 0
    points.position.z = -125 + window.scrollY / 10.0;
    // gaze.position.z = -125 +8 + window.scrollY / 10.0;

  }
}
window.addEventListener("scroll", addMetPoints);






function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  // labelRenderer.setSize( window.innerWidth, window.innerHeight );
}

// labelRenderer = new CSS2DRenderer();
// 				labelRenderer.setSize( window.innerWidth, window.innerHeight );
// 				labelRenderer.domElement.style.position = 'absolute';
// 				labelRenderer.domElement.style.top = '0px';
// 				document.body.appendChild( labelRenderer.domElement );
//         console.log(labelRenderer)
