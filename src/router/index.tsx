import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TodoList from '../redux/Todos';
import Comments from '../lessons_01/comments';
import {FC} from 'react';
import {SetStateDemo} from "../classComponent/eventTarget";
import {TestState} from "../classComponent/setState";
import {Counter} from "../classComponent/this";

const GetRoute: FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodoList/>}/>
                <Route path="/comment" element={<Comments/>}/>
                <Route path="/event" element={<SetStateDemo/>}/>
                <Route path="/state" element={<TestState/>}/>
                <Route path="/count" element={<Counter/>}/>
            </Routes>
        </Router>
    );
};

export default GetRoute;
