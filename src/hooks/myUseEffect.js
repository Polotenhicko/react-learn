console.clear();

let lastDeps = null;
let isMount = false;
let unmountCallback = null;

function myUseEffect(callback, deps) {
  if (lastDeps && lastDeps.length !== deps?.length) {
    console.error('Wrong quantity arguments in deps');
    return;
  }
  if (!isMount && deps && !deps.length) {
    isMount = true;
    unmountCallback = callback();
  }
  if (isMount) return;
  const hasChanges = deps?.some((v, i) => v !== lastDeps?.[i]);
  if (!hasChanges && deps) return;
  if (unmountCallback) unmountCallback();
  lastDeps = deps ? deps : lastDeps;
  unmountCallback = callback();
}

myUseEffect(() => {
  console.log('effect');
  return () => {
    console.log('unmount');
  };
}, []);

myUseEffect(() => {
  console.log('effect');
  return () => {
    console.log('unmount');
  };
}, [1, 2]);
