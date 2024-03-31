import {Component} from "react";

export class Counter extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {count: 0}
        // 1.通过bind绑定this
        // this.add = this.add.bind(this)
    }

    //1.通过bind绑定this
    add() {
        this.setState({
            count: this.state.count + 1
        })
    }

    // 2.通过箭头函数帮this

    // add = () => {
    //     this.setState({
    //         count: this.state.count + 1
    //     })
    // }

    render() {
        return (
            <div>
                {/*<button onClick={this.add}>普通+1</button>*/}
                {/*3.通过标签箭头函数帮this*/}
                <button onClick={(e) => this.add()}>普通+1</button>
            </div>
        );
    }
}