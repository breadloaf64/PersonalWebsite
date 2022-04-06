class Scene_main {
	constructor() {
		this.name = "main";
	}
	
	windowResized() { // essential
	}
	
	mainLoop() { // essential
	}
	
	render() { // essential
		strokeWeight(3);
		stroke(0);
		
		// primaryContainer
		fill("#bb3e03");
		rect(layout.primaryContainer_x, layout.primaryContainer_y, layout.primaryContainer_w, layout.primaryContainer_h);
		
		// primarySquare
		fill("#ca6702");
		rect(layout.primarySquare_x, layout.primarySquare_y, layout.primarySquare_w, layout.primarySquare_h);
		
		// subPrimarySquare
		fill("#ee9b00");
		rect(layout.subPrimarySquare_x, layout.subPrimarySquare_y, layout.subPrimarySquare_w, layout.subPrimarySquare_h);
		
		// secondaryContainer
		fill("#005f73");
		rect(layout.secondaryContainer_x, layout.secondaryContainer_y, layout.secondaryContainer_w, layout.secondaryContainer_h);
		
		// secondarySquare
		fill("#0a9396");
		rect(layout.secondarySquare_x, layout.secondarySquare_y, layout.secondarySquare_w, layout.secondarySquare_h);
		
		// subsecondarySquare
		fill("#94d2bd");
		rect(layout.subsecondarySquare_x, layout.subsecondarySquare_y, layout.subsecondarySquare_w, layout.subsecondarySquare_h);
	}
	
	mouseClicked() { // essential
	}
}