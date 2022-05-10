let scene, camera, renderer, spotLight;
let cube, plane, sphere, globe;
let mouseDown = false, mouseX = 0, mouseY = 0;
let theta = 0;
let ADD = 0.01;
let ring1, ring2, ring3, ring4, ring5, ring6, ring7, ring8;


let createPlane = function() {

	geometry = new THREE.BoxGeometry(2000, 1, 2000);
	material = new THREE.MeshPhongMaterial({color: 0x23a3ff, side: THREE.DoubleSide});
	plane = new THREE.Mesh(geometry, material);
	plane.position.y = -5;
	scene.add(plane);
};

let createGlobe = function() {

	const textureLoader = new THREE.TextureLoader();
	const texture = textureLoader.load('textures/globe-2.png');

	let sphere =  new THREE.SphereGeometry(11, 32, 32);
    let material = new THREE.MeshStandardMaterial({transparent: true, side: THREE.DoubleSide });
	material.alphaMap = texture;

	globe = new THREE.Mesh(sphere, material);
	globe.position.set(5, 20 ,0);

	scene.add(globe);
}

let createCone = function() {
    const coneGeometry = new THREE.ConeGeometry(12, 30, 20, 32);
    const material = new THREE.MeshBasicMaterial({color: 0x23a3ff, transparent: true, opacity: 0.2})
    const cone = new THREE.Mesh(coneGeometry, material);
    cone.position.set(5, 0, 0);
    setRotation(cone, 0, 0, 180); 

    scene.add(cone);
}

function setRotation(object, degreeX=0, degreeY=0, degreeZ=0) {
    object.rotateX(THREE.Math.degToRad(degreeX));
    object.rotateY(THREE.Math.degToRad(degreeY));
    object.rotateZ(THREE.Math.degToRad(degreeZ));
}

let createGlow = function() {
    
    let sphere =  new THREE.SphereGeometry(13.5, 32, 32);
    let material  = new createAtmosphereMaterial()
    material.uniforms.glowColor.value.set(0x23a3ff)
    material.uniforms.coeficient.value  = 0.1
    material.uniforms.power.value       = 2.0

	glow = new THREE.Mesh(sphere, material);
	glow.position.set(5, 20 ,0);

	scene.add(glow);
}

let createRings = function(innerRadiuus, outerRadius, xPos, yPos, zPos, zRotate, thetaLength) {

    const geometry = new THREE.RingGeometry(innerRadiuus, outerRadius, 32, 1, 0, thetaLength);
    const material = new THREE.MeshBasicMaterial( { color: 0x23a3ff, side: THREE.DoubleSide, transparent: true, opacity: 0.8 } );
    const ring = new THREE.Mesh( geometry, material );
    ring.position.x = xPos;
    ring.position.y = yPos;
    ring.position.z = zPos;
    setRotation(ring, 90, 0, zRotate);

    return ring;
}

// set up the environment - 
// initiallize scene, camera, objects and renderer
let init = function() {
    // create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // create an locate the camera
    camera = new THREE.PerspectiveCamera(75, 
                    window.innerWidth / window.innerHeight, 
                    0.1, 1000);
    camera.position.set(5, 10, 50);
    
    createPlane();
    createGlobe();
    createCone();
    createGlow();

    ring1 = createRings(2.5, 1.2, 5, -3, 11, 0, Math.PI/2);
    ring2 = createRings(2.5, 1.2, 5, -3, 11, 180, Math.PI/2);
    ring3 = createRings(3, 1.2, 5, -3, 11, 110, Math.PI/3);
    ring4 = createRings(3, 1.2, 5, -3, 11, -70, Math.PI/3);

    // Create outer rings
    ring5 = createRings(4, 3, 4.8, -3, 11, 0, Math.PI/2);
    ring6 = createRings(4, 3, 4.8, -3, 11, 180, Math.PI/2);
    ring7 = createRings(4.5, 3.5, 4.8, -3, 11, 110, Math.PI/3);
    ring8 = createRings(4.5, 3.5, 4.8, -3, 11, -70, Math.PI/3);

    ring9 = createRings(6.1, 5.8, 4.8, -3, 11, 110, Math.PI/2);
    ring10 = createRings(6.1, 5.8, 4.8, -3, 11, -70, Math.PI/2);

    ring11 = createRings(7.1, 6.8, 4.8, -3, 11, 0, Math.PI/2);
    ring12 = createRings(7.1, 6.8, 4.8, -3, 11, 180, Math.PI/2);

    scene.add(ring1); 
    scene.add(ring2); 
    scene.add(ring3); 
    scene.add(ring4); 
    scene.add(ring5); 
    scene.add(ring6); 
    scene.add(ring7); 
    scene.add(ring8); 
    scene.add(ring9); 
    scene.add(ring10); 
    scene.add(ring11); 
    scene.add(ring12); 

    light = new THREE.PointLight(0x23a3ff, 5, 50 ,2);
    light.position.y = 20;
    light.position.x = 5;
    scene.add(light);
            
    // create the renderer   
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    addMouseHandler(document);
};

// Render the scene
let render = function() {

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function moveGlobe(deltaX, deltaY) {
	globe.rotation.x += deltaY / 250;
	globe.rotation.y += deltaX / 250;

    ring1.rotation.z -= deltaX / 250;
    ring2.rotation.z -= deltaX / 250;
    ring3.rotation.z -= deltaX / 250;
    ring4.rotation.z -= deltaX / 250;
    ring5.rotation.z -= deltaX / 250;
    ring6.rotation.z -= deltaX / 250;
    ring7.rotation.z -= deltaX / 250;
    ring8.rotation.z -= deltaX / 250;	

}

function onMouseMove(e) {
	if (!mouseDown) {
		return;
	}

	e.preventDefault();

	let deltaX = e.clientX - mouseX, deltaY = e.clientY - mouseY;
	mouseX = e.clientX;
	mouseY = e.clientY;
	moveGlobe(deltaX, deltaY);
}

function onMouseDown(e) {
	e.preventDefault();

	mouseDown = true;
	mouseX = e.clientX;
	mouseY = e.clientY;
}

function onMouseUp(e) {
	e.preventDefault();

	mouseDown = false;
}

function addMouseHandler(canvas) {
    canvas.addEventListener('mousemove', function (e) {
        onMouseMove(e);
    }, false);
    canvas.addEventListener('mousedown', function (e) {
        onMouseDown(e);
    }, false);
    canvas.addEventListener('mouseup', function (e) {
        onMouseUp(e);
    }, false);
}

// Rotate the globe
let rotatingGlobe = function() {

  globe.rotation.y += ADD * 1;
  requestAnimationFrame(rotatingGlobe);
};

let rotatingRings = function() {

    ring1.rotation.z -= ADD * 1;
    ring2.rotation.z -= ADD * 1;
    ring3.rotation.z -= ADD * 1;
    ring4.rotation.z -= ADD * 1;
    ring5.rotation.z -= ADD * 1;
    ring6.rotation.z -= ADD * 1;
    ring7.rotation.z -= ADD * 1;
    ring8.rotation.z -= ADD * 1;

    ring9.rotation.z -= ADD * 1.5;
    ring10.rotation.z -= ADD * 1.5;
    ring11.rotation.z += ADD * 1;
    ring12.rotation.z += ADD * 1;
    requestAnimationFrame(rotatingRings);
  };

function createAtmosphereMaterial(){
    var vertexShader  = [
      'varying vec3 vNormal;',
      'void main(){',
      '   // compute intensity',
      '   vNormal     = normalize( normalMatrix * normal );',
      '   // set gl_Position',
      '   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
      '}',
  ].join('\n')
  var fragmentShader  = [
      'uniform float coeficient;',
      'uniform float power;',
      'uniform vec3  glowColor;',
  
      'varying vec3  vNormal;',
  
      'void main(){',
      '   float intensity = pow( coeficient - dot(vNormal, vec3(0.0, 0.0, 1.0)), power );',
      '   gl_FragColor    = vec4( glowColor * intensity, 1.0 );',
      '}',
  ].join('\n')
  
  // create custom material from the shader code above
  //   that is within specially labeled script tags
  var material    = new THREE.ShaderMaterial({
      uniforms: { 
          coeficient  : {
              type    : "f", 
              value   : 1.0
          },
          power       : {
              type    : "f",
              value   : 6
          },
          glowColor   : {
              type    : "c",
              value   : new THREE.Color('blue')
          },
      },
      vertexShader    : vertexShader,
      fragmentShader  : fragmentShader,
      side        : THREE.FrontSide,
      blending    : THREE.AdditiveBlending,
      transparent : true,
      depthWrite  : false,
  });
  return material
}

///////////////////////////////////////////////
init();
render();
rotatingGlobe();
rotatingRings();
    