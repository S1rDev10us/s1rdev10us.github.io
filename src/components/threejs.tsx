import React, { createRef, useEffect } from "react"

import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, AmbientLight, ACESFilmicToneMapping, sRGBEncoding, PCFShadowMap, Euler, Vector3, Matrix4, Light, CubicBezierCurve } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/*class BetterOrbit extends OrbitControls {
	const panLeft = function () {

		const v = new Vector3();

		return function panLeft( distance:number, objectMatrix: Matrix4 ) {

			v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
			v.multiplyScalar( - distance );

			panOffset.add( v );

		};

	}();

	const panUp = function () {

		const v = new Vector3();

		return function panUp( distance, objectMatrix ) {

			if ( scope.screenSpacePanning === true ) {

				v.setFromMatrixColumn( objectMatrix, 1 );

			} else {

				v.setFromMatrixColumn( objectMatrix, 0 );
				v.crossVectors( scope.object.up, v );

			}

			v.multiplyScalar( distance );

			panOffset.add( v );

		};

	}();

	pan(dX: number, dY: number): void {
		const element = this.domElement;
		if (this.object.isPerspectiveCamera) {

			// perspective
			const position = this.object.position;
			offset.copy(position).sub(this.target);
			let targetDistance = offset.length();

			// half of the fov is center to top of screen
			targetDistance *= Math.tan((this.object.fov / 2) * Math.PI / 180.0);

			// we use only clientHeight here so aspect ratio does not distort speed
			panLeft(2 * deltaX * targetDistance / element.clientHeight, this.object.matrix);
			panUp(2 * deltaY * targetDistance / element.clientHeight, this.object.matrix);

		} else if (this.object.isOrthographicCamera) {

			// orthographic
			panLeft(deltaX * (this.object.right - this.object.left) / this.object.zoom / element.clientWidth, this.object.matrix);
			panUp(deltaY * (this.object.top - this.object.bottom) / this.object.zoom / element.clientHeight, this.object.matrix);

		} else {

			// camera neither orthographic nor perspective
			console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
			this.enablePan = false;

		}
	}
}*/


export default function ThreeJsCanvas(input: { updateScene: (scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, variables: { [name: string]: any }) => void, setupScene: (scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, variables: { [name: string]: any }) => void, random?: number }) {

	const id = `THREEJSCanvas${new Date().getTime()}`;
	const canvas = React.createRef<HTMLCanvasElement>();
	const exportCanvas = <canvas id={id} ref={canvas} />;


	useEffect(() => {
		if (!canvas.current) return;
		const scene = new Scene();
		const camera = new PerspectiveCamera(75, canvas.current.width / canvas.current.height, 0.1, 1000);
		// camera.position.set(0, 0, 0);
		const renderer = new WebGLRenderer({ canvas: canvas.current, antialias: true });
		renderer.toneMapping = ACESFilmicToneMapping;
		renderer.outputEncoding = sRGBEncoding;
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = PCFShadowMap;

		const upLight = new DirectionalLight(0x242424, 1)
		upLight.position.set(1, 2, 1.5)
		upLight.castShadow = true;
		upLight.shadow.mapSize.width = 500;
		upLight.shadow.mapSize.height = 500;
		upLight.shadow.camera.near = 0.1;
		upLight.shadow.camera.far = 50;
		scene.add(upLight);

		const softLight = new AmbientLight(0x242424, 0.2)
		scene.add(softLight);

		var variables: { [name: string]: any, deltaTime: number } = { deltaTime: 0 };

		var initialCameraPos

		const controls = new OrbitControls(camera, canvas.current);
		controls.autoRotate = true;
		controls.enablePan = false;
		controls.enableZoom = false;
		controls.rotateSpeed = 2;
		controls.enableDamping = true;

		camera.rotation.x = 0
		camera.rotation.y = 0
		camera.rotation.z = 0

		var aspect: number = 1;

		const startPosition = new Vector3(1, 1, 1);
		camera.position.x = startPosition.x;
		camera.position.y = startPosition.y;
		camera.position.z = startPosition.z;
		camera.lookAt(new Vector3())

		var previousTimeStamp: number;
		let time = 0;
		function animate(timestamp: number) {
			let deltaTime = timestamp - (previousTimeStamp ?? timestamp)
			time += deltaTime;
			variables.deltaTime = deltaTime;

			previousTimeStamp = timestamp;

			if (!canvas.current) {
				renderer.dispose()
				upLight.dispose();
				softLight.dispose()
				return console.log("exited animate function")
			};
			if (aspect != canvas.current.width / canvas.current.height) {
				aspect = canvas.current.width / canvas.current.height;
				camera.aspect = aspect;
				renderer.setSize(canvas.current.width, canvas.current.height);
			}
			input.updateScene(scene, renderer, camera, variables);
			if (time <= 1000) {
				const rotSpeed = -Math.sqrt(1 - Math.pow(time / 3000 - 1, 1)) * Math.PI * 200;
				camera.position.x = startPosition.x * Math.cos(rotSpeed) + startPosition.z * Math.sin(rotSpeed);
				camera.position.x = startPosition.z * Math.cos(rotSpeed) - startPosition.x * Math.sin(rotSpeed);
				camera.lookAt(new Vector3())
			} else controls.update();

			renderer.render(scene, camera);
			requestAnimationFrame(animate);
		}
		input.setupScene(scene, renderer, camera, variables);
		requestAnimationFrame(animate);
		console.log("creating")
	})
	return (exportCanvas)
}