import React from 'react';
import '../css/FrameCard.css'

class FrameCard extends React.PureComponent {
    render() {
        return (
            <div className="card">
                {<Frame src={this.props.src} id={this.props.id}/>}
            </div>
        );
    }
}

function Frame(props) {
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

export default FrameCard;