import './randomChar.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState, useEffect, use } from "react";
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'
import setContent from '../../utils/setContent';
const RandomChar = () => {

    const [char, setChar] = useState({});
    const [result, setResult] = useState(null)
    const { getOneHero, process, setProcess } = useMarvelService();
    useEffect(() => {
        getDataFromServer()
    }, [])

    useEffect(() => {
        setResult(
            setContent(process, View, char)
        )
    }, [process, char])

    const getDataFromServer = () => {

        const id = Math.floor(Math.random() * 20 + 1)
        getOneHero(id)
            .then((data) => {
                renderDataFromServer(data);
            })
            .then(() => {
                setProcess("ready")
            })


    }

    const renderDataFromServer = (data) => {
        setChar(data)
    }



    return (
        <div className="randomchar">
            {result}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                    onClick={getDataFromServer}
                    className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )


}
const View = (props) => {

    const { comics, description, home, id, name, thumbnail, wiki } = props.data
    return (

        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={home} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default RandomChar;