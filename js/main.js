const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.setClearColor(0xb7c3f3, 1);	//set background colour

const light = new THREE.AmbientLight( 0xffffff ); //white light
scene.add( light );

function createCube(size, positionX){
	const geometry = new THREE.BoxGeometry(size.w, size.h, size.d);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
    const cube = new THREE.Mesh(geometry, material);
	cube.position.x = positionX;
    scene.add(cube);
}

camera.position.z = 5;  //This decides how far the camera should be at
// renderer.render(scene, camera); //Should be called everytime to see the changes on the screen

// Instantiate a loader
const loader = new THREE.GLTFLoader();

class Doll{
	constructor(){
		loader.load("../model/scene.gltf", (gltf) => {
			scene.add( gltf.scene );
			gltf.scene.scale.set(.4,.4,.4);	//set doll size
			gltf.scene.position.set(0, -1, 0);	//set doll position
			this.doll = gltf.scene;
		})
	}

	lookBackward(){
		// this.doll.rotation.y = -3.15;
		gsap.to(this.doll.rotation, {y: -3.15, duration: .8})
	}

	lookForward(){
		gsap.to(this.doll.rotation, {y: 0, duration: .8})
	}
}

function createTrack(){
	createCube({w: .2, h: 1.5, d: 1}, 3);
}
createTrack();

// let doll = new Doll();
setTimeout(() => {
	doll.lookBackward();
}, 1000)

function animate() {    //To avoid calling "render" function everytime, this function is created
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

// making it responsive
window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}