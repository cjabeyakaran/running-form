import React from 'react';
import $ from 'jquery';
import FrameCard from './FrameCard';
import '../css/App.css'

class App extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	loadImage(input) {
		if (input.files[0]) {
			let reader = new FileReader();
			reader.onload = (e) => {
				$("#img-tag").attr("src", e.target.result);
			};
			reader.readAsDataURL(input.files[0]);
			let c = $("#skel")[0].getContext("2d");
			c.clearRect(0, 0, c.canvas.width, c.canvas.height);
		}
	}

	render() {
		return (
			<div class="upload">
        		<input type="file" id="img-upload" accept="image/*" crossOrigin='anonymous' onChange={() => {this.loadImage();}} /> 
    		</div>
		);
	}
}

export default App;
