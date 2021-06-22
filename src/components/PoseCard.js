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
            analysis: []
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

    calculateAnalysis() {
        this.setState({analysis: "All good!"})
    }

    drawLegs(id) {
        let ctx = document.getElementById(id).getContext("2d");
        let points = this.state.keypoints;
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        ctx.moveTo(points[11].position.x, points[11].position.y);
        ctx.lineTo(points[13].position.x, points[13].position.y);
        ctx.lineTo(points[15].position.x, points[15].position.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(points[12].position.x, points[12].position.y);
        ctx.lineTo(points[14].position.x, points[14].position.y);
        ctx.lineTo(points[16].position.x, points[16].position.y);
        ctx.stroke();
    }
        
    componentDidMount() {
        const imgId = "still-" + this.props.id;
        const canvasId = "skel-" + this.props.id;

        if (this.props.upload) {
            console.log(this.props);
            this.calculatePose(imgId)
            .then(() => this.addImageToFirestore())
            .then(() => this.drawLegs(canvasId));
        } else {
            this.setState({
                keypoints: this.props.keypoints, 
                analysis: this.props.analysis
            }, () => this.drawLegs(canvasId));
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
                        Analysis
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(PoseCard);