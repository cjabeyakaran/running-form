function calculatePose() {
    let video = $("#video-tag")[0];
    posenet.load({width: 360, height: 640}).then((net) => {
        console.log(video);
        const pose = net.estimateSinglePose(video);
        return pose;
    }).then((pose) => {
        console.log(pose);
    });
}

