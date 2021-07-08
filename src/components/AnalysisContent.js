import React from 'react';
import {
	Container,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
	accordion: {}
}));

function NoFormIssueComponent() {
	return (
		<Typography gutterBottom variant="h5" component="h2"> Good Form! </Typography>
	);
}

function OverstridingComponent(props) {
	const classes = useStyles();
	return (
		<>
			<Typography gutterBottom variant="h5" component="h2"> Warning: Overstriding </Typography>
			<Typography variant="body2" color="textSecondary" component="p">
				Overstriding occurs when the landing foot lands significantly in front of the center of mass (under the hips).
				Think of it as a braking motion as you run. Click below to read more for signs and how to fix overstriding.
			</Typography>
			<Container>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h5" component="h3"> Concern </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography paragraph>
							Increased impact goes through legs, especially shins and knees. Often times leads to shin splints and knee pain.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h5" component="h3"> What to Look For in Stills</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul>
							<li> Knee or shin pain/soreness </li>
							<li> Loud or heavy landings </li>
							<li> Shoes more worn on the back, outside corner of running shoes </li>
						</ul>
					</AccordionDetails>
				</Accordion>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h5" component="h3"> Signs When Running </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul>
							<li> Knee or shin pain/soreness </li>
							<li> Loud or heavy landings </li>
							<li> Shoes more worn on the back, outside corner of running shoes </li>
						</ul>
					</AccordionDetails>
				</Accordion>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h5" component="h3"> Fixes </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul>
							<li> Try landing closer to center of mass (under hips) </li>
							<li> Increase cadence from near 160 strikes per minute (spm) to near 170+ spm </li>
						</ul>
					</AccordionDetails>
				</Accordion>
			</Container>
		</>
	);
}

function LimpPostureComponent(props) {
	return (
		<>
			<Typography gutterBottom variant="h5" component="h2"> Warning: Limp Posture </Typography>
			<Typography variant="body2" color="textSecondary" component="p">
				Limp posture occurs when one leads forwards too far. Click below to read more for signs and how to fix limp posture.
			</Typography>
			<Container>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h6" component="h3"> Concern </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography paragraph>
							Back pain, either near the neck and upper back.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h6" component="h3"> What to Look For in Stills </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul>
							<li> Body isn't leaning forwards </li>
							<li> Lower leg and torso form a "V" </li>
						</ul>
					</AccordionDetails>
				</Accordion>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h6" component="h3"> Signs When Running </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul>
							<li> Back completely upright </li>
							<li> Reaching in front of you when landing foot </li>
						</ul>
					</AccordionDetails>
				</Accordion>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h6" component="h3"> Fixes </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul>
							<li> Try leaning forwards from your hips, not ankles </li>
						</ul>
					</AccordionDetails>
				</Accordion>
			</Container>
		</>
	);
}

function LockedPostureComponent(props) {
	return (
		<>
			<Typography gutterBottom variant="h5" component="h2"> Warning: Limp Posture </Typography>
			<Typography variant="body2" color="textSecondary" component="p">
				Limp posture occurs when one leads backwards and is too upright while running. Click below to read more for signs and how to fix locked posture.
			</Typography>
			<Container>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h6" component="h3"> Concern </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography paragraph>
							Back pain, especially near the lower back.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h6" component="h3"> What to Look For in Stills </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul>
							<li> Nose in front of knee </li>
						</ul>
					</AccordionDetails>
				</Accordion>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h6" component="h3"> Signs When Running </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul>
							<li> Excessive curve in back </li>
							<li> Leaning from the hips </li>
						</ul>
					</AccordionDetails>
				</Accordion>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h6" component="h3"> Fixes </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul>
							<li> Try leaning forwards from your hips, not ankles </li>
						</ul>
					</AccordionDetails>
				</Accordion>
			</Container>
		</>
	);
}

function BoundingComponent(props) {
	return (
		<>
			<Typography gutterBottom variant="h5" component="h2"> Warning: Bounding </Typography>
			<Typography variant="body2" color="textSecondary" component="p">
				Bounding occurs when there is significant vertical movement than necessary to move forwards. Click below to read more for signs and how to fix bounding.
			</Typography>
			<Container>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h6" component="h3"> Concern </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography paragraph>
							Although it doesn't necessarily cause any injuries on its own, it worsens the effects of other running faults.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h6" component="h3"> What to Look For in Stills </Typography>
					</AccordionSummary>≈
					<AccordionDetails>
						<ul>
							<li> Foot not touching the ground </li>
						</ul>
					</AccordionDetails>
				</Accordion>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h6" component="h3"> Signs When Running </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul>
							<li> Feels like your body is working too hard for your speed </li>
							<li> Tightness in the calves </li>
							<li> Feels like head or objects ahead are bobbing up and down </li>
							<li> Low cadence (160ish steps per minute) </li>
						</ul>
					</AccordionDetails>
				</Accordion>
				<Accordion ref={props.transitionRef}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} >
						<Typography gutterBottom variant="h6" component="h3"> Fixes </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul>
							<li> Try pushing more with your glutes, not your calves </li>
							<li> Increase cadence from near 160 strikes per minute (spm) to near 170+ spm </li>
						</ul>
					</AccordionDetails>
				</Accordion>
			</Container>
		</>
	);
}

export function analysisComponent(issue, ref) {
	if (issue === "noissue") {
		return <NoFormIssueComponent />;
	} else if (issue === "overstriding") {
		return <OverstridingComponent transitionRef={ref} />;
	} else if (issue === "limp") {
		return <LimpPostureComponent transitionRef={ref} />;
	} else if (issue === "locked") {
		return <LockedPostureComponent transitionRef={ref} />;
	} else if (issue === "bounding") {
		return <BoundingComponent transitionRef={ref} />;
	}
}