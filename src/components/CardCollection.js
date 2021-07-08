import React, {useState} from 'react';
import {
    Grid, 
    Button,
    Typography,
    FormControl, 
    FormLabel,
    FormControlLabel,
    FormHelperText,
    RadioGroup,
    Radio 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../firebase';
import PoseCard from './PoseCard'

function CardCollection(props) {
    const [cards, setCards] = useState([[], [], []]); // first is IFF, second, is 
    const [src, setSrc] = useState("");
    const [stage, setStage] = useState("");
    const [error, setError] = useState("");
    const [ifError, setIfError] = useState(false);    

    const handleImage = (e) => {
		e.preventDefault();
		let file = e.target.files[0];

		if (e.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (e) => {
				setSrc(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRadioGroup = (e) => {
		setStage(e.target.value);
		setError('');
		setIfError(false);
	};

	const handleSubmit = (e) => {
        e.preventDefault();
        if ((stage === "") || (src === "")) {
            setError("Must upload picture and select type of frame");
        }
        const id = Math.random().toString(36).substr(2, 9);

        let cardComp = <Grid item alignItems="center" justifyContent="flex-start">
            <PoseCard 
                key={id} 
                id={id} 
                src={src} 
                stage={stage} 
                upload={true} 
                user={props.user} 
            />
        </Grid>;
        if (stage === "iff") {
            setCards([[cardComp, ...cards[0]], cards[1], cards[2]]);
        } else if (stage === "mid") {
            setCards([cards[0], [cardComp, ...cards[1]], cards[2]]);
        } else if (stage === "push") {
            setCards([cards[0], cards[1], [cardComp, ...cards[2]]]);
        }
    };

    const getDataFromFirestore = () => {
        db.collection(props.user)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let cardComp = <Grid item >
                    <PoseCard
                        key={doc.id} 
                        id={doc.id} 
                        src={doc.data().src} 
                        upload={false} 
                        keypoints={doc.data().keypoints} 
                        analysis={doc.data().analysis} 
                    />
                </Grid>;
                if (stage === "iff") {
                    setCards([[cardComp, ...cards[0]], cards[1], cards[2]]);
                } else if (stage === "mid") {
                    setCards([cards[0], [cardComp, ...cards[1]], cards[2]]);
                } else if (stage === "push") {
                    setCards([cards[0], cards[1], [cardComp, ...cards[2]]]);
                }
            });
        });
    };

    if (cards.length === 0) {
        getDataFromFirestore();
    }

    return(
        <>
            <div className="upload">
            <Typography variant="h5" component="h2"> Image Upload </Typography>
                <form onSubmit={handleSubmit}>
                    <input type="file" id="img-upload" accept="image/*" crossOrigin='anonymous' onChange={handleImage} /> 
                    <FormControl component="fieldset" error={ifError}>
                        <FormLabel component="legend">Stride Stage</FormLabel>
                        <RadioGroup name="stage" value={stage} onChange={handleRadioGroup}>
                            <FormControlLabel value="iff" control={<Radio />} label="Initial Flat Foot" />
                            <FormControlLabel value="mid" control={<Radio />} label="Midstance" />
                            <FormControlLabel value="push" control={<Radio />} label="Push Off" />
                        </RadioGroup>
                        <FormHelperText>{error}</FormHelperText>
                        <Button type="submit"> Calculate </Button>
                    </FormControl>
                </form>
            </div>
            <Typography variant="h5" component="h2"> Analyzed Images </Typography>
            <Grid container direction="row" spacing={2} justifyContent="center">
                <Grid item container xs direction="column" spacing={2} alignItems="center">
                    <Typography variant="h6" component="h3"> Initial Flat Foot </Typography>
                    {cards[0]}
                </Grid>
                <Grid item container xs direction="column" spacing={2} alignItems="center">
                    <Typography variant="h6" component="h3"> Midstance </Typography>
                    {cards[1]}
                </Grid>
                <Grid item container xs direction="column" spacing={2} alignItems="center">
                    <Typography variant="h6" component="h3"> Push Off </Typography>
                    {cards[2]}
                </Grid>
            </Grid>
        </>
    );
}

export default CardCollection;