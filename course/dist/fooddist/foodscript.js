function App() {
  const conf = {
    el: 'canvas',
    fov: 75,
    cameraZ: -100,
    cameraX:800,
    cameraY:800,
    background: 0x0000ff,
  };

  let renderer, scene, camera, cameraCtrl;
  let width, height, cx, cy, wWidth, wHeight;
  const { randFloat: rnd, randFloatSpread: rndFS } = THREE.Math;

  let ripple;
  let gridWWidth, gridWHeight, gridWidth, gridHeight;

  const mouse = new THREE.Vector2();
  const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mousePosition = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  let mouseOver = false;

  init();
  initmediaobj();
  function initmediaobj(){
    const light = new THREE.AmbientLight(0xffffff,1)
    const dirlight = new THREE.DirectionalLight(0xffffff,0.5)
    dirlight.position.z = 100;
    light.position.z = 50

    scene.add(light, dirlight)

    var loader = new THREE.TextureLoader();
    emojilist=["gout2.png", "healthy3.png","highGI2.png", "Hypertension2.png", "healthy3.png","highGI2.png", "Hypertension2.png"];
    emojipositionz=[0, 30, 45, -60]
    emojipositionx=[-30,30,0,60, 120, -20, -90]
    emojipositiony=[60, -45, 20, -75, 30, 0,60, 45,]
    for (let i=0; i<20; i++) {
      let emojigeometry, emojitexture, emojimaterial, emojis;
      emojimaterial = new THREE.MeshBasicMaterial( { map: loader.load(emojilist[i]) } );
       emojigeometry = new THREE.SphereGeometry(5, 32, 15 );
      //  emojimaterial = new THREE.MeshStandardMaterial({map: emojitexture})
       emojis = new THREE.Mesh(emojigeometry, emojimaterial)
      //  emojis.position.z = emojipositionz[i];
       emojis.position.x = emojipositionx[i];
       emojis.position.y = emojipositiony[i];
       emojis.rotation.y = -0.5*Math.PI


       scene.add(emojis)
    }

   
    
    // colorlist=[
    //   0xfe4741, 0xffb1b1, 0x00abfd, 0xffff00];
    colorlist=[
      0xffff00, 0xffff00, 0xffff00, 0xffff00];
    pancakepositionx = [40, 75, -50, -90];
    pancakepositiony = [16, 0, 35, -50];
    pancakepositionz = [1, 1, 1, 1];
    imagelist=["pancakes.jpeg", "ramen.jpeg", "banana.png", "cucumber.jpeg"];
    plateradius = [15, 20, 25, 45]
    distancelist = [55,25,30,25]
    
   for (let i=0; i<imagelist.length; i++) {
    let cmntexture, cmngeometry, pancake, plategeometry, material, plate, conegeometry, conematerial, cone
    cmntexture = new THREE.MeshStandardMaterial( { map: loader.load(imagelist[i]) } );
    cmngeometry = new THREE.CircleGeometry(0.67*plateradius[i], 25);
    pancake = new THREE.Mesh( cmngeometry, cmntexture );
    pancake.position.z = pancakepositionz[i]+1.1;
    pancake.position.x = pancakepositionx[i];
    pancake.position.y = pancakepositiony[i];
    plategeometry = new THREE.CylinderGeometry( plateradius[i], plateradius[i], 2, 32 );
    // material = new THREE.MeshBasicMaterial( {color: colorlist[i]} );
    material = new THREE.PointsMaterial( {color: 0x00ff00} );

    plate = new THREE.Points( plategeometry, material );

    plate.rotation.x = (Math.PI)/2
    plate.position.z = pancakepositionz[i];
    plate.position.x = pancakepositionx[i];
    plate.position.y = pancakepositiony[i];

    scene.add( plate, pancake);

    conegeometry = new THREE.ConeGeometry( 0.67*plateradius[i], distancelist[i]-1, 3 );
    
    // conematerial = new THREE.MeshPhongMaterial( { color: colorlist[i], opacity: 0.2, transparent: true, } );

    conematerial = new THREE.MeshStandardMaterial( { color: 0x00ff00, wireframe: true,  } );

    cone = new THREE.Mesh (conegeometry, conematerial);

    cone.position.z=pancakepositionz[i] + distancelist[i]/2;
    cone.position.y=pancakepositiony[i];
    cone.position.x=pancakepositionx[i];
    cone.rotation.x=Math.PI/2

    scene.add(cone)

   };

    const video = document.getElementById( 'video' );
    video.src = "o1_AdobeExpress1.mp4";
    video.load();
    video.play();

    const video2 = document.getElementById( 'video2' );
    video2.src = "v1.mp4";
    video2.load();
    video2.play();

    const video3 = document.getElementById( 'video3' );
    video3.src = "v2.mp4";
    video3.load();
    video3.play();

    const plane = new THREE.PlaneGeometry(12,15);

    const texture = new THREE.VideoTexture( video );
    const screenmaterial = new THREE.MeshBasicMaterial({map: texture})
    const phonescreen =  new THREE.Mesh(plane, screenmaterial);
    const bubbletexture = new THREE.MeshBasicMaterial({map: loader.load("textbubble.png"), transparent: true});
    const bubblegeo = new THREE.PlaneGeometry(21, 19);
    const bubble = new THREE.Mesh(bubblegeo, bubbletexture);
    bubble.material.side = THREE.DoubleSide

    const instatexture = new THREE.MeshBasicMaterial({map: loader.load("insta.png"), transparent: true});
    const instageo = new THREE.PlaneGeometry(18, 18);
    const insta = new THREE.Mesh(instageo, instatexture)
    insta.material.side = THREE.DoubleSide

    const ceftexture = new THREE.MeshBasicMaterial({map: loader.load("cef.png"), transparent: true});
    const cefgeo = new THREE.PlaneGeometry(59.8, 9.88);
    const cef = new THREE.Mesh(cefgeo, ceftexture)

    const textexture = new THREE.MeshBasicMaterial({map: loader.load("tex.png"), transparent: true});
    const texgeo = new THREE.PlaneGeometry(40, 6);
    const tex = new THREE.Mesh(texgeo, textexture)


    const mlexture = new THREE.MeshBasicMaterial({map: loader.load("ml.png"), transparent: true});
    const mlgeo = new THREE.PlaneGeometry(31.2, 9.6);
    const ml = new THREE.Mesh(mlgeo, mlexture)
    ml.material.side = THREE.DoubleSide

    const fdxture = new THREE.MeshBasicMaterial({map: loader.load("fd.png"), transparent: true});
    const fdgeo = new THREE.PlaneGeometry(22, 13);
    const fd = new THREE.Mesh(fdgeo, fdxture);
    fd.material.side = THREE.DoubleSide

    const curture = new THREE.MeshBasicMaterial({map: loader.load("techback.png"), transparent: true});
    const curgeo = new THREE.PlaneGeometry(20, 22);
    const cur = new THREE.Mesh(curgeo, curture)
    cur.material.side = THREE.DoubleSide

    const yolobxture = new THREE.MeshBasicMaterial({map: loader.load("yoloa.png"), transparent: true});
    const yolobgeo = new THREE.PlaneGeometry(259.2, 112.4);
    const yolob = new THREE.Mesh(yolobgeo, yolobxture);

    const kindbxture = new THREE.MeshBasicMaterial({map: loader.load("kinds.png"), transparent: true});
    const kindbgeo = new THREE.PlaneGeometry(63.2, 72.4);
    const kind = new THREE.Mesh(kindbgeo, kindbxture);

    const userbxture = new THREE.MeshBasicMaterial({map: loader.load("user.png"), transparent: true});
    const usergeo = new THREE.PlaneGeometry(50.2, 16.4);
    const user = new THREE.Mesh(usergeo, userbxture);

    const texture2 = new THREE.VideoTexture( video2 );
    const screenmaterial2 = new THREE.MeshBasicMaterial({map: texture2})
    const phonescreen2 =  new THREE.Mesh(plane, screenmaterial2);

    const texture3 = new THREE.VideoTexture( video3 );
    const screenmaterial3 = new THREE.MeshBasicMaterial({map: texture3})
    const phonescreen3 =  new THREE.Mesh(plane, screenmaterial3);

    const phonematerial =new THREE.MeshBasicMaterial ({color: 0x00ffff})
    const phonegeometry = new THREE.BoxGeometry(15,18,1)
    const phone = new THREE.Mesh( phonegeometry, phonematerial );

    const phone2 = new THREE.Mesh( phonegeometry, phonematerial );
    const phone3 = new THREE.Mesh( phonegeometry, phonematerial );

    bubble.position.z =  pancakepositionz[0]+distancelist[0]-1.001;
    bubble.position.x = pancakepositionx[0] + 15;
    bubble.position.y = pancakepositiony[0] + 15;


    insta.position.z =  pancakepositionz[2]+distancelist[2]-1.001;
    insta.position.x = pancakepositionx[2] + 15;
    insta.position.y = pancakepositiony[2] + 15;

    cef.position.z =  0;
    cef.position.x = 45;
    cef.position.y = -55;
    cef.rotation.z= 0.15*Math.PI;

    tex.position.z =  0;
    tex.position.x = -25;
    tex.position.y = 15;
    tex.rotation.z= 0;

    ml.position.z =  0;
    ml.position.x = 25;
    ml.position.y = 55;
    ml.rotation.z= -0.1*Math.PI;
    
    fd.position.z =  0;
    fd.position.x = -75;
    fd.position.y = -15;
    fd.rotation.z= -0.2*Math.PI;

    cur.position.z =  0;
    cur.position.x = 45;
    cur.position.y = 65;
    cur.rotation.z= -0.2*Math.PI;

    yolob.position.z =  -1;
    yolob.position.x = 0;
    yolob.position.y = 0;
    yolob.rotation.y= Math.PI;

    kind.position.z =  0;
    kind.position.x = -20;
    kind.position.y = -40;

    user.position.z =  0;
    user.position.x = -100;
    user.position.y = 40;
    // yolob.rotation.y= Math.PI;

    phone.position.z = pancakepositionz[0]+distancelist[0]-1.001
    phone.position.x = pancakepositionx[0]
    phone.position.y = pancakepositiony[0]
    phonescreen.position.z = pancakepositionz[0]+distancelist[0]
    phonescreen.position.x = pancakepositionx[0]
    phonescreen.position.y = pancakepositiony[0]

    phone2.position.z = pancakepositionz[1]+distancelist[1]-1.01
    phone2.position.x = pancakepositionx[1]
    phone2.position.y = pancakepositiony[1]
    phone3.position.z = pancakepositionz[2]+distancelist[2]-1.01
    phone3.position.x = pancakepositionx[2]
    phone3.position.y = pancakepositiony[2]
    phonescreen2.position.z = pancakepositionz[1]+distancelist[1]
    phonescreen2.position.x = pancakepositionx[1]
    phonescreen2.position.y = pancakepositiony[1]
    phonescreen3.position.z = pancakepositionz[2]+distancelist[2]
    phonescreen3.position.x = pancakepositionx[2]
    phonescreen3.position.y = pancakepositiony[2]



    scene.add( user, kind, yolob, cur, fd, ml, tex, cef, insta, bubble, phone, phonescreen, phone2, phonescreen2, phone3, phonescreen3 );
  }

  /////////////////////////////////////////
  
  
  // var boxes = [];
  // for (let y = 0; y < map404.length; y++) {
  //   for (let x = 0; x < map404[0].length; x++) {
  //     if (map404[y][x] === 0) continue;
  //     let roundedBox = new THREE.Mesh(roundedBoxGeometry, roundedBoxMaterial.clone());

  // var phonematerial = [
  //       new THREE.MeshStandardMaterial( { map: loader.load("assets/1C.png") } ),
  //       new THREE.MeshStandardMaterial( { map: loader.load("assets/2C.png") } ),
  //       new THREE.MeshStandardMaterial( { map: loader.load("assets/3C.png") } ),
  //       new THREE.MeshStandardMaterial( { map: loader.load("assets/4C.png") } ),
  //       new THREE.MeshStandardMaterial( { map: loader.load("assets/5C.png") } ),
  //       new THREE.MeshStandardMaterial( { map: loader.load("assets/6C.png") } ),
  //   ] ;
  

/////////////////////////////////////////
  function init() {
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(conf.el), antialias: true });
  

    camera = new THREE.PerspectiveCamera(conf.fov);
    camera.position.z = conf.cameraZ;
    camera.position.x = conf.cameraX;
    camera.position.y = conf.cameraY;

    updateSize();
    window.addEventListener('resize', updateSize, false);

    gridWWidth = wWidth;
    gridWHeight = wHeight;
    gridWidth = gridWWidth * width / wWidth;
    gridHeight = gridWHeight * height / wHeight;
    ripple = new RippleEffect(renderer, gridWidth, gridHeight);

    const getGridMP = function (e) {
      const v = new THREE.Vector3();
      camera.getWorldDirection(v);
      v.normalize();
      mouse.x = (e.clientX / width) * 2 - 1;
      mouse.y = -(e.clientY / height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(mousePlane, mousePosition);
      return { x: 2 * mousePosition.x / gridWWidth, y: 2 * mousePosition.y / gridWHeight };
    };

    renderer.domElement.addEventListener('mouseleave', e => { mouseOver = false; });
    renderer.domElement.addEventListener('mousemove', e => {
      mouseOver = true;
      const gp = getGridMP(e);
      ripple.addDrop(gp.x, gp.y, 0.05, 0.1);
    });

    renderer.domElement.addEventListener('mouseup', e => {
      const gp = getGridMP(e);
      ripple.addDrop(gp.x, gp.y, 0.1, -1.5);
    });

    initScene();
    animate();
  }

  function initScene() {
    scene = new THREE.Scene();
    if (conf.background) scene.background = new THREE.Color(conf.background);

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff, side: THREE.DoubleSide, onBeforeCompile: shader => {
        shader.uniforms.hmap = { value: ripple.hMap.texture };
        shader.vertexShader = "uniform sampler2D hmap;\n" + shader.vertexShader;
        const token = '#include <begin_vertex>';
        const customTransform = `
          vec3 transformed = vec3(position);
          vec4 info = texture2D(hmap, uv);
          transformed.z = -20. * info.r;
        `;
        shader.vertexShader = shader.vertexShader.replace(token, customTransform);
      }
    });

    const pSize = 0.1;
    let nx = Math.round(gridWidth / 5), ny = Math.round(gridHeight / 50);
    let dy = gridWHeight / ny;
    for (let j = 0; j <= ny; j++) {
      const geometry = new THREE.PlaneBufferGeometry(gridWWidth, pSize, nx, 1);
      geometry.translate(0, - gridWHeight / 2 + j * dy, 0);
      const uvH = pSize / gridWHeight;
      const uvY = j / ny;
      const uvs = geometry.attributes.uv.array;
      for (let i = 0; i < uvs.length; i += 2) {
        uvs[i + 1] = (uvs[i + 1] == 0) ? uvY - uvH : uvY + uvH;
      }
      scene.add(new THREE.Mesh(geometry, material));
    }

    nx = Math.round(gridWidth / 50); ny = Math.round(gridHeight / 5);
    let dx = gridWWidth / nx;
    for (let i = 0; i <= nx; i++) {
      const geometry = new THREE.PlaneBufferGeometry(pSize, gridWHeight, 1, ny);
      geometry.translate(- gridWWidth / 2 + i * dx, 0, 0);
      const uvW = pSize / gridWWidth;
      const uvX = i / nx;
      const uvs = geometry.attributes.uv.array;
      for (let i = 0; i < uvs.length; i += 2) {
        uvs[i] = (uvs[i] == 0) ? uvX - uvW : uvX + uvW;
      }
      scene.add(new THREE.Mesh(geometry, material));
    }

    camera.position.set(0, -gridWHeight/1.6, 40);
    camera.lookAt(new THREE.Vector3(0, -gridWHeight/6, 0));

    cameraCtrl = new THREE.OrbitControls(camera, renderer.domElement);
    cameraCtrl.enableDamping = true;
    cameraCtrl.dampingFactor = 0.1;
    cameraCtrl.rotateSpeed = 0.5;
  }

  function animate() {
    if (!mouseOver) {
      const time = Date.now() * 0.001;
      const x = Math.cos(time) * 0.4;
      const y = Math.sin(time) * 0.4;
      ripple.addDrop(x, y, 0.05, -0.05);
    }

    ripple.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  function updateSize() {
    width = window.innerWidth; cx = width / 2;
    height = window.innerHeight; cy = height / 2;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const wsize = getRendererSize();
    wWidth = wsize[0]; wHeight = wsize[1];
  }

  function getRendererSize() {
    const cam = new THREE.PerspectiveCamera(camera.fov, camera.aspect);
    const vFOV = (cam.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
    const width = height * cam.aspect;
    return [width, height];
  }
}

const RippleEffect = (function () {
  function RippleEffect(renderer, width, height) {
    this.renderer = renderer;
    this.width = 512;
    this.height = 512;
    this.delta = new THREE.Vector2(this.width / Math.pow(width, 2), this.height / Math.pow(height, 2));

    this.hMap = new THREE.WebGLRenderTarget(this.width, this.height, { type: THREE.HalfFloatType, depthBuffer: false, stencilBuffer: false });
    this.hMap1 = new THREE.WebGLRenderTarget(this.width, this.height, { type: THREE.HalfFloatType, depthBuffer: false, stencilBuffer: false });
    this.fsQuad = new FullScreenQuad();

    this.initShaders();
  }

  // From https://github.com/evanw/webgl-water
  RippleEffect.prototype.initShaders = function () {
    // default vertex shader
    const defaultVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    this.copyMat = new THREE.ShaderMaterial({
      uniforms: { 'tDiffuse': { value: null } },
      vertexShader: defaultVertexShader,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(tDiffuse, vUv);
        }
      `,
    });

    this.updateMat = new THREE.ShaderMaterial({
      uniforms: {
        'tDiffuse': { value: null },
        'delta': new THREE.Uniform(this.delta),
      },
      vertexShader: defaultVertexShader,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 delta;
        varying vec2 vUv;
        void main() {
          vec4 texel = texture2D(tDiffuse, vUv);

          vec2 dx = vec2(delta.x, 0.0);
          vec2 dy = vec2(0.0, delta.y);
          float average = (
            texture2D(tDiffuse, vUv - dx).r +
            texture2D(tDiffuse, vUv - dy).r +
            texture2D(tDiffuse, vUv + dx).r +
            texture2D(tDiffuse, vUv + dy).r
          ) * 0.25;
          texel.g += (average - texel.r) * 2.0;
          texel.g *= 0.995;
          texel.r += texel.g;

          gl_FragColor = texel;
        }
      `,
    });

    this.dropMat = new THREE.ShaderMaterial({
      uniforms: {
        'tDiffuse': { value: null },
        'center': new THREE.Uniform(new THREE.Vector2()),
        'radius': { value: 0.05 },
        'strength': { value: 0.5 },
      },
      vertexShader: defaultVertexShader,
      fragmentShader: `
        const float PI = 3.1415926535897932384626433832795;
        uniform sampler2D tDiffuse;
        uniform vec2 center;
        uniform float radius;
        uniform float strength;
        varying vec2 vUv;
        void main() {
          vec4 texel = texture2D(tDiffuse, vUv);
          float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - vUv) / radius);
          drop = 0.5 - cos(drop * PI) * 0.5;
          texel.r += drop * strength;
          // texel.r = clamp(texel.r, -2.0, 2.0);
          gl_FragColor = texel;
        }
      `,
    });
  };

  RippleEffect.prototype.update = function () {
    this.updateHMap();
  };

  RippleEffect.prototype.updateHMap = function () {
    this.updateMat.uniforms.tDiffuse.value = this.hMap.texture;
    this.renderShaderMat(this.updateMat, this.hMap1);
    this.swapBuffers();
  };

  RippleEffect.prototype.addDrop = function (x, y, radius, strength) {
    this.dropMat.uniforms.tDiffuse.value = this.hMap.texture;
    this.dropMat.uniforms.center.value.set(x, y);
    this.dropMat.uniforms.radius.value = radius;
    this.dropMat.uniforms.strength.value = strength;
    this.renderShaderMat(this.dropMat, this.hMap1);
    this.swapBuffers();
  };

  RippleEffect.prototype.renderBuffer = function (buffer, target) {
    target = target ? target : null;
    this.copyMat.uniforms.tDiffuse.value = buffer.texture;
    this.renderShaderMat(this.copyMat, target);
  };

  RippleEffect.prototype.renderShaderMat = function (mat, target) {
    this.fsQuad.material = mat;
    const oldTarget = this.renderer.getRenderTarget();
    this.renderer.setRenderTarget(target);
    this.fsQuad.render(this.renderer);
    this.renderer.setRenderTarget(oldTarget);
  };

  RippleEffect.prototype.swapBuffers = function () {
    const temp = this.hMap;
    this.hMap = this.hMap1;
    this.hMap1 = temp;
  };

  // from https://threejs.org/examples/js/postprocessing/EffectComposer.js
  const FullScreenQuad = (function () {
    const camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    const FullScreenQuad = function (material) {
      this._mesh = new THREE.Mesh(geometry, material);
    };

    Object.defineProperty(FullScreenQuad.prototype, 'material', {
      get: function () { return this._mesh.material; },
      set: function (value) { this._mesh.material = value; }
    });

    Object.assign(FullScreenQuad.prototype, {
      render: function (renderer) {
        renderer.render(this._mesh, camera);
      }
    });

    return FullScreenQuad;
  })();

  return RippleEffect;
})();

App();