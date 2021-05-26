function loadImage(input) {
    if (input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            $("#img-tag").attr("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }

    let img = $("#img-tag")[0];
    calculatePose(img);
}

