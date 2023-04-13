import { useState, useDeferredValue, Suspense, useEffect, useMemo } from 'react';

const items = [
  {
    id: 1,
    name: 'aa',
  },
  {
    id: 2,
    name: 'bb',
  },
  {
    id: 3,
    name: 'cc',
  },
  {
    id: 4,
    name: 'dd',
  },
];

function SearchResultList({ items }) {
  return (
    <ul>
      {items.map((itemObj) => (
        <li key={itemObj.id}>
          <span>{itemObj.name}</span>
        </li>
      ))}
    </ul>
  );
}

function SearchResultItem({ item }) {
  return (
    <ul>
      <li key={item.id}>
        <span>{item.name}</span>
      </li>
    </ul>
  );
}

const cache = new Map();

function fetchData(query) {
  if (!cache.has(query)) {
    cache.set(query, getData(query));
  }
  return cache.get(query);
}

async function getData(query) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
  const item = items.find((obj) => obj.name === query);
  return item ? item : null;
}

function SearchSuggestion({ itemName }) {
  const [searchObj, setSearchObj] = useState('');

  // имитация запроса
  fetchData(itemName).then(setSearchObj);

  if (itemName === '') return <SearchResultList items={items} />;
  if (searchObj === null) return `No matches for "${itemName}"`;
  return <SearchResultItem item={searchObj} />;
}

export function App() {
  const [value, setValue] = useState('');
  const defferValue = useDeferredValue(value);

  const suggestions = useMemo(
    () => <SearchSuggestion itemName={defferValue} />,
    [defferValue]
  );
  return (
    <div className="App">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Suspense fallback={<h1>Загрузка....</h1>}>{suggestions}</Suspense>
    </div>
  );
}
