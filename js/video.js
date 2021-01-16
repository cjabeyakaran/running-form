$("#vid-upload").change(readVideo);

function readVideo(event) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.onload = $.proxy(function (e) {
            console.log('loaded');
            $("#video-source").attr("src", e.target.result);
            $("#video-tag")[0].load();
        }, this);

        reader.readAsDataURL(event.target.files[0]);
    }
}