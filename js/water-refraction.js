var camera,scene,renderer,mesh,torus,mouseX=0,mouseY=0,windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2,colors=["#00ffd0","#000000","#ffffff","#00ffd0","#000000"];function init(){(camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1e4)).position.z=-100,camera.position.y=-100;var e=textToTexture("Hola"),n=new THREE.CubeTextureLoader().load(e);n.mapping=THREE.CubeRefractionMapping,scene=new THREE.Scene;var t=new THREE.AmbientLight(16777215);scene.add(t);var i=new THREE.IcosahedronGeometry(20,1),o=new THREE.MeshPhongMaterial({envMap:n,refractionRatio:.95});mesh=new THREE.Mesh(i,o),scene.add(mesh);var r=textToTexture("data"),a=new THREE.CubeTextureLoader().load(r);a.mapping=THREE.CubeRefractionMapping;var s=new THREE.TorusGeometry(15,5,10,100),d=new THREE.MeshPhongMaterial({envMap:a,refractionRatio:.75});(torus=new THREE.Mesh(s,d)).position.x=65,torus.position.z=5,torus.position.y=35,scene.add(torus),(renderer=new THREE.WebGLRenderer({antialias:!0,alpha:!0})).setPixelRatio(window.devicePixelRatio),renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(renderer.domElement),document.addEventListener("mousemove",onDocumentMouseMove,!1),document.addEventListener("touchmove",onDocumentMouseMove,!1),window.addEventListener("resize",onWindowResize,!1)}function onWindowResize(){windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2,camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}function onDocumentMouseMove(e){e.touches&&(e=e.touches[0]),mouseX=(e.clientX-windowHalfX)/4,mouseY=(e.clientY-windowHalfY)/4}function animate(){requestAnimationFrame(animate),render()}function render(){camera.position.x+=(mouseX-camera.position.x)*.05,camera.position.y+=(-mouseY-camera.position.y)*.05,camera.lookAt(mesh.position),renderer.render(scene,camera)}function textToTexture(e){var n=document.createElement("canvas");n.width=4096,n.height=1024;var t=n.getContext("2d");t.font="50px Rubik Mono One,Helvetica ",t.fillStyle="#ffffff",t.fillRect(0,0,n.width,n.height);for(var i=t.measureText(e).width,o=0,r=0;r<n.height;r+=40){for(var a=0;a<n.width;a+=i){t.fillStyle=colors[Math.floor(Math.random()*colors.length)];var s=o%2==0?a:a-i/2;t.fillText(e,s,r)}o+=1}var d=function(e){var t=document.getElementById("text-canvas");return t.width=1024,t.height=1024,t.getContext("2d").drawImage(n,-1024*e,0),t.toDataURL()},$=[];return $.push(d(0)),$.push(d(1)),$.push(d(4)),$.push(d(4)),$.push(d(2)),$.push(d(3)),$}init(),animate();