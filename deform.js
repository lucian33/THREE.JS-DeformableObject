/**
 * Deformable objects
 * @author haoz2@illinois.edu
 */


/**
 * Initialize camera, scene and renderer
 */
let scene, camera, renderer;

let width = window.innerWidth, height = window.innerHeight;

let group, particles;

initialize();

render();

function initialize(){

  scene = new THREE.Scene();
  //scene.background = new THREE.Color( 0x000000, 0 );
  camera = new THREE.PerspectiveCamera(90, width / height, 1, 20);
  camera.lookAt(scene.position);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
  renderer.setSize(width, height);
  //renderer.setClearColor(0x0E2255);

  document.getElementById('canvas').appendChild(renderer.domElement);

  window.addEventListener('resize', onResize);


  drawObjects();

  createLight();
}



function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

/**
 * createLight - crete light in the scene
 */

function createLight(){
  var ambientLight = new THREE.AmbientLight(0x404040); // ambient light
  scene.add(ambientLight);

  var light = new THREE.DirectionalLight();
  light.position.set(1, 2, 1);
  scene.add(light);
}

/**
 * drawObjects - Create planet and ring geometry
 */

function drawObjects(){
  // collect all objects
  group = [];
  // basic geometry
  var geometry = new THREE.IcosahedronGeometry(2,1);
  // basic material
  var blue = new THREE.MeshPhongMaterial({color:'#5b94ed', blending: THREE.NormalBlending, transparent: true, opacity: 0.9, shading: THREE.FlatShading});
  var red = new THREE.MeshPhongMaterial({color:'#fb94ee', blending: THREE.NormalBlending, transparent: true, opacity: 0.9, shading: THREE.FlatShading});
  var green = new THREE.MeshPhongMaterial({color:'#5bffcf', blending: THREE.NormalBlending, transparent: true, opacity: 0.9, shading: THREE.FlatShading});

  var material = new THREE.MeshPhongMaterial({color:'#5b94ce', shading: THREE.FlatShading});

  var obj1 = new THREE.Mesh(geometry, material);
  var obj2 = new THREE.Mesh(geometry, material);
  var obj3 = new THREE.Mesh(geometry, material);
  var obj4 = new THREE.Mesh(geometry, material);
  // var obj1 = new THREE.Mesh(geometry, blue);
  // var obj2 = new THREE.Mesh(geometry, red);
  // var obj3 = new THREE.Mesh(geometry, green);

  group.push(obj1);
  group.push(obj2);
  group.push(obj3);
  group.push(obj4);

  scene.add(group[0], group[1], group[2], group[3]);
}


function render(){

  requestAnimationFrame(render);

  group[0].rotation.x += degToRad(0.1);
  group[0].rotation.y += degToRad(0.1);
  group[0].rotation.z += degToRad(0.1);

  group[1].rotation.x += degToRad(-0.1);
  group[1].rotation.y += degToRad(-0.1);
  group[1].rotation.z += degToRad(-0.1);

  group[2].rotation.x += degToRad(-0.1);
  group[2].rotation.y += degToRad(0.1);
  group[2].rotation.z += degToRad(-0.1);

  group[3].rotation.x += degToRad(0.1);
  group[3].rotation.y += degToRad(0.1);
  group[3].rotation.z += degToRad(-0.1);

  scene.rotation.y += degToRad(0.5);
  scene.rotation.x += degToRad(0.5);
  scene.rotation.z += degToRad(0.5);

  //planet.rotation.z += 0.03;
  renderer.render(scene, camera);
}


/**
 * degToRad - description
 *
 * @param  {type} deg degree
 * @return {type} radius return the radius
 */
function degToRad(deg){
    return deg / 180 * Math.PI;
}
