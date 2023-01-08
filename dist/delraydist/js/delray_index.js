import * as THREE from 'https://unpkg.com/three@0.142.0/build/three.module.js';

import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js'

var scene, camera, renderer, controls, container;
const industrialObjects=[];
var industrialGroup = new THREE.Group();
var buttonGroup = new THREE.Group();


const buttonobjects =[];

function init() {

    scene = new THREE.Scene();
    // light = new THREE.AmbientLight( 0xffffff, 1 );
    // scene.background = new THREE.Color(0xffffff);
    const bgTexture = new THREE.TextureLoader().load('img/back.jpg');
    scene.background = bgTexture;
    // scene.add(light)

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    container = document.getElementById( 'three_container' );
    container.appendChild( renderer.domElement );
    // light.position.z=11
    // camera.position.y = 0;
    camera.position.z = 12;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.PAN,
        RIGHT: THREE.MOUSE.PAN
    }

    // controls.target.set(4.5, 0, 4.5);

    controls.enablePan = true;
    controls.enableRotate = false;
    controls.zoomSpeed  = 1;
    controls.maxDistance = 26;
    controls.minDistance = 1
    // controls.maxPolarAngle = Math.PI / 36;

    // controls.enableDamping = true;

    window.requestAnimationFrame(animate);
    addButton();
    add2scene()
};
function addButton(){
    var base_button_url= 'img/button';
    const x_size_button_list = [2,2.5,2.5, 6];
    const y_size_button_list = [16,2.7,2.7,10];
    for (let i = 1; i<4; i++){
        let buttonMap, buttonMaterial, buttonGeo, button;
        var buttonurl = base_button_url + i +'.png';
        buttonMap = new THREE.TextureLoader().load(buttonurl);
        buttonMaterial = new THREE.MeshBasicMaterial( { map: buttonMap, transparent: true, side: THREE.DoubleSide});
        buttonGeo = new THREE.PlaneGeometry(x_size_button_list[i-1],y_size_button_list[i-1])
        button =  new THREE.Mesh( buttonGeo,buttonMaterial );
        button.position.y=-12+5*Math.random();
        button.position.x=-17+8.5*i
        buttonobjects.push(button)
        buttonGroup.add(button)
    };
    scene.add(buttonGroup);
    let birdMap,birdGeo,birdMaterial,bird;
    birdMap = new THREE.TextureLoader().load('img/scene1.png');
    birdMaterial = new THREE.MeshBasicMaterial({map:birdMap,transparent:true});
    birdGeo = new THREE.PlaneGeometry(25,15);
    bird = new THREE.Mesh(birdGeo,birdMaterial)
    bird.position.y = -18;
    bird.position.z = -2;
    scene.add(bird);

    let schemeMap,schemeGeo,schemeMaterial,scheme;
    schemeMap = new THREE.TextureLoader().load('img/scheme.png');
    schemeMaterial = new THREE.MeshBasicMaterial({map:schemeMap,transparent:true});
    schemeGeo = new THREE.PlaneGeometry(25,15);
    scheme = new THREE.Mesh(schemeGeo,schemeMaterial)
    // scheme.position.y = -18;
    scheme.position.x = 25;
    scene.add(scheme);

};
function add2scene(){
    var base_url='img/cement-';
    const x_locationist = [-8,-5,-6,-8,-1,-6,-1.1, -1, -1,4.7,1.3,0,5.5,6.6,7.1];
    const y_locationist = [-6,-6,5,-4,4,-1,6,-2.5,-6, -3, 5.6,0,3.4,-5,3];
    const x_size_list = [3.3, 1.9, 5.1, 1.7, 1.9, 5.9, 2.4,2.4, 4.3, 2,4,9,4,9,9,]
    const y_size_list = [3.2, 2.7, 5.6, 1.7, 1.7, 3.7, 1.7, 2.5, 3.2, 2.3, 5.2, 8, 7.8, 7.5, 9.2]
    for (let i=1; i<16; i++){
        let annotationmaterial, annotationsprite, annotationmap, geo;
        var url = base_url + i +'.png';
        annotationmap = new THREE.TextureLoader().load(url);
        annotationmaterial = new THREE.MeshBasicMaterial( { map: annotationmap, transparent: true, side: THREE.DoubleSide, alphaTest: 0.1 });
        geo = new THREE.PlaneGeometry(x_size_list[i-1],y_size_list[i-1])
        annotationmaterial.transparent=true;
        // annotationmaterial.side = THREE.DoubleSide;
        annotationsprite =  new THREE.Mesh( geo,annotationmaterial );

        // annotationsprite.scale.set(x_size_list[i-1],y_size_list[i-1],1)
        annotationsprite.position.x = x_locationist[i-1];
        annotationsprite.position.y = -y_locationist[i-1];
        annotationsprite.position.z=Math.random();
        industrialGroup.add(annotationsprite)
        industrialObjects.push(annotationsprite)
    };
    scene.add(industrialGroup);
    // let chimMap,chimGeo,chimMaterial,chim;
    // chimMap = new THREE.TextureLoader().load('img/chim.png');
    // chimMaterial = new THREE.MeshBasicMaterial({map:chimMap,transparent:true});
    // chimGeo = new THREE.PlaneGeometry(7,2);
    // chim = new THREE.Mesh(chimGeo,chimMaterial)
    // chim.position.y = -6
    // scene.add(chim);
};

const raycaster = new THREE.Raycaster()

// var time = new THREE.Clock();
// var elapsedTime = time.getElapsedTime();
let intersects;
// : THREE.Intersection[]
let intersectedObject;
window.addEventListener('mousemove', onDocumentMouseMove, false)
function onDocumentMouseMove(event) {
    raycaster.setFromCamera(
        {
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        },
        camera
    );
    intersects = raycaster.intersectObjects(industrialObjects, false);
    if (intersects.length > 0) {
        intersectedObject = intersects[0].object
    } else {
        intersectedObject = null
    };
    intersectedObject.rotation.z += 0.005*Math.sin(1);

};

window.addEventListener('mousemove', onDocumentMouseMoveButton, false)
function onDocumentMouseMoveButton(event) {
    raycaster.setFromCamera(
        {
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        },
        camera
    );
    intersects = raycaster.intersectObjects(buttonobjects, false);
    if (intersects.length > 0) {
        intersectedObject = intersects[0].object
    } else {
        intersectedObject = null
    };
    intersectedObject.rotation.z += 0.05*Math.sin(1);

};

function animate() {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


window.addEventListener('resize', onWindowResize);

window.onload = init;
