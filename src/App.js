import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParentPage from "./components/ParentPage";
import ChildPage from "./components/ChildPage";
import PageNotFound from "./components/PageNotFound";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "bootstrap";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  //parent data which is passed to child-page (component)
  const [parent, setParent] = useState();
  //page number data which is passed to home ("/") page (component) in order to manage page Number
  const [pageNo, setPageNo] = useState(1);
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ParentPage setParent = {setParent} pageNo={pageNo} setPageNo={setPageNo}/>}/>
        {parent && <Route path="child-page" element={<ChildPage parent={parent}/>}/>}
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
