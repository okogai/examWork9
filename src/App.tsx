import TransactionManagement from "./components/TransactionManagement/TransactionManagement.tsx";
import CategoryManagement from "./components/CategoryManagement/CategoryManagement.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<TransactionManagement />}></Route>
        <Route path="/categories" element={<CategoryManagement />}></Route>
        <Route
          path="*"
          element={<h1 style={{ textAlign: "center" }}>Page not found</h1>}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
