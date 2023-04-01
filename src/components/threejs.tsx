import React from "react"
import THREE from 'three';


export default function ThreeJsCanvas() {
	const canvas = React.createRef<HTMLCanvasElement>()
	const exportCanvas = <canvas ref={canvas} />

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75);
	return ({ canvas: exportCanvas, canvasRef: canvas, scene: scene, camera: camera })
}