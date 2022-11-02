var loadFile = function (event, element) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    //window.open(output.src)
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }

    var file = element.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        var raw = reader.result.replace("data:image/jpeg;base64,","")
    

    var settings = {
        "url": "https://api.github.com/repos/Erric-Muller/Test/contents/Testimage5.png",
        "method": "PUT",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "message": "Create",
            "content": raw
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}
};

