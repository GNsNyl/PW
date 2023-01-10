import Stats from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js'

let container;
// let gui
let camera, light, controls, scene, renderer;

let ambientLight;


const loader = new THREE.TextureLoader();
var time = new THREE.Clock();
const objects=[];
const annotations=[];
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

init();
initmediaobj();
animate();

function onPointerDown( event ) {

    pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

    raycaster.setFromCamera( pointer, camera );

    const intersects = raycaster.intersectObjects( objects, false );
    if ( intersects.length > 0 ) {
        const intersect = intersects[ 0 ];
        for (let a = 0; a<objects.length; a++){
            if (objects[a]===intersect.object) {
                bubblegroup.add(annotations[a])
            }
            else{
                bubblegroup.remove(annotations[a])

            }
        }
    }
};
window.addEventListener( 'pointerdown', onPointerDown );

function initmediaobj(){
    var base_url='img/'
    const medialist = ["mushroom1.png","mushroom2.png","mushroom3.png", ];

    for (let i=0; i<medialist.length; i++){
        let annotationmaterial, annotationsprite, annotationmap;
        var url = base_url +medialist[i];
        annotationmap = new THREE.TextureLoader().load(url);
        annotationmaterial = new THREE.SpriteMaterial( { map: annotationmap } );
        annotationmaterial.side = THREE.DoubleSide;
        annotationsprite =  new THREE.Sprite( annotationmaterial );
        annotationsprite.position.x = -5+4.2*i
        annotationsprite.position.y = -2+Math.random()*5
        scene.add(annotationsprite)
        };
}
//
// function bubbleanimate(bubble,i) {
//     const elapsedTime = time.getElapsedTime();
//     const elapsedTimeInMs = Math.round(elapsedTime * 1000);
//
//     const radius = 3;
//     const speed = 0.008;
//     const heightAngle = (i+1)*elapsedTime * speed + i/2;
//     const thetaAngle = (i+1)* elapsedTime * -speed + i/2;
//
//     bubble.position.x = radius * Math.cos(thetaAngle) + i-4;
//     bubble.position.y = radius * Math.sin(thetaAngle) + i-4;
//     bubble.position.z = radius * Math.cos(heightAngle);
//
//     annotationsprite.position.copy(bubble.position)
//     annotationsprite.position.z = annotationsprite.position.z+1.5;
//     annotationsprite.position.y = annotationsprite.position.y+0.5;
//     annotationsprite.position.x = annotationsprite.position.x+0.5;
//     requestAnimationFrame( bubbleanimate );
//     controls.update();
//     render();}

function init() {

const width = window.innerWidth;
const height = window.innerHeight;

// camera

camera = new THREE.PerspectiveCamera( 50, width / height, 1, 100 );
camera.position.z = 15;

//light
light = new THREE.AmbientLight( 0xffffff, 1 );

light.position.set( 0, 0, 10 ).normalize();

// renderer
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
renderer.outputEncoding = THREE.sRGBEncoding;

container = document.getElementById( 'three_container' );
container.appendChild( renderer.domElement );

// scene

scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
scene.fog = new THREE.Fog(0x00aaff, 1000, 10000);


// controls


controls = new OrbitControls( camera, renderer.domElement );

controls.mouseButtons = {
    RIGHT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    LEFT: THREE.MOUSE.PAN
};
controls.enableRotate = false;
// controls.autoRotate = true;
controls.maxDistance = 10;
controls.minDistance = 1;


// stats

// stats = new Stats();
// container.appendChild( stats.dom );


scene.add(light)

window.addEventListener( 'resize', onWindowResize );

Object.assign( window, { scene } );

}


addsunlight()
function addsunlight() {

    ambientLight = new THREE.AmbientLight(0x3f2806);
    scene.add(ambientLight);
};



//

function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

}

function animate() {

    requestAnimationFrame( animate );

    controls.update();
    // stats.update();

    render();
}

function render() {

renderer.render( scene, camera );

}

//
