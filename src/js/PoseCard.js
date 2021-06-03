import React from 'react';
import '../css/PoseCard.css'

class PoseCard extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    renderPose() {
        return(<Pose src={this.props.src} id={this.props.id}/>);
    }

    render() {
        return (
            <div className="card">
                {this.renderPose()}
            </div>
        );
    }
}

function Pose(props) {
    let image = <img src={props.src} id={"still-" + props.id} className="still" height="200px" width="200px"/>;
    let skeleton = <canvas id={"skel-" + props.id} className="skel" height="200px" width="200px"> </canvas>;

    return (
        <div className="frame">
            {image}
            {skeleton}
        </div>
    );

}

// function Analysis() {

// }

export default PoseCard;