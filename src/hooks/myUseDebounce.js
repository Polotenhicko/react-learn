import { useEffect, useState } from 'react';

export function useDebounce(value, { timeoutMS } = { timeoutMS: 0 }) {
  const [debValue, setDebValue] = useState(value);
  useEffect(() => {
    const timeout =
      value !== debValue &&
      setTimeout(() => {
        setDebValue(value);
      }, timeoutMS);
    return () => clearTimeout(timeout);
  }, [value, debValue]);
  return [debValue, value !== debValue];
}

export function SimpleForm() {
  const [value, setValue] = useState('');
  const [debValue, isPending] = useDebounce(value, { timeoutMS: 500 });
  const onChange = (e) => setValue(e.target.value);
  return (
    <div>
      <input value={value} onChange={onChange} />
      <div>Вы ввели: {value}</div>
      <div>Вы ищите: {debValue}</div>
    </div>
  );
}
