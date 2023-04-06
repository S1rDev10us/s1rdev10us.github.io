import { Scene, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh, Color, MeshPhysicalMaterial, Plane, Vector3, PlaneGeometry } from "three";
import ThreeJsCanvas from "../components/threejs";
import title from "../main";

export default function Root() {
	console.log("root")
	title("Homepage");
	const THREEScene = (() => ThreeJsCanvas({
		updateScene: function (scene: Scene, renderer: WebGLRenderer, camera: PerspectiveCamera, variables: { [name: string]: any }): void {
			// variables.cube.rotation.x += 0.01;
			// variables.cube.rotation.z += 0.01;
			// variables.cube.rotation.y += 0.01;
			// console.log("updateLoop");
			// throw new Error("Function not implemented.");
		},
		setupScene: function (scene: Scene, renderer: WebGLRenderer, camera: PerspectiveCamera, variables: { [name: string]: any }): void {
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
		},
		children:<h1>Welcome to my website!</h1>
	}))
	return (<div>
		<THREEScene />
		{/* {THREEScene} */}
	</div>)
}