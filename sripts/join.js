let name, description, email;
let year, genderMale, genderFemale;
let privateKey, confirmKey, combination;
let enjoyment, informative, hatefull;

$(document).ready(function () {

    $('#next1').click(function () {
        userName = $("#name").val();
        description = $("#description").val();
        email = $("#email").val();
        year = $("#year").val();
        gender = function () {
            if ($("#gender-male").is(':checked')) return "male";
            else if (genderFemale = $("#gender-female").is(':checked')) return "female"
        }

        if (userName == "" || description == "" || email == "" || year == "" || (genderMale == false && genderFemale == false)) {
            alert("Please fill all the fields");
        }
        else {
            setCookies("userName", userName, 30);
            setCookies("description", description, 30);
            setCookies("email", email, 30);
            setCookies("year", year, 30);
            setCookies("gender", gender(), 30);
            window.location.replace('/Catheriens/join/setup2/');
        }
    })

    $('#next2').click(function () {
        privateKey = $("#private-key").val();
        confirmKey = $("#confirm-key").val();
        combination = function () {

            if ($("#bs").is(':checked')) return "Bio-Science"
            else if ($("#cs").is(':checked')) return "Comp-Science"
            else if ($("#cm").is(':checked')) return "Commerce"
            else if ($("#hm").is(':checked')) return "Hummannities"
        };

        if (privateKey === undefined || confirmKey === undefined || combination === undefined) {
            alert("Please fill all the fields");
        }
        else if (privateKey != confirmKey) {
            alert("Private keys do not match");
        } else {
            setCookies("combination", combination(), 30);
            setCookies("privateKey", privateKey, 30)
            console.log(document.cookie);
            console.log(getCookies("email"));
            window.location.replace('/Catheriens/join/setup3/');
        }
    });

    $('#next3').click(function () {
        instagram = $("#profile1").val();
        snapchat = $("#profile2").val();
        twitter = $("#profile3").val();
        enjoyment = $("#enj").val();
        informative = $("#inf").val();
        hatefull = $("#htf").val();

        setCookies("instagram", instagram, 30);
        setCookies("snapchat", snapchat, 30);
        setCookies("twitter", twitter, 30);
        setCookies("enjoyment", enjoyment, 30);
        setCookies("informative", informative, 30);
        setCookies("Hatfull", hatefull, 30);

        window.location.replace('/Catheriens/join/setup4')
    });

    $('#upload').click(function () {
        console.log("Upload")
        var element = document.getElementById("file-upload")
        var image = element.src
        //window.open(image)
        //console.log(element)
        //output.onload = function () {
        //URL.revokeObjectURL(output.src) // free memory
        //}

        var file = element.files[0];
        //console.log(file)
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            var raw = reader.result.replace("data:image/jpeg;base64,", "")


            var settings = {
                "url": `https://api.github.com/repos/Erric-Muller/Test/contents/Users/User 3456/Profile/main.png`,
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

            $.ajax(settings).done(function (responsecode, statuscode, header) {
                console.log(statuscode);
                console.log(responsecode);
                console.log(header.status);
            });

        }
    })

    //cookies
    function setCookies(name, value, duration) {
        const date = new Date();
        date.setTime(date.getTime() + (duration * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    function deleteCookies(name) {
        setCookies(name, null, null)
    }

    function getCookies(name) {
        const cDecoded = decodeURIComponent(document.cookie);
        const cArray = cDecoded.split(';');
        let result = null;
        cArray.forEach(element => {
            if (element.indexOf(name) === 0) {
                result = element.substring(name.length + 1);
            }
        });

    }
});