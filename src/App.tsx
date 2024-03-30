/*
 * @Date: 2024-02-22 20:54:15
 * @Description:
 */
import "./App.css";
import Comments from "./lessons_01/comments";
import TodoList from "./redux/Todos"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <div className="App-header">
                <Router>
                    <Routes>
                        <Route path="/" element={<TodoList/>}/>
                        <Route path="/comment" element={<Comments/>}/>
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
