// Обработка событий в React-элементах очень похожа на обработку событий в DOM-элементах
// события именуются в стиле camelCase
// в HTML:
// <button onclick="method()"></button>
// в JSX
// <button onClick={method}></button>;

// ещё одно оличие:
// в React нельзя предотвратить обработчик события по умолчанию, вернув false.
// нужно явно вызывать preventDefault

// к примеру, в обычном html можно:
/*<form onsubmit="console.log('Отправлена форма.'); return false">
	  <button type="submit">Отправить</button>
  </form>; */

// в реакте:
function Form() {
	function handleSubmit(e) {
		// e - синтетическое событие в соответствии с W3C
		e.preventDefault();
		console.log("Форма отправлена");
	}

	return (
		<form onSubmit={handleSubmit}>
			<button type="submit">Отправить</button>
		</form>
	);
}
