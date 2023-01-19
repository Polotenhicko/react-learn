import React from 'react';
import { Link } from 'react-router-dom';
// Контекст позволяет передавать данные через дерево компонентов
// без необходимости передавать пропсы на промежуточных уровнях.

// В типичном React-приложении данные передаются сверху вниз (от родителя к дочернему компоненту)
// с помощью пропсов

// Контекст предоставляет способ делиться такими данными между компонентами
//  без необходимости явно передавать пропсы через каждый уровень дерева.

// Контекст разработан для передачи данных, которые можно назвать «глобальными» для всего дерева React-компонентов
// В примере ниже мы вручную передаём проп theme, чтобы стилизовать компонент Button:

let Toolbar = function Toolbar(props) {
  // Компонент Toolbar должен передать проп "theme" ниже,
  // фактически не используя его
  // Учитывая, что у вас в приложении
  // могут быть десятки компонентов, использующих UI-тему,
  // вам придётся передавать проп "theme" через все компоненты.
  // И в какой-то момент это станет большой проблемой.

  return (
    <div>
      <ThemeButton theme={props.theme} />
    </div>
  );
};

let ThemeButton = class ThemeButton extends React.Component {
  render() {
    return <button theme={this.props.theme} />;
  }
};

// Контекст позволяет избежать передачи пропсов в промежуточные компоненты:
// Контекст позволяет передавать значение глубоко
// в дерево компонентов без явной передачи пропсов
// на каждом уровне. Создадим контекст для текущей
// UI-темы (со значением "light" по умолчанию).

let ThemeContext = React.createContext('light');

let App = class App extends React.Component {
  render() {
    // Компонент Provider используется для передачи текущей
    // UI-темы вниз по дереву. Любой компонент может использовать
    // этот контекст и не важно, как глубоко он находится.
    // В этом примере мы передаём "dark" в качестве значения контекста.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
};

// Компонент, который находится в середине,
// больше не должен явно передавать тему вниз.
Toolbar = function Toolbar(props) {
  return (
    <div>
      <ThemeButton />
    </div>
  );
};

ThemeButton = class ThemeButton extends React.Component {
  // Определяем contextType, чтобы получить значение контекста.
  // React найдёт (выше по дереву) ближайший Provider-компонент,
  // предоставляющий этот контекст, и использует его значение.
  // В этом примере значение UI-темы будет "dark".
  static contextType = ThemeContext;
  render() {
    return <button theme={this.context} />;
  }
};

// Обычно контекст используется, если необходимо обеспечить доступ данных во многих компонентах на разных уровнях вложенности
// По возможности не используйте его, так как это усложняет повторное использование компонентов.

// Если вы хотите избавиться от передачи некоторых пропсов на множество уровней вниз,
// обычно композиция компонентов является более простым решением, чем контекст.

// Например, давайте рассмотрим компонент Page, который передаёт пропсы user и avatarSize на несколько уровней вниз,
//  чтобы глубоко вложенные компоненты Link и Avatar смогли их использовать:

{
  /* 
<Page user={user} avatarSize={avatarSize} />
// ... который рендерит ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... который рендерит ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... который рендерит ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link> */
}

// Передача пропсов user и avatarSize вниз выглядит избыточной, если в итоге их использует только компонент Avatar
// Так же плохо, если компоненту Avatar вдруг потребуется больше пропсов сверху,
// тогда вам придётся добавить их на все промежуточные уровни.

// Один из способов решить эту проблему без контекста — передать вниз сам компонент Avatar,
// в случае чего промежуточным компонентам не нужно знать о пропсах user и avatarSize:

// let Page = function page(props) {
//   const user = props.user;
//   const userLink = (
//     <Link href={user.permalink}>
//       <Avatar user={user} size={props.avatarSize} />
//     </Link>
//   );
//   return <PageLayout userLink={userLink} />;
// };

// Теперь, это выглядит так:
{
  /*
<Page user={user} avatarSize={avatarSize}/>
// ... который рендерит ...
<PageLayout userLink={...} />
// ... который рендерит ...
<NavigationBar userLink={...} />
// ... который рендерит ...
{props.userLink} 
*/
}

// С этими изменениями, только корневой компонент Page знает о том, что компоненты Link и Avatar используют user и avatarSize.

// Инверсия управления может сделать ваш код чище во многих случаях, уменьшая количество пропсов,
// которые вы должны передавать через ваше приложение, и давая больше контроля корневым компонентам.
// Однако, такое решение не всегда подходит.Перемещая больше сложной логики вверх по дереву, вы перегружаете вышестоящие компоненты.

// Вы не ограничены в передаче строго одного компонента.
// Вы можете передать несколько дочерних компонентов или, даже, создать для них разные «слоты»

// let Page = function Page(props) {
//   const user = props.user;
//   const content = <Feed user={user} />;
//   const topBar = (
//     <NavigationBar>
//       <Link href={user.permaLink}>
//         <Avatar user={user} size={props.avatarSize} />
//       </Link>
//     </NavigationBar>
//   );

//   return <PageLayout topBar={topBar} content={content} />;
// };

// Этого паттерна достаточно для большинства случаев, когда вам необходимо отделить дочерний компонент
// от его промежуточных родителей.Вы можете пойти ещё дальше, используя рендер - пропсы, я хз чо это
//  если дочерним компонентам необходимо взаимодействовать с родителем перед рендером.

// React.createContext

const MyContext = React.createContext('defaultValue');

// Создаёт объект Context
// Когда React рендерит компонент, который подписан на этот объект,
// React получит текущее значение контекста из ближайшего подходящего Provider выше в дереве компонентов.
// Аргумент defaultValue используется только в том случае, если для компонента нет подходящего Provider выше в дереве

// Значение по умолчанию может быть полезно для тестирования компонентов в изоляции без необходимости оборачивать их
// Обратите внимание: если передать undefined как значение Provider, компоненты, использующие этот контекст,
// не будут использовать defaultValue.

<MyContext.Provider value={'значение'} />;

// Каждый объект Context используется вместе с Provider компонентом, который позволяет дочерним компонентам,
// использующим этот контекст, подписаться на его изменения.

// Один Provider может быть связан с несколькими компонентами, потребляющими контекст.
// Так же компоненты Provider могут быть вложены друг в друга, переопределяя значение контекста глубже в дереве.

// Все потребители, которые являются потомками Provider, будут повторно рендериться, как только проп value у Provider изменится

// Потребитель (включая .contextType и useContext) перерендерится при изменении контекста,
// даже если его родитель, не использующий данный контекст, блокирует повторные рендеры с помощью shouldComponentUpdate.

// Изменения определяются с помощью сравнения нового и старого значения, используя алгоритм, аналогичный Object.is.

// Class.contextType

class MyClass extends React.Component {
  //static contextType = MyContext;

  componentDidMount() {
    let value = this.context;
    /* выполнить побочный эффект на этапе монтирования, используя значение MyContext */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    return <div></div>;
    /* отрендерить что-то, используя значение MyContext */
  }
}
MyClass.contextType = MyContext;
// пример такой же, как и с static
// В свойство класса contextType может быть назначен объект контекста, созданный с помощью React.createContext().
// С помощью этого свойства вы можете использовать ближайшее и актуальное значение указанного контекста при помощи this.context.

// пока можно только на 1 контекст подписаться

// Context.Consumer
// нужен для подписки в функциональном компоненте
// Consumer принимает функцию в качестве дочернего компонента.
// Эта функция принимает текущее значение контекста и возвращает React-компонент

// Передаваемый аргумент value будет равен ближайшему (вверх по дереву) значению этого контекста,
// а именно пропу value компонента Provider

// Если такого компонента Provider не существует, аргумент value будет равен значению defaultValue,
// которое было передано в createContext().

// Объекту Context можно задать строковое свойство displayName. React DevTools использует это свойство при отображении контекста.
MyContext.displayName = 'MyDisplayName';

// Динамический контекст
// типо экспортируем и импортируем сюда

// theme-context.js
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

ThemeContext = React.createContext(themes.dark);

// themed-button.js
// export
class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    const props = this.props;
    const theme = this.context;
    return <button {...props} style={{ backgroundColor: theme.background }} />;
  }
}

// app.js

// промежуточный компонент
Toolbar = function Toolbar(props) {
  return <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>;
};

App = class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.light ? themes.dark : themes.light,
      }));
    };
  }

  render() {
    // ThemedButton внутри ThemeProvider использует
    // значение светлой UI-темы из состояния, в то время как
    // ThemedButton, который находится вне ThemeProvider,
    // использует тёмную UI-тему из значения по умолчанию
    // пример говна короче
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <div>
          <ThemedButton />
        </div>
      </div>
    );
  }
};

// Довольно часто необходимо изменить контекст из компонента, который находится где-то глубоко в дереве компонентов.
// В этом случае вы можете добавить в контекст функцию, которая позволит потребителям изменить значение этого контекста:

const ThemeContextNew = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});

function ThemeTogglerButton() {
  // ThemeTogglerButton получает из контекста
  // не только значение UI-темы, но и функцию toggleTheme.
  return (
    <ThemeContextNew.Consumer>
      {({ theme, toggleTheme }) => (
        <button onClick={toggleTheme} style={{ backgroundColor: theme.background }}>
          Toggle Theme
        </button>
      )}
    </ThemeContextNew.Consumer>
  );
}

App = class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };

    // Состояние хранит функцию для обновления контекста,
    // которая будет также передана в Provider-компонент.
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    return (
      <ThemeContextNew.Provider value={this.state}>
        <Content />
      </ThemeContextNew.Provider>
    );
  }
};

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

// Чтобы последующие рендеры (связанные с контекстом) были быстрыми,
// React делает каждого потребителя контекста отдельным компонентом в дереве.

// контекст UI-темы со светлым значением по умолчанию
const ThemeContext2 = React.createContext('light');

// контекст активного пользователя
const UserContext = React.createContext({
  name: 'Guest',
});

App = class App extends React.Component {
  render() {
    const { signedInUser, theme } = this.props;
    // компонент App, который предоставляет начальные значения контекстов
    return (
      <ThemeContext2.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext2.Provider>
    );
  }
};

function Layout() {
  return (
    <div>
      <aside></aside>
      <Content2 />
    </div>
  );
}

function ProfilePage() {}

function Content2() {
  return (
    <ThemeContext2.Consumer>
      {(theme) => (
        <UserContext.Consumer>
          {(user) => <ProfilePage user={user} theme={theme} />}
        </UserContext.Consumer>
      )}
    </ThemeContext2.Consumer>
  );
}

// Если два или более значений контекста часто используются вместе, возможно,
// вам стоит рассмотреть создание отдельного компонента, который будет передавать оба значения дочерним компонентам
//  с помощью паттерна «рендер - пропс».

// Контекст использует сравнение по ссылкам, чтобы определить, когда запускать последующий рендер
// Из-за этого существуют некоторые подводные камни, например, случайные повторные рендеры потребителей,
// при перерендере родителя Provider - компонента

//  В следующем примере будет происходить повторный рендер потребителя каждый повторный рендер Provider-компонента,
// потому что новый объект, передаваемый в value, будет создаваться каждый раз:

App = class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{ something: 'something' }}>
        <div></div>
      </MyContext.Provider>
    );
  }
};

// Один из вариантов решения этой проблемы — хранение этого объекта в состоянии родительского компонента:

App = class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { something: 'something' },
    };
  }

  render() {
    return (
      <MyContext.Provider value={this.state.value}>
        <div></div>
      </MyContext.Provider>
    );
  }
};
export { App };
