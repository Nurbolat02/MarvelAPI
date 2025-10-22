import Skeleton from "../components/skeleton/Skeleton.js"
import Spinner from "../components/spinner/Spinner";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

const setContent = (process, Component, data) => {
    switch (process) {
        case "waiting":
            return <Skeleton />
        case "loading":
            return <Spinner />
        case "error":
            return <ErrorBoundary />
        case "ready":
            return <Component data={data} />
        default:
            break;
    }
}

export default setContent