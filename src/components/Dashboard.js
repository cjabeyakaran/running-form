import React, { useState } from 'react';
import { 
	AppBar, 
	Toolbar,
	Button,
	Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/Dashboard.css';
import CardCollection from './CardCollection'

function Dashboard(props) {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const history = useHistory();

	const handlelogout = async () => {
		try {
			await logout();
			history.push("/login");
		} catch {
			setError("Failed to log out");
		}
	};

	return (
		<>
			<AppBar position="static">
				<Toolbar>
				<Typography variant="h6">
					{currentUser.displayName}
				</Typography>
				<div className="logout">
					{error && <Alert severity="error"> {error} </Alert>}
					<Button onClick={handlelogout}> Log Out </Button>
				</div>
				</Toolbar>
			</AppBar>
			<CardCollection user={currentUser.uid}/>
		</>
	);
}

export default Dashboard;
