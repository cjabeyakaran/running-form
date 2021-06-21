import React, {useState} from 'react';
import {
    Container, 
    Button,
    FormControl, 
    FormLabel,
    FormControlLabel,
    FormHelperText,
    RadioGroup,
    Radio 
} from '@material-ui/core';
import { db } from '../firebase';
import PoseCard from './PoseCard'

function CardCollection(props) {
    const [cards, setCards] = useState([]);
    const [newImgs, setNewImgs] = useState([]);
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

        setNewImgs([...newImgs, {src: src, stage: stage}]);
    };

    const getDataFromFirestore = () => {
        db.collection(props.user)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setCards([...cards, <PoseCard 
                    key={doc.id} 
                    id={doc.id} 
                    src={doc.data().src} 
                    upload={false} 
                    keypoints={doc.data().keypoints} 
                    analysis={doc.data().analysis} 
                />]);
            });
        });
    };

    if (cards.length === 0) {
        getDataFromFirestore();
    }

    newImgs.forEach((img) => {
        const id = Math.random().toString(36).substr(2, 9);
        setCards([...cards, <PoseCard 
            key={id} 
            id={id} 
            src={img.src} 
            stage={img.stage} 
            upload={true} 
            user={props.user} 
        />]);
    });

    return(
        <>
            <div className="upload">
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
            <Container>
                {cards}
            </Container>

        </>
    );
}

export default CardCollection;