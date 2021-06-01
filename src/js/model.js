modelSpec = {
    architecture: 'ResNet50',
    outputStride: 32,
    inputResolution: {width: 640, height: 640},
    quantBytes: 4
};

function calculatePose(image) {
    posenet.load(modelSpec).then(function(net) {
        return net.estimateMultiplePoses(image);
    }).then(function(poses){
        console.log(poses);
        drawLegs(poses[0]);
    });
}

function drawLegs(pose) {
    let ctx = $("#skel")[0].getContext("2d");
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



