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
    Radio, 
    Modal,
    IconButton
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../firebase';
import PoseCard from '../components/PoseCard'   

const useStyles = makeStyles((theme) => ({
    div: { padding: theme.spacing(4) },
    cardSection: { marginTop: theme.spacing(2) },
    paper: {
        width: "50%",
        top: "50%",
        left: "50%",
        transform: "translate(50%, 50%)",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

function CardCollection(props) {
    const [cards, setCards] = useState([[], [], []]); // first is IFF, second is midstance, and third is push off
    const [modalOpen, setModelOpen] = useState(false);
    const [src, setSrc] = useState("");
    const [stage, setStage] = useState("");
    const [error, setError] = useState("");
    const [ifError, setIfError] = useState(false);   
    const classes = useStyles();

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

    const openModal = () => {
        setModelOpen(true);
    };

    const closeModal = () => {
        setModelOpen(false);
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
                let cardComp = <Grid item alignItems="center" justifyContent="flex-start">
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
            <div className={classes.div}>
                <Typography variant="h5" component="h2"> 
                    Image Upload 
                    <IconButton type="button" onClick={openModal}> 
                        <InfoIcon fontSize="small" /> 
                    </IconButton>
                    <Modal open={modalOpen} onClose={closeModal}>
                        <div className={classes.paper}>
                            <h4>How To Check Your Form</h4>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Record yourself running from a side-on angle. Then, upload a still image of one of the three stride stages explained below.
                                Afterwards, a card will appear with the image and analysis below.
                            </Typography>
                            <h5>Initial Flat Foot</h5>
                            <Typography variant="body2" color="textSecondary" component="p">
                                The first time your foot is completely flat after landing.
                            </Typography>
                            <h5>Midstance</h5>
                            <Typography variant="body2" color="textSecondary" component="p">
                                The frame where both thighs are parallel with each other.
                            </Typography>
                            <h5>Push Off</h5>
                            <Typography variant="body2" color="textSecondary" component="p">
                                The frame where your head is at its highest point.
                            </Typography>
                        </div>
                    </Modal>
                </Typography>
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
            <div className={classes.div}>
                <Typography variant="h5" component="h2"> Analyzed Images </Typography>
                <Grid container direction="row" spacing={2} justifyContent="center" className={classes.cardSection}>
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
            </div>
        </>
    );
}

export default CardCollection;