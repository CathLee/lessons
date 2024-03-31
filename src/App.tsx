/*
 * @Date: 2024-02-22 20:54:15
 * @Description:
 */
import "./App.css";
import Comments from "./lessons_01/comments";
import TodoList from "./redux/Todos"
import GetRoute from "./router";

function App() {
    return (
        <div className="App">
            <div className="App-header">
                <GetRoute/>
            </div>
        </div>
    );
}

export default App;
