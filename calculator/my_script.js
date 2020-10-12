let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let clearBtns = document.querySelectorAll('.clear-btn');

let display = document.getElementById('display');
let decimalBtn = document.getElementById('decimal');
let rootBtn = document.getElementById('root');
let powerBtn = document.getElementById('power');
let minusBtn = document.getElementById('minus');


let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';


for (let i = 0; i < numbers.length; i++) {
	numbers[i].addEventListener('click', function (event) {
		numberPress(event.target.textContent);
	});
}

for (let i = 0; i < operators.length; i++) {
	operators[i].addEventListener('click', function (event) {
		operator(event.target.textContent);
	});
}

for (let i = 0; i < clearBtns.length; i++) {
	clearBtns[i].addEventListener('click', function (event) {
		clear(event.target.textContent);

	});
}

decimalBtn.addEventListener('click', decimal);

rootBtn.addEventListener('click', root);

powerBtn.addEventListener('click', power);

minusBtn.addEventListener('click', minus);



function numberPress(number) {
	if (MemoryNewNumber) {
		display.value = number;
		MemoryNewNumber = false;
	} else {
		if (display.value === '0') {
			display.value = number;
		} else {
			display.value += number;
		};
	};
}

function operator(op) {
	let localOperationMemory = display.value;

	if (MemoryNewNumber && MemoryPendingOperation !== '=') {
		display.value = MemoryCurrentNumber;
	} else {
		MemoryNewNumber = true;
		if (MemoryPendingOperation === '+') {
			MemoryCurrentNumber += +(localOperationMemory);
		} else if (MemoryPendingOperation === '-') {
			MemoryCurrentNumber -= +(localOperationMemory);
		} else if (MemoryPendingOperation === '*') {
			MemoryCurrentNumber *= +(localOperationMemory);
		} else if (MemoryPendingOperation === '/') {
			MemoryCurrentNumber /= +(localOperationMemory);
		} else {
			MemoryCurrentNumber = +(localOperationMemory);
			
		}
		display.value = Math.round(MemoryCurrentNumber * 1000000000000000)/1000000000000000;
		MemoryPendingOperation = op;
	}
	console.log("Клик по операции " + op);
}

function root() {
	let localSqrtMemory = display.value;
	if (localSqrtMemory.indexOf('-') === -1) {
		display.value = Math.sqrt(localSqrtMemory);
	} else {
		display.value = 'Error';
	}
}

function power() {
	let localPowerMemory = display.value;
	display.value = Math.round(Math.pow(localPowerMemory, 2)*1000000000000000)/1000000000000000;
}

function minus() {
	let localMinusMemory = display.value;
	display.value = localMinusMemory * -1;
}

function decimal(argument) {
	let localDecimalMemory = display.value;

	if (MemoryNewNumber) {
		localDecimalMemory = '0.';
		MemoryNewNumber = false;
	} else {
		if (localDecimalMemory.indexOf('.') === -1) {
			localDecimalMemory += '.';
		}
	}
	display.value = localDecimalMemory;
	console.log("Клик по десятичной");
}

function clear(id) {
	if (id === 'ce') {
		display.value = '0';
		MemoryNewNumber = true;
	} else if (id === 'c') {
		display.value = '0';
		MemoryNewNumber = true;
		MemoryCurrentNumber = 0;
		MemoryPendingOperation = '';
	}
}





