import {Component} from "react";

export class TestState extends Component {
    state = {
        count: 0
    };

    componentDidMount() {
        this.setState({count: this.state.count + 1});
        console.log(this.state.count);

        this.setState({count: this.state.count + 1});
        console.log(this.state.count);

        // 宏任务
        setTimeout(() => {
            this.setState({count: this.state.count + 1});
            console.log(this.state.count);

            this.setState({count: this.state.count + 1});
            console.log(this.state.count);
        }, 0);
    }

    render() {
        return null;
    }
};

// react 16时 只有React的合成事件和生命周期方法中的setState调用会被批处理合并
// 于是在生命周期阶段setState为合并‘异步’任务
// 但在setTimout宏任务阶段，会执行合并结果 两个setState变成一个，即1
// 然后在类似同步执行setState
// 0 0 2 3

// 但在react18后， 这些阶段的setState都会在彼此的阶段内，被批量合并成一个事件
// 1.React合成事件：这是React封装的DOM事件，如用户点击、输入等。
//
// 2.生命周期方法：类组件中的生命周期方法，如componentDidMount和componentDidUpdate。
//
// 3.异步操作：例如，在setTimeout、setInterval或者Promise回调中的setState。
//
// 4.原生事件处理函数：直接添加到DOM元素的事件监听器中的setState。
//
// 5.请求回调：如在fetch请求或者axios请求的.then或.catch回调中的setState。
// 0 0 1 1