import React from "react";
// рекомендуется поднимать общее состояние до ближайшего общего предка

// создадим калькулятор температуры для кипячения воды

function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>Вода закипит.</p>;
	}
	return <p>Вода не закипит.</p>;
}

let Calculator = class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = { temperature: "" };
	}

	handleChange(e) {
		this.setState({ temperature: e.target.value });
	}

	render() {
		const temperature = this.state.temperature;
		return (
			<fieldset>
				<legend>Введите температуру в градусах Цельсия:</legend>
				<input value={temperature} onChange={this.handleChange} />
				<BoilingVerdict celsius={parseFloat(temperature)} />
			</fieldset>
		);
	}
};

const scaleNames = {
	c: "Цельсия",
	f: "Фаренгейта",
};

let TemperatureInput = class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = { temperature: "" };
	}

	handleChange(e) {
		this.setState({ temperature: e.target.value });
	}

	render() {
		const temperature = this.state.temperature;
		const scale = this.props.scale;
		return (
			<fieldset>
				<legend>Введите температуру в градусах {scaleNames[scale]}:</legend>
				<input value={temperature} onChange={this.handleChange} />
			</fieldset>
		);
	}
};

// нужно написать функцию для конвертаций

function toCelsius(fahrenheit) {
	return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
	return (celsius * 9) / 5 + 32;
}

// функция для конвертации из строки в число

function tryConvert(temperature, convert) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return "";
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

// хочется чтобы 2 поля ввода были синхронизированными

// меняем у инпутов
// const temperature = this.state.temperature; это
// const temperature = this.props.temperature; на это

// пропсы доступны только для чтения
// нужно создать компонент, который будет этим управлять

// теперь когда input будет менять значение, будет это
// handleChange(e) {
//   // Ранее было так: this.setState({temperature: e.target.value});
//   this.props.onTemperatureChange(e.target.value);
//   // ...

TemperatureInput = class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.onTemperatureChange(e.target.value);
	}

	render() {
		const temperature = this.props.temperature;
		const scale = this.props.scale;
		return (
			<fieldset>
				<legend>Введите градусы по шкале {scaleNames[scale]}:</legend>
				<input value={temperature} onChange={this.handleChange} />
			</fieldset>
		);
	}
};

Calculator = class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
		this.state = { temperature: "", scale: "c" };
	}

	handleCelsiusChange(temperature) {
		this.setState({ scale: "c", temperature });
	}

	handleFahrenheitChange(temperature) {
		this.setState({ scale: "f", temperature });
	}

	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius = scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit = scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;
		return (
			<div>
				<TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
				<TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
				<BoilingVerdict celsius={parseFloat(celsius)} />
			</div>
		);
	}
};

export { Calculator };
