import React, { useState } from 'react';
import { 
	AppBar, 
	Toolbar,
	Button,
	Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/Dashboard.css';
import CardCollection from './CardCollection'

const useStyles = makeStyles((theme) => ({
	root: { flexGrow: 1 },
	title: { 
		edge: "start",
		flexGrow: 1 
	},
	button: {
		edge: "end",
		backgroundColor: theme.palette.secondary.light 
	}
}));

function Dashboard(props) {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const history = useHistory();
	const classes = useStyles();

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
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
					<Typography variant="h6" className={classes.title}>
						{currentUser.displayName}
					</Typography>
					{error && <Alert severity="error"> {error} </Alert>}
					<Button onClick={handlelogout} className={classes.button} > Log Out </Button>
					</Toolbar>
				</AppBar>
			</div>
			<CardCollection user={currentUser.uid}/>
		</>
	);
}

export default Dashboard;
