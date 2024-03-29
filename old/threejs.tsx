import React, { ReactNode, useEffect } from "react";
import "./components.css";
import {
	Scene,
	WebGLRenderer,
	AmbientLight,
	ACESFilmicToneMapping,
	sRGBEncoding,
	PCFShadowMap,
	Vector3,
	OrthographicCamera,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useRef } from "react";
import { useCallback } from "react";
export default function ThreeJsCanvas(input: {
	updateScene: (
		scene: THREE.Scene,
		renderer: THREE.WebGLRenderer,
		camera: THREE.Camera,
		variables: { [name: string]: any }
	) => void;
	setupScene: (
		scene: THREE.Scene,
		renderer: THREE.WebGLRenderer,
		camera: THREE.Camera,
		variables: { [name: string]: any }
	) => void;
	random?: number;
	children: ReactNode;
}) {
	const renderer = useRef<WebGLRenderer>();
	const id = `THREEJSCanvas${new Date().getTime()}`;
	const canvas = React.createRef<HTMLCanvasElement>();
	// const exportCanvas = <canvas className="three-canvas" width={document.body.clientWidth} height={500} id={id} ref={canvas} />;
	const exportCanvas = (
		<canvas
			className="three-canvas"
			width={500}
			height={500}
			id={id}
			ref={canvas}
		/>
	);
	const handleResize = useCallback(
		(_w: number, _h: number) => {
			if (canvas.current == null || renderer.current == null) return;
			// renderer.current.setSize(w, h);
		},
		[canvas.current?.clientWidth, canvas.current?.clientHeight]
	);

	useEffect(() => {
		const distance = 1.5;

		if (!canvas.current) return;
		const scene = new Scene();
		// const camera = new PerspectiveCamera(75, canvas.current.clientWidth / canvas.current.clientHeight, 0.1, 1000);
		const camera = new OrthographicCamera(
			-distance,
			distance,
			distance,
			-distance
		);

		// camera.
		// camera.e
		// camera.position.set(0, 0, 0);

		renderer.current = new WebGLRenderer({
			canvas: canvas.current,
			antialias: true,
		});

		renderer.current.toneMapping = ACESFilmicToneMapping;
		renderer.current.outputEncoding = sRGBEncoding;
		renderer.current.shadowMap.enabled = true;
		renderer.current.shadowMap.type = PCFShadowMap;

		// const upLight = new DirectionalLight(0x242424, 1)
		// upLight.position.set(1, 2, 1.5)
		// upLight.castShadow = true;
		// upLight.shadow.mapSize.width = 500;
		// upLight.shadow.mapSize.height = 500;
		// upLight.shadow.camera.near = 0.1;
		// upLight.shadow.camera.far = 50;
		// scene.add(upLight);

		// const softLight = new AmbientLight(0x242424, 0.2)
		// scene.add(softLight);

		const fullLight = new AmbientLight(0xcccccc, 1);
		scene.add(fullLight);

		var variables: { [name: string]: any; deltaTime: number } = {
			deltaTime: 0,
		};

		const controls = new OrbitControls(camera, canvas.current);
		controls.autoRotate = true;
		controls.enablePan = false;
		controls.enableZoom = false;
		controls.rotateSpeed = 4;

		controls.enableDamping = true;

		camera.rotation.x = 0;
		camera.rotation.y = 0;
		camera.rotation.z = 0;

		// var aspect: number = 1;
		const startPosition = new Vector3(distance, 5, distance);
		const endY = 1;
		// const startPosition = new Vector3(20, 1, 20);

		camera.position.copy(startPosition);

		camera.lookAt(new Vector3());

		var previousTimeStamp: number;
		let time = 0;
		function animate(timestamp: number) {
			if (renderer.current == undefined) return;
			let deltaTime = timestamp - (previousTimeStamp ?? timestamp);
			time += deltaTime;
			variables.deltaTime = deltaTime;

			previousTimeStamp = timestamp;

			if (!canvas.current) {
				renderer.current.dispose();
				fullLight.dispose();
				return console.log("exited animate function");
			}
			input.updateScene(scene, renderer.current, camera, variables);
			if (time <= 1500) {
				const rotSpeed =
					-Math.sqrt(1 - Math.pow(time / 2000 - 1, 4)) * Math.PI * 5;
				const heightPercent = Math.sqrt(1 - Math.pow(time / 1500 - 1, 2)) * 100;
				camera.position.y =
					startPosition.y - (startPosition.y - endY) * (heightPercent / 100);
				camera.position.x =
					startPosition.x * Math.cos(rotSpeed) +
					startPosition.z * Math.sin(rotSpeed);
				camera.position.z =
					startPosition.z * Math.cos(rotSpeed) -
					startPosition.x * Math.sin(rotSpeed);
				camera.lookAt(new Vector3());
			} else {
				controls.update();
			}

			renderer.current.render(scene, camera);
			requestAnimationFrame(animate);
		}
		input.setupScene(scene, renderer.current, camera, variables);
		requestAnimationFrame(animate);
		console.log("creating");
		window.onresize = () => {
			handleResize(canvas.current!.parentElement!.clientWidth, 500);
		};
	});
	return (
		<div className="three-canvas-holder">
			{exportCanvas}
			<div>{input.children}</div>
		</div>
	);
}
/*

		updateScene: function (scene: Scene, renderer: WebGLRenderer, camera: Camera, variables: { [name: string]: any }): void {
			// variables.cube.rotation.x += 0.01;
			// variables.cube.rotation.z += 0.01;
			// variables.cube.rotation.y += 0.01;
			// console.log("updateLoop");
			// throw new Error("Function not implemented.");
		},
		setupScene: function (scene: Scene, renderer: WebGLRenderer, camera: Camera, variables: { [name: string]: any }): void {
			const geometry = new BoxGeometry(1, 1, 1);
			const material = new MeshPhysicalMaterial({ color: 0xaaaa11 })
			const cube = new Mesh(geometry, material);
			cube.receiveShadow = true;
			cube.castShadow = true;
			variables.cube = cube;
			scene.add(cube);

			const planeGeo = new PlaneGeometry(10, 10);
			const planeMat = new MeshPhysicalMaterial({ color: 0x242424, transparent: true })
			const plane = new Mesh(planeGeo, planeMat)
			plane.receiveShadow = true;
			plane.rotateX(1.5 * Math.PI);
			plane.position.y -= 0.5
			scene.add(plane);

			scene.background = new Color(0x242424)
			camera.position.z = 2;
			// throw new Error("Function not implemented.");
		},*/
