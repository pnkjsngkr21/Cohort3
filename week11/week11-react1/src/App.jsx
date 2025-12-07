import { useState } from 'react';
import './App.css';
import { useDebounce } from './hooks/useDebounce';

function useCounter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
  }

  return {
    count: count,
    increaseCount: increaseCount
  }
}

function App() {
  const debounceFn = useDebounce(300);
  const [post, setPost] = useState(null);

  async function getPost(value) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/" + value);
    const data = await response.json();
    setPost(data);
  }

  function callGetPost(e) {
    debounceFn(() => getPost(e.target.value));
  }

  return (
    <>
      <input onChange={callGetPost} />
      {post ? (
        <div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ) : (
        <p>No post loaded</p>
      )}

    </>
  );
}

export default App
