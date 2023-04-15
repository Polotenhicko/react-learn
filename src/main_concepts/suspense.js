import { Suspense, useEffect, useState } from 'react';

function Artists() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log('useEffect'); // не сработает, т.к. мы выкинули промис
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(async (header) => {
        console.log('before');
        await new Promise((resolve) => {
          setTimeout(resolve, 1500);
        });
        console.log('after');
        return header.json();
      })
      .then((items) => {
        console.log(items);
        setIsLoading(false);
        setItems(items);
      });
  }, []);
  console.log(isLoading);
  if (isLoading)
    // если кидается промис, то suspense подумает что компонент ещё не загрузился и покажет fallback
    throw new Promise((res) => {
      setTimeout(() => res(), 3e3);
    });
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

export function Sus() {
  return (
    <Suspense fallback={'Загрузка...'}>
      <Artists />
    </Suspense>
  );
}
