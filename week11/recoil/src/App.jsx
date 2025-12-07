import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import './App.css'
import { counterAtom, evenSelector } from './store/atoms/counter'



function App() {

  return (
    <>
      <RecoilRoot>
        <Counter />
      </RecoilRoot>
    </>
  )
}


function Counter() {
  return (
    <div>
      <DisplayCounter />
      <IsEven/>
      <Increase />
      <Decrease />
    </div>
  )
}

function DisplayCounter() {
  const count = useRecoilValue(counterAtom);
  return (
    <div>
      {count}
    </div>
  )
}

function IsEven(){
  const IsEven = useRecoilValue(evenSelector);

  return(
    <div>
      {IsEven? "True" : "False"}
    </div>
  )
}

function Increase() {
  const setCount = useSetRecoilState(counterAtom);

  function increase() {
    setCount(c => c + 1);
  }
  return (
    <div>
      <button onClick={increase}>Increase</button>
    </div>
  )
}

function Decrease() {
  const setCount = useSetRecoilState(counterAtom);

  function decrease() {
    setCount(c => c - 1);
  }
  return (
    <div>
      <button onClick={decrease}>Decrease</button>
    </div>
  )
}

export default App
