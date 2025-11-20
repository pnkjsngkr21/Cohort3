import { useEffect } from "react";
import { useState } from "react";

function App() {
  return (
    <div>
      Hi There!
      <Counter></Counter>
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  )
}

export default App
