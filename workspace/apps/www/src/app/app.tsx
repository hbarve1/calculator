// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../routes/home';
// import Navigation from "../components/navigation";

export function App() {
  return (
    <>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
