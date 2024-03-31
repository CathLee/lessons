// 事件委托

import {ChangeEvent, Component, MouseEventHandler} from "react";

export class SetStateDemo extends Component<any, any> {
    render() {
        return (
            <>
                <div onClick={this.clickDiv}>
                    <button onClick={this.addChange}>累加</button>
                </div>
            </>
        )
    }

    clickDiv = () => {
        console.log("div clicked")
    }
    // @ts-ignore
    addChange = (e) => {
        // e.stopPropagation()
        console.log("btn clicked")
    }
    // @ts-ignore
    bodyClickHandler = (e) => {
        console.log("bodyClickHandler")
    }

    componentDidMount() {
        console.log('hello')
        document.body.addEventListener("click", this.bodyClickHandler)

    }

    componentWillUnmount() {
        console.log('bye')
        console.log(document)
        document.body.removeEventListener("click", this.bodyClickHandler)
    }
}