import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/Dashboard.css';
import CardCollection from './CardCollection';

function Dashboard(props) {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const history = useHistory();

	const handlelogout = () => {
		try {
			logout();
			history.push("/login");
		} catch {
			setError("Failed to log out");
		}
	};

	return (
		<>
			<div className="logout">
				{error && <Alert severity="error"> {error} </Alert>}
				<Button onClick={handlelogout}> Log Out </Button>
			</div>
			<CardCollection user={currentUser.uid}/>
		</>
	);
}

export default Dashboard;
