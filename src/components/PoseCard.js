import React from 'react';
import * as posenet from '@tensorflow-models/posenet';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    withStyles
} from '@material-ui/core';
import { db } from '../firebase';
import { analysisComponent } from '../AnalysisContent';
import '../css/PoseCard.css'

const styles = {
    root: {
        maxWidth: 400
    },
    media: {
        height: 400,
        position: "relative"
    }
};

class PoseCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            keypoints: [],
            analysis: ""
        }
    }

    async calculatePose(imgId) {
        const modelSpec = {
            architecture: 'ResNet50',
            outputStride: 32,
            inputResolution: {width: 400, height: 400},
            quantBytes: 4
        }

        const net = await posenet.load(modelSpec);
        let image = document.getElementById(imgId);
        const poses = await net.estimateMultiplePoses(image);
        console.log(poses);

        this.setState({keypoints: poses[0].keypoints});
    }

    async addImageToFirestore() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        await db.collection(this.props.user).doc(this.props.id).set({
            date: today,
            src: this.props.src,
            stage: this.props.stage,
            keypoints: this.state.keypoints,
            analysis: this.state.analysis
        })
        .then(() => console.log("Document successfully written!"))
        .catch((error) => console.error("Error writing document: ", error));
    }

    calculateVectorAngle(w, v) {
        let dot = (w.dx * v.dx) + (w.dy * v.dy);
        let wNorm = Math.sqrt(Math.pow(w.dx, 2) + Math.pow(w.dy, 2));
        let vNorm = Math.sqrt(Math.pow(v.dx, 2) + Math.pow(v.dy, 2));
        return Math.acos(dot/(wNorm * vNorm));
    }

    analyzeIFF(id) {
        let leftAnkle = this.state.keypoints[15].position;
        let rightAnkle = this.state.keypoints[16].position;
        let ankle, knee;

        // check which foot is landing
        if (leftAnkle.y > rightAnkle.y) {
            ankle = leftAnkle;
            knee = this.state.keypoints[13].position;
        } else {
            ankle = rightAnkle;
            knee = this.state.keypoints[14].position;
        }
    
        let shoulder, hip;
        // check where runner is facing
        if (this.state.keypoints[3].score > this.state.keypoints[4].score) {
            // left side towards us
            shoulder = this.state.keypoints[5].position;
            hip = this.state.keypoints[11].position;
        } else {
            // right side towards us
            shoulder = this.state.keypoints[6].position;
            hip = this.state.keypoints[12].position;
        }

        let legVector = {dx: knee.x - ankle.x, dy: knee.y - ankle.y};
        let torsoVector = {dx: shoulder.x - hip.x, dy: shoulder.y - hip.y};
        
        let angleLegTorso = this.calculateVectorAngle(legVector, torsoVector);
        let angleLegGround = this.calculateVectorAngle(legVector, {dx: 1, dy: 0});

        // if legs and torso vectors aren't close to parallel
        // or if leg lands close to vertical 
        // most likely to be overstriding
        let ifOverstriding = (angleLegTorso > 0.18) || (angleLegGround > 1.5);
        if (! ifOverstriding) {
            this.setState({analysis: "noissue"});
        } else {
            this.setState({analysis: "overstriding"});
        }

        // draw leg and torso vectors
        let ctx = document.getElementById(id).getContext("2d");
        ctx.strokeStyle = ifOverstriding ? "#FF0000" : "#00FF00";
        ctx.beginPath();
        ctx.moveTo(shoulder.x, shoulder.y);
        ctx.lineTo(hip.x, hip.y);
        ctx.stroke();

        ctx.moveTo(knee.x, knee.y);
        ctx.lineTo(ankle.x, ankle.y);
        ctx.stroke();
    }

    analyzeMid(id) {

    }

    analyzePushOff(id) {

    }

    calculateAnalysis(id) {
        if (this.props.stage === "iff") {
            this.analyzeIFF(id);
        } else if (this.props.stage === "mid") {
            this.analyzeMid(id);
        } else if (this.props.stage === "push") {
            this.analyzePushOff(id);
        }
    }
        
    componentDidMount() {
        const imgId = "still-" + this.props.id;
        const canvasId = "skel-" + this.props.id;

        if (this.props.upload) {
            this.calculatePose(imgId)
            .then(() => this.calculateAnalysis(canvasId))
            .then(() => this.addImageToFirestore());
        } else {
            this.setState({
                keypoints: this.props.keypoints, 
                analysis: this.props.analysis
            }, () => console.log("Loaded from firestore")); // call appropriate draw function for the specific stance
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.root}> 
                <CardMedia className={classes.media}>
                    {<img src={this.props.src} alt="" id={"still-" + this.props.id} className="still" height="400px" width="400px" />}
                    {<canvas id={"skel-" + this.props.id} className="skel" height="400px" width="400px"> </canvas>}
                </CardMedia>
                <CardContent>
                    <Typography>
                        {analysisComponent(this.state.analysis)}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(PoseCard);