import React from 'react';
import * as posenet from '@tensorflow-models/posenet';
import {
    Card,
    CardMedia,
    withStyles
} from '@material-ui/core';
import { db } from '../firebase';
import { analysisComponent } from './AnalysisContent';
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

        // this.setState({keypoints: poses[0].keypoints});
        return poses[0];
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

    analyzeIFF(keypoints) {
        let leftAnkle = keypoints[15].position;
        let rightAnkle = keypoints[16].position;
        let ankle, knee;

        // check which foot is landing
        if (leftAnkle.y > rightAnkle.y) {
            ankle = leftAnkle;
            knee = keypoints[13].position;
        } else {
            ankle = rightAnkle;
            knee = keypoints[14].position;
        }
    
        let shoulder, hip;
        // check where runner is facing
        if (keypoints[3].score > keypoints[4].score) {
            // left side towards us
            shoulder = keypoints[5].position;
            hip = keypoints[11].position;
        } else {
            // right side towards us
            shoulder = keypoints[6].position;
            hip = keypoints[12].position;
        }

        this.setState({keypoints: {shoulder: shoulder, hip: hip, knee: knee, ankle: ankle}});

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
    }

    drawIff(id) {
        // draw leg and torso vectors
        let ctx = document.getElementById(id).getContext("2d");
        ctx.strokeStyle = (this.state.analysis === "noissue") ? "#00FF00" : "#FF0000";
        ctx.beginPath();
        ctx.moveTo(this.state.keypoints.shoulder.x, this.state.keypoints.shoulder.y);
        ctx.lineTo(this.state.keypoints.hip.x, this.state.keypoints.hip.y);
        ctx.stroke();

        ctx.moveTo(this.state.keypoints.knee.x, this.state.keypoints.knee.y);
        ctx.lineTo(this.state.keypoints.ankle.x, this.state.keypoints.ankle.y);
        ctx.stroke();
    }

    analyzeMid(id) {

    }

    analyzePushOff(id) {

    }

    calculateAnalysis(pose) {
        let keypoints = pose.keypoints;
        if (this.props.stage === "iff") {
            this.analyzeIFF(keypoints);
        } // else if (this.props.stage === "mid") {
        //     this.analyzeMid(id);
        // } else if (this.props.stage === "push") {
        //     this.analyzePushOff(id);
        // }
    }

    draw(id) {
        if (this.props.stage === "iff") {
            this.drawIff(id);
        } // else if (this.props.stage === "mid") {
        //     this.analyzeMid(id);
        // } else if (this.props.stage === "push") {
        //     this.analyzePushOff(id);
        // }
    }
        
    componentDidMount() {
        const imgId = "still-" + this.props.id;
        const canvasId = "skel-" + this.props.id;

        if (this.props.upload) {
            this.calculatePose(imgId)
            .then((pose) => this.calculateAnalysis(pose))
            .then(() => this.draw(canvasId))
            .then(() => this.addImageToFirestore());
        } else {
            this.setState({
                keypoints: this.props.keypoints, 
                analysis: this.props.analysis
            }, () => {
                console.log("Loaded from firestore");
                this.draw(canvasId);
            }); // call appropriate draw function for the specific stance
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
                {/* {analysisComponent(this.state.analysis)} */}
            </Card>
        );
    }
}

export default withStyles(styles)(PoseCard);