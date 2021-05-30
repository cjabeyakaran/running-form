function loadImage(input) {
    if (input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            $("#img-tag").attr("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
        let c = $("#skel")[0].getContext("2d");
        c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    }

    let img = $("#img-tag")[0];
    calculatePose(img);
}

