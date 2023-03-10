
let scene;
scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

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


const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 0, 3 );

scene.add( light );

initscene();

function initscene(){
    const group=new THREE.Group()
    group.position.y=0
    var loader = new THREE.TextureLoader();
// map: loader.load("/img/1.png")
    const monotexture = new THREE.MeshBasicMaterial ({map: loader.load("img/1.png"), transparent:true});
    const monogeo = new THREE.PlaneGeometry(3.12,5);
    const mono = new THREE.Mesh(monogeo, monotexture);
    mono.position.z=-10
    mono.position.x=10
    // scene.add(mono);
    group.add(mono)


    li=["img/before_pick.png","img/mush_more.png","img/bow.png","img/mush_less.png","img/after_pick.png","img/cal.png"]
    for(let i=0; i<li.length; i++){
        let texture,geo,img;
        texture = new THREE.MeshBasicMaterial ({map: loader.load(li[i]), transparent:true});
        geo = new THREE.PlaneGeometry(5,5);
        img=new THREE.Mesh(geo, texture);
        img.position.x=10
        img.position.y=-i-5
        function dissolveImg(){
            if (window.scrollY > 0){
                if (window.scrollY / 14.0 < 70+20*i){
                    img.position.z = 20 +20*i - window.scrollY / 14.0
                    if(img.position.z >=0){
                        img.position.y = 10 -7*i+ (window.scrollY/14-70-20*i)/60
                    }
                    else{
                        img.position.y = 10 -7*i
                    }
                }
                else{
                    img.position.z = -50
                    img.position.y = 10 -7*i+2.5/3
                }
            } else {
              img.position.z = 20 +20*i
            }
          }
          window.addEventListener("scroll", dissolveImg);
        group.add(img)
        // scene.add(img)
    }
    scene.add(group)
    function dissolvegroup(){
        if (window.scrollY/7 > 350){
            group.position.y = 0+(window.scrollY-350*7)/6
        }else{
            group.position.y = 0
        }
    }
    window.addEventListener("scroll", dissolvegroup);

    // const beforetexture = new THREE.MeshBasicMaterial ({map: loader.load("img/before_pick.png"), transparent:true});
    // const mushgeo = new THREE.PlaneGeometry(3.12,5);
    // const before = new THREE.Mesh(mushgeo, beforetexture);
    // before.position.z= -10
    // before.position.x=10

    
    function dissolveOpenImg(){
        if (window.scrollY > 0){
            if (window.scrollY / 7.0 < 40){
                mono.position.z = -10 - window.scrollY / 7.0
                mono.position.y = 0 + window.scrollY / 9.0}
            else{
                mono.position.z = -50
                mono.position.y = 31.1111
            }
        } else {
          mono.position.z = -10
          mono.position.y = 0
        }
      }
      window.addEventListener("scroll", dissolveOpenImg);

}


    




function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  window.addEventListener( 'resize', onWindowResize )
}
animate();



document.body.appendChild(renderer.domElement)





function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight )}