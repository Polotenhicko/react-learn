console.clear();

function myUseEffect(calback, current) {
  let clearEffect;
  let isMount = !current.length;
  return function func(deps) {
    if (deps.length !== current.length) {
      console.error(
        'Warning: The final argument passed to useEffect changed size between renders. The order and size of this array must remain constant.'
      );
      return;
    }
    if (isMount) {
      isMount = false;
      const resultCb = calback();
      return typeof resultCb === 'function' ? resultCb : undefined;
    }
    const hasChanges = deps.some((v, i) => v !== current[i]);
    if (!hasChanges) return;
    if (clearEffect) clearEffect();
    const resultCb = calback();
    current = deps;
    clearEffect = typeof resultCb === 'function' ? resultCb : undefined;
    return clearEffect;
  };
}

let a = 'a';
let b = 'b';

const memo = myUseEffect(() => {
  console.log('effect');
  return () => {
    console.log('unmount');
  };
}, [1, 2]);

memo([a, b]); // no changes
// memo([10, "жопа"]); // changed
// memo([15, 10, 15, "жопа"]); // changed
// memo([15, 10, 15, "жопа"]); // no changes
// memo([15, 1, "жопа"]); // changed
