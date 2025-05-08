import { useCallback, useState } from 'react';
import Child from './Child';

const App = () => {
  const [count, setCount] = useState(0);

  // ฟังก์ชันใหม่ทุกครั้งที่ re-render
  const handleClick = useCallback(() => {
    console.log('Current count:', count);
  }, [count]);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child onClick={handleClick} />
    </>
  );
};
export default App;
