import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            error: false
        })
    }
    componentDidCatch(error, errorMessage) {
        console.log(error, errorMessage);
        this.onError()

    }
    onError = () => {
        this.setState({
            error: true
        })
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage></ErrorMessage>
        }
        else {
            return this.props.children
        }
    }
}
export default ErrorBoundary;