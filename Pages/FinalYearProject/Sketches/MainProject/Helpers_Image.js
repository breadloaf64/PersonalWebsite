function copyImage(img) {
	return img.get(0, 0, floor(img.width), floor(img.height));
}