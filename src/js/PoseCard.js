import React from 'react';
import * as posenet from '@tensorflow-models/posenet';
import '../css/PoseCard.css'

class PoseCard extends React.PureComponent {
    render() {
        return (
            <div className="card">
                {<Pose src={this.props.src} id={this.props.id}/>}
            </div>
        );
    }
}

class Pose extends React.PureComponent {
    static defaultProps = {
        modelSpec: {
            architecture: 'ResNet50',
            outputStride: 32,
            inputResolution: {width: 200, height: 200},
            quantBytes: 4
        }
    };

    renderOverlay() {
        let imgId = "still-" + this.props.id;
        let canvasId = "skel-" + this.props.id;

        this.calculatePose(imgId, canvasId);
    }

    async calculatePose(imgId, canvasId) {
        const net = await posenet.load(this.props.modelSpec);
        let image = document.getElementById(imgId);
        const poses = await net.estimateMultiplePoses(image);
        console.log(poses);

        this.drawLegs(poses[0], canvasId);
    }

    drawLegs(pose, id) {
        let ctx = document.getElementById(id).getContext("2d");
        let points = pose.keypoints;
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
        this.renderOverlay();
    }

    render() {
        return (
            <div className="frame">
                {<img src={this.props.src} id={"still-" + this.props.id} className="still" height="200px" width="200px"/>}
                {<canvas id={"skel-" + this.props.id} className="skel" height="200px" width="200px"> </canvas>}
            </div>
        );
    }
}

// function Analysis() {

// }

export default PoseCard;