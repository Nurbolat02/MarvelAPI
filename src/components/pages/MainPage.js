import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import { useState } from "react";
import ErrorBoundary from '../errorBoundary/ErrorBoundary'

const MainPage = () => {
    const [charId, setCharId] = useState(8)
    return (
        <>
            <RandomChar />
            <div className="char__content">
                <ErrorBoundary>
                    <CharList changeId={setCharId} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo heroId={charId} />
                    </ErrorBoundary>
                    <CharSearchForm />
                </div>
            </div>
        </>
    )
}

export default MainPage