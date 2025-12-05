import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {


  return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path="/neet/class-11" element={<Class11Program />} />
          <Route path="/neet/class-12" element={<Class12Program />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function Header() {
  return (
    <>
      <Link to="/">Home</Link> |
      <Link to="/neet/class-11">Class 11</Link> |
      <Link to="/neet/class-12">Class 12</Link>
    </>
  )
}


function LandingPage() {
  return (
    <h1>Landing Page</h1>
  )
}

function Class11Program() {

  return (
    <h1>Class 11 Program</h1>
  )
}

function Class12Program() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Class 12 Program</h1>
      <button onClick={() => navigate("/")}>Go Back</button>
    </>
  )
}

export default App
