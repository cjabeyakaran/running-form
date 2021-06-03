import React from 'react';
import PoseCard from './PoseCard';
import '../css/App.css'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			srcs: new Set()
		};
	}

	loadImage = (e) => {
		e.preventDefault();
		let file = e.target.files[0];

		if (e.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (e) => {
				this.addSrc(reader.result);
			};
			reader.readAsDataURL(file);
		}
	}

	addSrc = (src) => {
		this.setState((state) => {
			let currSet = state.srcs;
			currSet.add(src);
			return {srcs: currSet};
		});
	}

	render() {
		let cards = [];
		this.state.srcs.forEach((src, index) => {
			cards.push(<PoseCard src={src} id={index}/>);
		});

		return (
			<>
				<div className="upload">
					<input type="file" id="img-upload" accept="image/*" crossOrigin='anonymous' onChange={this.loadImage} /> 
				</div>
				<div id="card-container">
					{cards}
				</div>
			</>
		);
	}
}

export default App;
