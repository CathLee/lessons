/*
 * @Date: 2024-02-22 20:54:15
 * @Description:
 */
import "./App.css";
import Comments from "./lessons_01/comments";
import TodoList from "./redux/Todos"
import GetRoute from "./router";
import {QueryClientProvider} from 'react-query';
import {queryClient} from "./api";
import {LoadingBoundary} from "./component/globalLoading";
function App() {
    return (
        <QueryClientProvider client={queryClient}>
        <div className="App">
            <div className="App-header">
                <LoadingBoundary>
                <GetRoute/>
                </LoadingBoundary>
            </div>
        </div>
        </QueryClientProvider>
    );
}

export default App;
