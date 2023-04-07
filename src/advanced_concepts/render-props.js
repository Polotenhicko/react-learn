// Термин «рендер-проп» относится к возможности компонентов React разделять код между собой с помощью пропа,
// значение которого является функцией.

// Компонент с рендер-пропом берёт функцию, которая возвращает React-элемент, и вызывает её вместо реализации собственного рендера.
<DataProvider render={(data) => <h1>Привет, {data.target}</h1>} />;

// Использование рендер-пропа для сквозных задач
