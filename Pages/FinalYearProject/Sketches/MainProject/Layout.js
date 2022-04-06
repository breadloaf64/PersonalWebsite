class Layout {
	constructor () {
		this.update();
	}
	
	update() {
		if (height > width) { // portrait
			// container 1 takes up the top half of the screen
			this.primaryContainer_x = 0;
			this.primaryContainer_y = 0;
			this.primaryContainer_w = width;
			this.primaryContainer_h = height / 2;
			
			// container 2 takes up the bottom half of the screen
			this.secondaryContainer_x = 0;
			this.secondaryContainer_y = height / 2;
			this.secondaryContainer_w = width;
			this.secondaryContainer_h = height / 2;
		}
		else { // landscape
			// container 1 takes up the left half of the screen
			this.primaryContainer_x = 0;
			this.primaryContainer_y = 0;
			this.primaryContainer_w = width / 2;
			this.primaryContainer_h = height;
			
			// container 2 takes up the right half of the screen
			this.secondaryContainer_x = width / 2;
			this.secondaryContainer_y = 0;
			this.secondaryContainer_w = width / 2;
			this.secondaryContainer_h = height;
		}
		
		// primarySquare takes up the largest available square in primaryContainer
		this.primarySquare_w = min(this.primaryContainer_w, this.primaryContainer_h);
		this.primarySquare_h = this.primarySquare_w;
		this.primarySquare_x = this.primaryContainer_x + (this.primaryContainer_w - this.primarySquare_w) / 2;
		this.primarySquare_y = this.primaryContainer_y + (this.primaryContainer_h - this.primarySquare_h) / 2;
		
		// subPrimarySquare is a smaller square centred in the primarySquare
		this.subPrimarySquare_w = this.primarySquare_w * 0.8;
		this.subPrimarySquare_h = this.subPrimarySquare_w;
		this.subPrimarySquare_x = this.primarySquare_x + (this.primarySquare_w - this.subPrimarySquare_w) / 2;
		this.subPrimarySquare_y = this.primarySquare_y + (this.primarySquare_h - this.subPrimarySquare_h) / 2;
		
		// secondarySquare takes up the largest available square in secondaryContainer
		this.secondarySquare_w = min(this.secondaryContainer_w, this.secondaryContainer_h);
		this.secondarySquare_h = this.secondarySquare_w;
		this.secondarySquare_x = this.secondaryContainer_x + (this.secondaryContainer_w - this.secondarySquare_w) / 2;
		this.secondarySquare_y = this.secondaryContainer_y + (this.secondaryContainer_h - this.secondarySquare_h) / 2;
		
		// subSecondarySquare is a smaller square centred in the secondarySquare
		this.subsecondarySquare_w = this.secondarySquare_w * 0.8;
		this.subsecondarySquare_h = this.subsecondarySquare_w;
		this.subsecondarySquare_x = this.secondarySquare_x + (this.secondarySquare_w - this.subsecondarySquare_w) / 2;
		this.subsecondarySquare_y = this.secondarySquare_y + (this.secondarySquare_h - this.subsecondarySquare_h) / 2;
		
	}
}