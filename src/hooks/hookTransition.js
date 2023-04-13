import { useEffect, useState, useTransition } from 'react';

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

export function Search() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    startTransition(() => setSearch(e.target.value));
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments/')
      .then((res) => res.json())
      .then(setComments);
  });

  return (
    <div>
      <input type="text" onChange={handleSearch} />
      {isPending && <h1>Loading...</h1>}
      <Comments items={filterBySearch(comments, search)} />
    </div>
  );
}
