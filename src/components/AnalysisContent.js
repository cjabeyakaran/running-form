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

function NoFormIssueComponent() {
    return (
            <Typography gutterBottom variant="h5" component="h2"> Good Form! </Typography>
	);
}

function OverstridingComponent(props) {
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
							<li> Increase cadence from near 160 strikes per minute (spm) to near 170+ (spm) </li>
						</ul>
					</AccordionDetails>
				</Accordion>
			</Container>
		</>
    );
}

function LimpPostureComponent() {

}

function LockedPostureComponent() {

}

    return (
        <>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2"> Warning: Overstriding </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Overstriding occurs when the landing foot lands significantly in front of the center of mass (under the hips).
                    Think of it as a braking motion as you run. Click below to read more for signs and how to fix overstriding.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography paragraph> 
                    Concern: Increased impact goes through legs, especially shins and knees. Often times leads to shin splints and knee pain.
                </Typography>
                <Typography paragraph> Signs to look out for:</Typography>
                <ul>
                    <li> Knee or shin pain/soreness </li>
                    <li> Loud or heavy landings </li>
                    <li> Shoes more worn on the back, outside corner of running shoes </li>
                </ul>
                <Typography paragraph> Fixes:</Typography>
                <ul>
                    <li> Try landing closer to center of mass (under hips) </li>
                    <li> Increase cadence from near 160 strikes per minute (spm) to near 170+ (spm) </li>
                </ul>
            </Collapse>
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