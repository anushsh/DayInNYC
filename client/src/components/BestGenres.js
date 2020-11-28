import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenre extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "",
			decades: [],
			genres: []
		};

		this.submitDecade = this.submitDecade.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		fetch("http://localhost:8081/decades", {
			method: 'GET' // The type of HTTP request.
			})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(genreList => {
				if (!genreList) return;
				let decadeDivs = genreList.map((decadeObj, i) =>
				<option value={decadeObj.decade}> {decadeObj.decade}s </option>
				);
				this.setState({
				decades: decadeDivs
				})
			})
			.catch(err => console.log(err))	// Print the error if there is one.
	}

	handleChange(e) {
		this.setState({
			selectedDecade: e.target.value
		});
	}

	/* ---- Q3b (Best Genres) ---- */
	submitDecade() {
		// Send an HTTP request to the server.
		fetch(`http://localhost:8081/bestGenres/${this.state.selectedDecade}`, {
		method: 'GET' // The type of HTTP request.
		})
		.then(res => res.json()) // Convert the response data to a JSON.
		.then(genreList => {
			if (!genreList) return;
			let genreDivs = genreList.map((genreObj, i) =>
			<BestGenreRow genre={genreObj.genre} rating={genreObj.rating}/>
			);
			this.setState({
			genres: genreDivs
			})
		})
		.catch(err => console.log(err))	// Print the error if there is one.
	}

	render() {

		return (
			<div className="BestGenres">
				<PageNavbar active="bestgenres" />

				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h5">Best Genres</div>

			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedDecade} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
			            	<option select value> -- select an option -- </option>
			            	{this.state.decades}
			            </select>
			            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitDecade}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Genre</strong></div>
			            <div className="header"><strong>Average Rating</strong></div>
			          </div>
			          <div className="movies-container" id="results">
			            {this.state.genres}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}