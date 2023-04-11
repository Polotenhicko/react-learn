import React, { useEffect, useRef, useState } from 'react';
// В управляемом компоненте, данные формы обрабатываются React-компонентом
// В качестве альтернативы можно использовать неуправляемые компоненты. Они хранят данные формы прямо в DOM.

// Вместо того, чтобы писать обработчик события для каждого обновления состояния,
// вы можете использовать неуправляемый компонент и читать значения из DOM через реф.

export function Uncontrolled() {
  const input = useRef();
  const handleSubmit = (e) => {
    console.log('Отправленное имя: ' + input.current.value);
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Имя:
        {/* можно добавить значение по умолчанию */}
        {/* Аналогично, <input type="checkbox"> и <input type="radio"> используют defaultChecked, 
        а <select> и <textarea> — defaultValue. */}
        <input type="text" ref={input} defaultValue={'Антон'} />
      </label>
      <input type="submit" value="Отправить" />
    </form>
  );
}

// Неуправляемые компоненты опираются на DOM в качестве источника данных и могут быть удобны при интеграции React с кодом,
// не связанным с React.Количество кода может уменьшиться, правда, за счёт потери в его чистоте

export function Controlled() {
  const [name, setName] = useState('Антон');
  const handleSubmit = (e) => {
    console.log('Отправленное имя: ' + name);
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Имя:
        <input
          type="text"
          onChange={(e) => {
            console.log('Ввод: ', e.target.value);
            setName(e.target.value);
          }}
          // реакт будет переопределять значение value в DOM
          value={name}
        />
      </label>
      <input type="submit" value="Отправить" />
    </form>
  );
}

// В React <input type="file"> всегда является неуправляемым компонентом,
// потому что его значение может быть установлено только пользователем, а не программным путём.
export function FileInput() {
  const fileInput = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected file -', fileInput.current.files[0]);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload file:
        <input type="file" ref={fileInput} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
