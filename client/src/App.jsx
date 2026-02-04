import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      {" "}
      {/* Wrap in a Fragment to return a single element */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ensure this is here */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

// Simple Home component so the root path isn't blank
const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh]">
    <h1 className="text-4xl font-bold text-primary">Welcome to ChatterBox</h1>
    <p className="mt-4 text-base-content/70">
      Connect with your friends in real-time.
    </p>
  </div>
);

export default App;
