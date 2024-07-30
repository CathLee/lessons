import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TodoList from "../redux/Todos";
import Comments from "../lessons_01/comments";
import {FC} from "react";
import {SetStateDemo} from "../classComponent/eventTarget";
import {TestState} from "../classComponent/setState";
import {Counter} from "../classComponent/this";
import PopoverDemo from "../classComponent/popoverDemo";
import UseLoadDemo from "../component/UseLoadDemo";
import CancelDuplicateRequest from "../component/CancelDuplicateRequest";

const GetRoute: FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<TodoList/>}/>
          <Route path="/comment" element={<Comments/>}/>
          <Route path="/event" element={<SetStateDemo/>}/>
          <Route path="/state" element={<TestState/>}/>
          <Route path="/count" element={<Counter/>}/>
          <Route path="/HOC" element={<PopoverDemo/>}/>
          <Route path="/load" element={<UseLoadDemo/>}/>
          <Route path="/cancelAxios" element={<CancelDuplicateRequest/>}/>
        </Routes>
      </Router>
  );
};

export default GetRoute;
