import type { ValueOf } from "../../env";

class PixelImage extends HTMLCanvasElement {
	image?: HTMLImageElement;
	constructor() {
		super();
		this.setStyle();
		try {
			this.updateImage();
		} catch (_) {
			console.error(_);
		}
	}
	setStyle() {
		this.style.imageRendering = "pixelated !important";
	}
	updateImage() {
		let src = this.dataset.src;
		if (!src) throw new Error("A pixel-image on this page does not have a src");
		this.image = new Image();
		this.image.onload = () => {
			let image = this.image;
			if (!image) return;
			this.width = image.width;
			this.height = image.height;
			this.getContext("2d")?.drawImage(image, 0, 0);
		};
		this.image.src = src;
	}
	attributeChangedCallback(
		_name: ValueOf<(typeof PixelImage)["observedAttributes"]>
	) {
		this.updateImage();
	}
	static get observedAttributes() {
		return ["src"] as const;
	}
}
customElements.define("pixel-image", PixelImage, { extends: "canvas" });
