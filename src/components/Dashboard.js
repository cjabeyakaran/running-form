import React from 'react';
import { Button } from '@material-ui/core';
import PoseCard from './PoseCard';
import { useAuth } from '../contexts/AuthContext'
import '../css/Dashboard.css'

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			srcs: []
		};
	}

	// handlelogout = () => {
	// 	const { logout } = useAuth();
		
	// 	try {
	// 		logout();
	// 		history.push("/login");
	// 	} catch {

	// 	}
	// }

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
			if (!currSet.includes(src)) {
				currSet.push(src);
			}
			return {srcs: currSet};
		});
	}

	render() {
		let cards = [];
		this.state.srcs.forEach((src, index) => {
			cards.push(<PoseCard key={index} src={src} id={index}/>);
		});

		return (
			<>
				{/* <div className="logout">
					<Button onClick={this.handlelogout}> Log Out </Button>
				</div> */}
				<div className="upload">
					<input type="file" id="img-upload" accept="image/*" crossOrigin='anonymous' onChange={this.loadImage} /> 
				</div>
				<div className="container" id="card-container">
					{cards}
				</div>
			</>
		);
	}
}

export default Dashboard;
