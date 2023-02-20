// controls
const controls = { 'DAG Orientation': 'td'};
// const gui = new dat.GUI();
// gui.add(controls, 'DAG Orientation', ['td', 'bu', 'lr', 'rl', 'zout', 'zin', 'radialout', 'radialin', null])
//   .onChange(orientation => graph && graph.dagMode(orientation));

// graph config
const NODE_REL_SIZE = 1;

init()
function init(){

    const graph = ForceGraph3D()
        .dagMode('bu')
        .dagLevelDistance(200)
        .backgroundColor('#000000')
        .linkColor(() => 'rgba(255,255,255,0.2)')
        .nodeRelSize(NODE_REL_SIZE)
        .nodeId('path')
        .nodeVal('size')
        .nodeLabel('path')
        .nodeAutoColorBy('module')
        .nodeThreeObject(node =>{
            var particlesGeometry = new THREE.SphereGeometry(9, 32, 32);
            // var diffuseColor = new THREE.Color(0x5e9ccb);
            var particlesMaterial = new THREE.PointsMaterial()
            var node=new THREE.Points(particlesGeometry, particlesMaterial)
            return node
        })

        .nodeOpacity(1)
        .linkDirectionalParticles(2)
        // .linkMaterial(new THREE.PointsMaterial())
        .linkDirectionalParticleWidth(2)
        .linkDirectionalParticleSpeed(0.01)
        .d3Force('collision', d3.forceCollide(node => Math.cbrt(node.size) * NODE_REL_SIZE))
        .d3VelocityDecay(0.07);

    // Decrease repel intensity
    graph.d3Force('charge').strength(-15);

    fetch('d3-dependencies.csv')
        .then(r => r.text())
        .then(d3.csvParse)
        .then(data => {
            const nodes = [], links = [];
            data.forEach(({ size, path }) => {
                const levels = path.split('/'),
                    level = levels.length - 1,
                    module = level > 0 ? levels[1] : null,
                    leaf = levels.pop(),
                    parent = levels.join('/');

                const node = {
                    path,
                    leaf,
                    module,
                    size: +size || 10,
                    level
                };

                nodes.push(node);

                if (parent) {
                    links.push({source: parent, target: path, targetNode: node});
                }
            });

            graph(document.getElementById('graph'))
                .graphData({ nodes, links });
        }); }
// window.addEventListener ('mouseover' , mouseoverfuntion , false);
//
// function mouseoverfuntion{
//
// }


// function onWindowResize() {
//   init()
//
//   // windowHalfX = window.innerWidth / 2;
//   // windowHalfY = window.innerHeight / 2;
//   //
//   // camera.aspect = window.innerWidth / window.innerHeight;
//   // camera.updateProjectionMatrix ();
//   //
//   // renderer.setSize (window.innerWidth , window.innerHeight);
//
// }