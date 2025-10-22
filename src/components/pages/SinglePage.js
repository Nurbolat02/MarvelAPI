import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";
import setContent from '../../utils/setContent';
const SinglePage = ({ Component, dataType }) => {
	const { id } = useParams();
	const [data, setData] = useState(null)
	const [result, setResult] = useState(null)
	const { getComicById, getOneHero, clearError, process, setProcess } = useMarvelService()

	useEffect(() => {
		clearError()
		switch (dataType) {
			case "comics":
				getComicById(id).then(renderData).then(setProcess('ready'))
				break;
			case "chars":
				getOneHero(id).then(renderData).then(setProcess('ready'))
				break;
			default:
				break;
		}
	}, [id])

	useEffect(() => {
		setResult(setContent(process, Component, data))
	}, [data])

	const renderData = (data) => {
		setData(data)
	}
	return result
};


export default SinglePage;
