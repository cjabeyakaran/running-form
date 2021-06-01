import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';
import App from './js/App'

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	$('#root')[0]
);
