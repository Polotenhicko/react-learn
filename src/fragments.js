import React from 'react';
// фрагменты
// возврат нескольких элементов из компонента является распространённой практикой
// фрагменты позволяют формировать список дочерних элементов, не создавая лишних узлов в DOM

// render() {
//   return (
//     <React.Fragment>
//       <ChildA />
//       <ChildB />
//       <ChildC />
//     </React.Fragment>
//   );
// }

// Также есть сокращённая запись

// render() {
//   return (
//     <>
//       <ChildA />
//       <ChildB />
//       <ChildC />
//     </>
//   );
// }

// Пример

class Table extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <Columns />
          </tr>
        </tbody>
      </table>
    );
  }
}

// Columns должен вернуть несколько элементов td
// но если там использовать div, то не сработает

let Columns = class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Привет</td>
        <td>Мир</td>
      </div>
    );
  }
};

// Результатом вывода <Table /> будет:

// <table>
//   <tr>
//     <div> -- херня
//       <td>Привет</td>
//       <td>Мир</td>
//     </div>
//   </tr>
// </table>

// Фрагменты решают эту проблему.

Columns = class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Привет</td>
        <td>Мир</td>
      </React.Fragment>
    );
  }
};

// Результатом будет правильный вывод <Table />:

// Существует сокращённая запись объявления фрагментов. Она выглядит как пустые теги:

// Можно использовать <></> так же, как используется любой другой элемент. Однако такая запись не поддерживает ключи или атрибуты.

// Фрагменты, объявленные с помощью <React.Fragment>, могут иметь ключи.
// Например, их можно использовать при создании списка определений, преобразовав коллекцию в массив фрагментов.

export { Table };

function Glossary(props) {
  return (
    <dl>
      {props.items.map((item) => (
        // без ключей будет предупреждение
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
// key — это единственный атрибут, допустимый у Fragment
// в будущем планируется добавить обработчик событий
export { Glossary };
