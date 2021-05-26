const net = poseNet.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    inputResolution: {width: 208, height: 308},
    multiplier: 0.75
});

function calculatePose(image) {
    // let poses = net.estimateSinglePost(image, {
    //     flipHorizontal: true
    // });

    posenet.load().then(function(net) {
        const pose = net.estimateSinglePose(image, {
          flipHorizontal: true
        });
        return pose;
      }).then(function(pose){
        console.log(pose);
      });
}

