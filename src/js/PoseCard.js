import React from 'react';
import * as posenet from '@tensorflow-models/posenet';
import '../css/PoseCard.css'

class PoseCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            keypoints: []
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
        let imgId = "still-" + this.props.id;
        let canvasId = "skel-" + this.props.id;

        this.calculatePose(imgId).then(
            () => {this.drawLegs(canvasId)}
        );
    }

    render() {
        return (
            <div className="card">
                <div className="card-image">
                    {<img src={this.props.src} id={"still-" + this.props.id} className="still" height="400px" width="400px"/>}
                    {<canvas id={"skel-" + this.props.id} className="skel" height="400px" width="400px"> </canvas>}
                </div>
                <div className="card-content">
                    <p>Hello</p>
                </div>
            </div>
        );
    }
}

export default PoseCard;