import { useDeferredValue, useEffect, useState, useTransition, useMemo } from 'react';

function Comments({ items = [] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

const filterBySearch = (items, search) =>
  items.filter((item) => item.name.concat(item.body).includes(search));

function Search() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState('');
  // isPending - если true, то значт что сейчас показан рендер со старым значением стейта, который завёрнут в startTransition
  // и после рендера с новым значенем, произойдёт новый рендер
  // startTransition - передать callback, в котором будет изменение стейта
  const [isPending, startTransition] = useTransition();
  const handleSearch = (e) => {
    startTransition(() => {
      console.log('start transition');
      // значение search будет старое при первом рендере после начального
      setSearch(e.target.value);
    });
  };
  console.log(search);
  console.log(isPending);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments/')
      .then((res) => res.json())
      .then(setComments);
  }, []);

  return (
    <div>
      <input type="text" onChange={handleSearch} />
      {isPending && <h1>Loading...</h1>}
      <Comments items={filterBySearch(comments, search)} />
    </div>
  );
}

// по своей сути похож на useDeferredValue

// false
// --- что-то делаю
// startTransition
// true
// ---
// false

// если не дождаться 3 рендера

// false
// ---
// startTransition
// true
// --- что-то делаю
// startTransition
// true
// ---
// false

// пример с useDeferredValue
function Search2() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState('');
  const filter = useMemo(() => filterBySearch(comments, search), [comments, search]);
  const defValue = useDeferredValue(filter);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  console.log(search, defValue);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments/')
      .then((res) => res.json())
      .then(setComments);
  }, []);

  return (
    <div>
      <input type="text" onChange={handleSearch} />
      {/* отличие в том, что здесь теперь будет видно что комменты ещё и грузятся вначале */}
      {defValue !== filter && <h1>Loading...</h1>}
      <Comments items={defValue} />
    </div>
  );
}

export default Search2;
