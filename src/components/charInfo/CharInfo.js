import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'
import { useState, useEffect, useRef } from 'react';
import setContent from '../../utils/setContent';
import { Link } from "react-router-dom";

const CharInfo = (props) => {
    const { process, setProcess, getOneHero, getAllHeroes, getAllComics } = useMarvelService();
    const [char, setChar] = useState(null);
    const [result, setResult] = useState(null)
    useEffect(() => {
        updateChar()
    }, [props.heroId])

    useEffect(() => {
        setResult(
            setContent(process, View, char)
        )
    }, [process, char])



    const updateChar = () => {
        const { heroId } = props;
        if (!heroId) {
            return
        }
        getOneHero(heroId)
            .then(((data) => {
                renderData(data);
            }))
            .then(() => {
                setProcess("ready")
            })
    }
    const renderData = (data) => {
        setChar(data)
    }
    return (
        <div className="char__info" >
            {result}
        </div>
    )


}
const View = (props) => {
    const { comics, description, home, id, name, thumbnail, wiki } = props.data

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <Link to={`/characters/${id}`} className="button button__main">
                            <div className="inner">homepage</div>
                        </Link>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? 'There is no comics ' : null}
                {console.log(comics)}
                {comics.items.map((item, index) => {
                    return (
                        <li key={index} className="char__comics-item">
                            {item}
                        </li>
                    )
                })}

            </ul>
        </>
    )
}
export default CharInfo;