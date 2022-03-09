function posMod(a, b) {
	// returns how far a is from the closest lower multiple of b
	let result = a % b;
	if (result < 0) result += b;
	return result;
}