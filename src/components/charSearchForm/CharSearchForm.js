import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charSearchForm.scss";

const CharSearchForm = () => {
	const [charInfo, setCharInfo] = useState(null)
	const [result, setResult] = useState(null)
	const { error, getHeroByName } = useMarvelService()

	const getDataFromServer = (name) => {
		getHeroByName(name).then(renderData)
	}
	const renderData = (data) => {
		setCharInfo(data)
	}


	useEffect((

	) => {
		if (error) {
			setResult((
				<div className="char__search-critical-error">
					<ErrorMessage />
				</div>
			))
		} else if (charInfo !== null) {
			if (charInfo.length > 0) {
				setResult(
					<div className="char__search-wrapper">
						<div className="char__search-success">There is! Visit {charInfo[0].name} page?</div>
						<Link to={`/characters/${charInfo[0].id}`} className="button button__secondary">
							<div className="inner">To page</div>
						</Link>
					</div>
				);
			} else {
				setResult(
					<div className="char__search-error">
						The character was not found. Check the name and try again
					</div>
				);
			}
		}
	}, [charInfo])




	return (
		<div className="char__search-form">
			<Formik
				initialValues={{
					charName: '',
				}}
				validationSchema={Yup.object({
					charName: Yup.string().required()
				})}
				onSubmit={(values) => {
					getDataFromServer(values.charName)
				}}
			>


				<Form>
					<label className="char__search-label" htmlFor="charName">
						Or find a character by name:
					</label>
					<div className="char__search-wrapper">
						<Field
							name="charName"
							placeholder="write some hero"
							type="text"
							id="charName"
						/>
						<button
							className="button button__main"
							type="submit"

						>
							<div className="inner">find</div>
						</button>

					</div>
					<FormikErrorMessage
						className="char__search-error"
						component="div"
						name="charName"
					>
					</FormikErrorMessage>
				</Form>
			</Formik>
			{result}
		</div>

	);
};

export default CharSearchForm;
