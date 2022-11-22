function App() {
  const conf = {
    el: 'canvas',
    fov: 75,
    cameraZ: 8,
    cameraX:0,
    cameraY:-2,
    background: 0x0000ff,
  };

  let renderer, scene, camera, cameraCtrl;
  let width, height, cx, cy, wWidth, wHeight;
  const { randFloat: rnd, randFloatSpread: rndFS } = THREE.Math;

  let ripple;
  let gridWWidth, gridWHeight, gridWidth, gridHeight;

  const mouse = new THREE.Vector2();
  var loader = new THREE.TextureLoader();
  const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mousePosition = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  let mouseOver = false;

  init();
  initmediaobj();
  initbox();
  // initcalendar();

  function initmediaobj(){
    const light = new THREE.AmbientLight(0xffffff,0)
    const toplight = new THREE.DirectionalLight(0xffffff,1)
    const dirlight = new THREE.DirectionalLight(0xffffff,1);
    const backlight = new THREE.DirectionalLight(0xffffff,1)
    dirlight.position.y = -10;
    toplight.position.y = 100
    backlight.position.y = 10;
    backlight.position.z=-100
    dirlight.position.z = 100;

    // light.position.z = 50

    scene.add(backlight, toplight, dirlight)


    plantlist = ["front.png","f1.png","f2.png","f3.png","f4.png","f5.png","f6.png","f7.png","f8.png","t1.png","t2.png", "t3.png", "t4.png", "t5.png", "t6.png"]
    // plantgeometrylist = [(63, 35),(4.2,6.9),(3.9,5.3),(4.3,5.1),(4.5,5.7),(3.7, 4),(4.7,6),(3.5,4.7),(5.4,4.7),(4,5.3),(4.2,4.6),(4.6,6.6),(4.5,5.9),(3.5,4.8),(5.3,7)]
    plantgeometrylista =[18.9, 4.2, 3.9, 4.3, 4.5, 3.7, 4.7, 3.5, 5.4, 4.5, 4.2, 4.6, 4.5, 3.5, 5.3]
    plantgeometrylistb=[10.5, 6.9, 5.3, 5.1, 5.7, 4, 6, 4.7, 4.7, 5.3, 4.6, 6.6, 5.9, 4.8, 7]
    positionlistx=[0,2,-2,1,8,-10,6,-5,0,9,10,-9,-5,6,-10];
    positionlisty=[10, 5,20,1,3,4,5,6,7,8,9,10,11,12,13,14];
    positionlistz=[0,-20,-4,-8,-4,-10,-6,-20,-14,-8,-10,-8,-15,-15,-4];
  
    for(let i=0; i<plantlist.length; i++){
        let planttexture, plantgeometry, plant;
        planttexture = new THREE.MeshStandardMaterial( { map: loader.load(plantlist[i]),
                                                        transparent: true } );
        plantgeometry = new THREE.PlaneGeometry(2*plantgeometrylista[i], 2*plantgeometrylistb[i]);
        plant = new THREE.Mesh( plantgeometry, planttexture );
        plant.material.side = THREE.DoubleSide
        // plant.rotation.x= 0.5*Math.PI
        plant.position.x = positionlistx[i];
        // plant.position.y = 0.02*positionlistz[i]*positionlistz[i];
        plant.position.z = positionlistz[i];
  
        scene.add(plant)

        function dissolveplant(){
          if (window.scrollY < 5){
            plant.position.z = positionlistz[i];
            plant.position.x = positionlistx[i]
          } else if(window.scrollY > 5, window.scrollY < 300){
            plant.position.z = positionlistz[i] - 0.1*window.scrollY
            plant.position.x = positionlistx[i]
          }
          else if (window.scrollY > 300, window.scrollY < 1300) {
            plant.position.z = positionlistz[i] - 30
            plant.position.x = positionlistx[i] + 0.1*window.scrollY-30
          } else {
            plant.position.z = positionlistz[i] - 30
            plant.position.x = positionlistx[i] + 106
          }
        }
        window.addEventListener("scroll", dissolveplant);
    }
  }
function initbox(){
  let boxgeometry, boxmaterial, box;
  let watergeo, watertexture, water;
  let cementdiagram, cementdiagramtexture,cementdiagramgeo;
  let guano, guanotexture, guanogeo;
  let kid, kidtexture,kidgeo;
  let enhancedcement, enhancedcementtexture,enhancedcementgeo;
   boxmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true  } )
  // boxmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity:0.5  } )

   boxgeometry = new THREE.BoxGeometry(35, 14, 24)
   box = new THREE.Mesh(boxgeometry,boxmaterial)

   watertexture = new THREE.MeshBasicMaterial({map: loader.load("water.jpeg"), side: THREE.DoubleSide,});
   watergeo = new THREE.PlaneGeometry(35,24)
   water = new THREE.Mesh(watergeo,watertexture)
   water.rotation.x = 0.5 * Math.PI;
   water.position.y = -7;
   water.position.z = -36;
   water.position.x = -106;
   kidtexture = new THREE.MeshBasicMaterial({map: loader.load("kid.png"), transparent:true});
   kidgeo = new THREE.PlaneGeometry(5.6,8.1)
   kid = new THREE.Mesh(kidgeo,kidtexture)
   kid.position.y = 0;
   kid.position.z = -26;
   kid.position.x = -114;
   cementdiagramtexture = new THREE.MeshBasicMaterial({map: loader.load("cement_process.png"), transparent: true});
   cementdiagramgeo = new THREE.PlaneGeometry(35, 19.9 );
   cementdiagram = new THREE.Mesh(cementdiagramgeo, cementdiagramtexture);
   cementdiagram.position.z = 8
   cementdiagram.position.y = -15

   guanotexture = new THREE.MeshBasicMaterial({map: loader.load("guano.png"), transparent:true})
   guanogeo= new THREE.PlaneGeometry(4.2,6.9)
   guano = new THREE.Mesh(guanogeo, guanotexture)

   guano.position.y = -2
   guano.position.z = -5
   enhancedcementtexture = new THREE.MeshBasicMaterial({map:loader.load("enhancedcement.png"), transparent:true})
   enhancedcementgeo = new THREE.PlaneGeometry(4.4,4)
   enhancedcement = new THREE.Mesh(enhancedcementgeo,enhancedcementtexture);
   enhancedcement.position.y =-2
   enhancedcement.position.z = -5

  //  box.position.z=8
  scene.add(box, water, kid, guano, enhancedcement)
  // scene.add(cementdiagram)

  function dissolvebox(){
    if (window.scrollY < 5){
      box.position.z = -6;
      water.position.x = -106;
      kid.position.x = -114;
      guano.position.x = -114;
      enhancedcement.position.x = -114;
      cementdiagram.position.z = 8
      box.position.x=0;
    } else if(window.scrollY>5, window.scrollY<300){
      box.position.z = -6 - 0.1*window.scrollY
      water.position.x = -106;
      kid.position.x = -114;
      guano.position.x = -114;
      enhancedcement.position.x = -114;
      box.position.x=0;

      cementdiagram.position.z =8 - 0.1*window.scrollY
    }
    
    else if (window.scrollY > 300, window.scrollY < 1060) {
      box.position.z = -6 - 30
      water.position.x = -106+ 0.1*window.scrollY
      kid.position.x = -114+ 0.1*window.scrollY
      cementdiagram.position.z = -22;
      guano.position.x = -114;
      box.position.x=0;
      enhancedcement.position.x = -114;

    }else if (window.scrollY > 1060, window.scrollY < 1160) {
      box.position.z = -6 - 30
      water.position.x = 0
      kid.position.x = -8
      guano.position.x = -114;
      box.position.x=0;
      enhancedcement.position.x = -114;

      cementdiagram.position.z = -22;
    }else if (window.scrollY > 1160, window.scrollY < 1860) {
      box.position.z = -6 - 30;
      water.position.x = -116 + 0.1*window.scrollY;
      kid.position.x = -124 + 0.1*window.scrollY;
      guano.position.x = -186 + 0.1*window.scrollY;
      enhancedcement.position.x = -114;
      box.position.x=0;

      cementdiagram.position.z = -22;
    } else if (window.scrollY >1860, window.scrollY <1960){
      box.position.z = -6 - 30
      water.position.x = 100;
      kid.position.x = 92; 
      cementdiagram.position.z = -22; 
      guano.position.x = 0;
      box.position.x=0;
      enhancedcement.position.x = -114;    

    }else if(window.scrollY >1960, window.scrollY <2660) {
      box.position.z = -6 - 30
      water.position.x = 100;
      kid.position.x = 92; 
      cementdiagram.position.z = -22; 
      box.position.x=0;
      guano.position.x = -196 + 0.1*window.scrollY;
      enhancedcement.position.x = -266 + 0.1*window.scrollY    
    }else if(window.scrollY >2660, window.scrollY < 2760){
      box.position.z = -6 - 30
      water.position.x = 100;
      kid.position.x = 92; 
      cementdiagram.position.z = -22; 
      box.position.x=0;
      guano.position.x = 70;
      enhancedcement.position.x = 0;
    }else if(window.scrollY >2760, window.scrollY < 3460){
      box.position.z = -6 - 30
      water.position.x = 100;
      kid.position.x = 92; 
      cementdiagram.position.z = -22; 
      guano.position.x = 70;
      enhancedcement.position.x = -276+ 0.1*window.scrollY ;
      box.position.x = -276+ 0.1*window.scrollY
    }else {
      box.position.z = -6 - 30
      water.position.x = 100;
      kid.position.x = 92; 
      cementdiagram.position.z = -22; 
      guano.position.x = 70;
      enhancedcement.position.x = 70 ;
      box.position.x = 100
      
    }
  }
  window.addEventListener("scroll", dissolvebox);


}

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
      // scene.add(new THREE.Mesh(geometry, material));
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
      // scene.add(new THREE.Mesh(geometry, material));
    }

    // camera.position.set(0, -gridWHeight/1.6, 40);
    // camera.lookAt(new THREE.Vector3(0, -gridWHeight/6, 0));

    // cameraCtrl = new THREE.OrbitControls(camera, renderer.domElement);
    // cameraCtrl.enableDamping = true;
    // cameraCtrl.dampingFactor = 0.1;
    // cameraCtrl.rotateSpeed = 0.5;
  }
  
  // function initcalendar() {
  //   calendarlist = ["vig5.png","vig4.png","vig3.png","vig2.png","vig1.png"];
  //   cpositionlistx = [0,6.4,6.4*2, 6.4*3, 6.4*4, 6.4*5];
  //   let cmaterial1,cmaterial2, cmaterial3, cmaterial4, cmaterial5, cgeometry;
  //   let calendar1, calendar2, calendar3, calendar4, calendar5;
  //   cmaterial1 =new THREE.MeshBasicMaterial({map: loader.load(calendarlist[0]), transparent:true});
  //   cmaterial2 =new THREE.MeshBasicMaterial({map: loader.load(calendarlist[1]), transparent:true})
  //   cmaterial3 =new THREE.MeshBasicMaterial({map: loader.load(calendarlist[2]), transparent:true})
  //   cmaterial4 =new THREE.MeshBasicMaterial({map: loader.load(calendarlist[3]), transparent:true})
  //   cmaterial5 =new THREE.MeshBasicMaterial({map: loader.load(calendarlist[4]), transparent:true})
  //
  //   cgeometry = new THREE.PlaneGeometry(6.4, 8.75)
  //   calendar1 = new THREE.Mesh(cgeometry,cmaterial1)
  //   calendar2 = new THREE.Mesh(cgeometry,cmaterial2)
  //   calendar3 = new THREE.Mesh(cgeometry,cmaterial3)
  //   calendar4 = new THREE.Mesh(cgeometry,cmaterial4)
  //   calendar5 = new THREE.Mesh(cgeometry,cmaterial5)
  //   calendar1.position.z=2;
  //   calendar1.position.y=-2;
  //   calendar2.position.z=2;
  //   calendar2.position.y=-2;
  //   calendar3.position.z=2;
  //   calendar3.position.y=-2;
  //   calendar4.position.z=2;
  //   calendar4.position.y=-2;
  //   calendar5.position.z=2;
  //   calendar5.position.y=-2;
  //   calendar1.position.x = -cpositionlistx[0]-20;
  //   calendar2.position.x = -cpositionlistx[1]-20;
  //   calendar3.position.x = -cpositionlistx[2]-20;
  //   calendar4.position.x = -cpositionlistx[3]-20;
  //   calendar5.position.x = -cpositionlistx[4]-20;
  //
  //   // scene.add(calendar1)
  //   scene.add(calendar1, calendar2, calendar3, calendar4, calendar5)
  //
  //     function dissolvecalendar(){
  //       if (window.scrollY < 5500){
  //         calendar1.position.x = -cpositionlistx[0]-20;
  //         calendar2.position.x = -cpositionlistx[1]-20;
  //         calendar3.position.x = -cpositionlistx[2]-20;
  //         calendar4.position.x = -cpositionlistx[3]-20;
  //         calendar5.position.x = -cpositionlistx[4]-20;
  //       } else {
  //         calendar1.position.x = -cpositionlistx[0]-65 + 0.01*window.scrollY;
  //         calendar2.position.x = -cpositionlistx[1]-65+ 0.01*window.scrollY;
  //         calendar3.position.x = -cpositionlistx[2]-65+ 0.01*window.scrollY;
  //         calendar4.position.x = -cpositionlistx[3]-65+ 0.01*window.scrollY;
  //         calendar5.position.x = -cpositionlistx[4]-65+ 0.01*window.scrollY;
  //       }
  //     }
  //     window.addEventListener("scroll", dissolvecalendar);
  //
  // }

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