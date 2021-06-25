import React, { useState } from 'react';
import clsx from 'clsx';
import {
    CardContent,
    CardActions,
    Collapse,
    IconButton,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import  ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

function NoFormIssueComponent() {
    return (
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2"> Good Form! </Typography>
        </CardContent>
    );

}

function OverstridingComponent() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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

export function analysisComponent(issue) {
    if (issue === "noissue") {
        return <NoFormIssueComponent />;
    } else if (issue === "overstriding") {
        return <OverstridingComponent />;
    }
}