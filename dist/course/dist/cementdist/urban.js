import * as THREE from 'https://unpkg.com/three@0.142.0/build/three.module.js';

import Stats from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/libs/stats.module.js';
// import { GUI } from './jsm/libs/lil-gui.module.min.js';
// import * as dat from 'node_modules/dat.gui';

// import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js'

import * as BufferGeometryUtils from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/utils/BufferGeometryUtils.js';

let container, stats, guiStatsEl;
// let gui
let camera, light, backlight, controls, scene, renderer, material;

// gui
// const gui = new dat.GUI()


const Method = {
    INSTANCED: 'INSTANCED',
    MERGED: 'MERGED',
    NAIVE: 'NAIVE'
};

const api = {
    method: Method.INSTANCED,
    count: 1000
};

//

init();
initmediaobj();
// initMesh();
animate();



function initmediaobj(){
    var loader = new THREE.TextureLoader();
    const plantlist = ["f1.png","f2.png","f3.png","f4.png","f5.png","f6.png","f7.png","f8.png","t1.png","t2.png", "t3.png", "t4.png", "t5.png", "t6.png"];
    // const plantgeometrylista = []
    const positionlistx=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    const positionlisty=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    const positionlistz=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];

    // for (let i=0; i<plantlist.length; i++){
    //     // let planttexture, plantgeometry, plant;
    //     var planttexture = new THREE.MeshBasicMaterial( { map: loader.load(plantlist[i]),
    //                                                     transparent: true } );
    //     var plantgeometry = new THREE.PlaneGeometry(2,2);
    //     var plant = new THREE.Mesh( planttexture, plantgeometry);
    //     plant.material.side = THREE.DoubleSide
    //     plant.position.x = positionlistx[i];
    //     plant.position.y = positionlisty[i];
    //     plant.position.z = positionlistz[i];

    //     scene.add(plant)
    // }

        
    var cmntexture = new THREE.MeshStandardMaterial( { map: loader.load(plantlist[2]),
                                                        transparent: true } );


    var cmngeometry = new THREE.PlaneGeometry( 1.61, 2.15);
    
    var r = 0.1


    const cmn = new THREE.Mesh( cmngeometry, cmntexture );
    
    
    cmn.material.side = THREE.DoubleSide
    

    cmn.position.x = 0
    cmn.position.z = 2

    cmn.rotation.y = Math.random()
    
    

    scene.add(cmn)
}

function init() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    // camera

    camera = new THREE.PerspectiveCamera( 50, width / height, 1, 100 );
    camera.position.z = 10;
    camera.position.y = 0;

    camera.position.x = 0;

    //light
    light = new THREE.AmbientLight( 0xffffff, 1 );
    // backlight = new THREE.DirectionalLight( 0xffffff, 1 );

    light.position.set( 0, 0, 10 ).normalize();
    // backlight.position.set( 0, 0, -10 ).normalize();

    // renderer

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    renderer.outputEncoding = THREE.sRGBEncoding;

    container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );

    // scene

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x0000ff );

    // controls

    controls = new OrbitControls( camera, renderer.domElement );
    // controls.autoRotate = true;

    // stats

    stats = new Stats();
    container.appendChild( stats.dom );


    scene.add(light)

    // gui

    // gui = new GUI();
    // gui.add( api, 'method', Method ).onChange( initMesh );
    // gui.add( api, 'count', 1, 10000 ).step( 1 ).onChange( initMesh );

    // const perfFolder = gui.addFolder( 'Performance' );

    // guiStatsEl = document.createElement( 'div' );
    // guiStatsEl.classList.add( 'gui-stats' );

    // perfFolder.$children.appendChild( guiStatsEl );
    // perfFolder.open();

    // listeners

    window.addEventListener( 'resize', onWindowResize );

    Object.assign( window, { scene } );

}

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
    stats.update();

    render();

}

function render() {

    renderer.render( scene, camera );

}

//

function getGeometryByteLength( geometry ) {

    let total = 0;

    if ( geometry.index ) total += geometry.index.array.byteLength;

    for ( const name in geometry.attributes ) {

        total += geometry.attributes[ name ].array.byteLength;

    }

    return total;

}

// Source: https://stackoverflow.com/a/18650828/1314762
function formatBytes( bytes, decimals ) {

    if ( bytes === 0 ) return '0 bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [ 'bytes', 'KB', 'MB' ];

    const i = Math.floor( Math.log( bytes ) / Math.log( k ) );

    return parseFloat( ( bytes / Math.pow( k, i ) ).toFixed( dm ) ) + ' ' + sizes[ i ];

}