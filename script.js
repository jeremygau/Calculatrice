let screen = document.calc.screen;

let isResult;
let precedent;
let dot;

let addItem = (item) => {
	let character = item.innerHTML;
	if (dot && isDot(character)) {
		return;
	}
	if (isDot(character)) {
		dot = true;
		if(isSign(precedent)) {
			screen.value += '0';
		}
	}
	if (isSign(character)) {
		dot = false;
	}
	if (!isSign(character) && !isDot(character) && (isResult || screen.value === '0')) {
		console.log('cc')
		clear('');
	}
	else if (isSign(precedent) && isSign(character)) {
		screen.value = screen.value.substring(0, screen.value.length -1);
	}
	else if (isSign(character) && isDot(precedent)) {
		screen.value = screen.value.substring(0, screen.value.length -1);
	}
	screen.value += character;
	precedent = character;
	isResult = false;
	giveFocus();
}

let isSign = (character) => {
	return character.match(/[+\-*\/]/);
}

let isDot = (character) => {
	return character === '.';
}

let clear = (character) => {
	screen.value = character;
	isResult = false;
	precedent = character;
	giveFocus();
	dot = false;
}

let calculate = () => {
	try {
		screen.value = eval(screen.value);
		isResult = true;
		dot = false;
		console.log(screen.value.match('.'))
		if (screen.value.match(/\./)) {
			console.log('test');
			dot = true;
		}
	}
	catch (e) {
		console.log(e);
	}
}

let init = () => {
	clear('0');
}

let highlight = (key) => {
	console.log(key);
	giveFocus();
	document.getElementById(key.key).click();
	key.preventDefault();
}

document.addEventListener('keypress', highlight);

let giveFocus = () => {
	document.getElementById('value').focus();
}
