let name, description, email;
let year, genderMale, genderFemale;
let privateKey, confirmKey, combination;
let enjoyment, informative, hatefull;
let uploadStatus = 0, retries = 0;
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
            encryptedKey = CryptoJS.AES.encrypt(privateKey, privateKey);
            setCookies("privateKey", encryptedKey, 30);
            setCookies("combination", combination(), 30);
            setCookies("privateKey", privateKey, 30)
            console.log(document.cookie);
            console.log(getCookies("email"));
            console.log(encryptedKey);
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

        // Upload Image 

        var element = document.getElementById("file-upload");
        var image = element.src;
        //window.open(image)
        //console.log(element)
        //output.onload = function () {
        //URL.revokeObjectURL(output.src) // free memory
        //}

        updateCount();
        var userID = getCookies("userID");

        var file = element.files[0];
        //console.log(file)
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            var raw = reader.result.replace("data:image/jpeg;base64,", "");
            uploadData(raw, `User ${userID}/profile.png`);
        }


        data = `
                "userName": "${getCookies("userName")}",
                "description": "${getCookies("description")}",
                "email": "${getCookies("email")}",
                "year": "${getCookies("year")}",
                "gender": "${getCookies("gender")}",
                "combination": "${getCookies("combination")}",
                "informative": "${getCookies("informative")}",
                "enjoyment": "${getCookies("enjoyment")}",
                "hatefull": "${getCookies("hatefull")}",
                "instagram": "${getCookies("instagram")}",
                "snapchat": "${getCookies("snapchat")}",
                "twitter": "${getCookies("twitter")}",
                "privateKey": "${getCookies("privateKey")}",
                "encryptedKey": "${getCookies("encryptedKey")}",
                "UserID": "${userID}"`;

        data = btoa(data);
        uploadData(data, `User ${userID}/data.json`)

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
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function uploadData(content, path) {
        var settings = {
            "url": `https://api.github.com/repos/catherians-database/user-base1/contents/Users/${path}`,
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "message": "Create",
                "content": content
            }),
        };

        $.ajax(settings).done(function (response, statuscode, header) {
            //console.log(statuscode);
            //console.log(response);
            console.log(header.status);
            if (statuscode == "success") {
                uploadStatus += 1;

                if (uploadStatus >= 2) {
                    //window.location.replace(`/Catheriens/`);
                }
            }
            else if (statuscode == "error") {
                uploadData(content, path);
            }
        });

        function update(content, url) {
            var settings = {
                "url": url,
                "method": "PUT",
                "timeout": 0,
                "headers": {
                    "Authorization": "Bearer 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",
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "message": "Create",
                    "content": `${content}`,
                    "sha": getCookies("sha")
                }),
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
            });
        }

    }

    function updateCount() {
        //Get count
        deleteCookies("UserID")
        var settings = {
            "url": "https://api.github.com/repos/catherians-database/user_count/contents/user_count",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            }
        };

        $.ajax(settings).done(function (response) {
            var count = response.content;
            count = atob(count);
            count = parseInt(count);
            count += 1;
            count = count.toString();
            count = count
            setCookies("userID", count, 365);
            count = btoa(count);

            var settings = {
                "url": "https://api.github.com/repos/catherians-database/user_count/contents/user_count",
                "method": "PUT",
                "timeout": 0,
                "headers": {
                    "Authorization": "Bearer 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",
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "message": "Create",
                    "content": `${count}`,
                    "sha": response.sha
                }),
            };

            $.ajax(settings).done(function (response, statuscode, header) {
                console.log("Count updated");
                if (header.statuscode == "error") {
                    if (retries < 5) {
                        retries += 1;
                        updateCount();
                    } else {
                        console.log("Error updating count")
                    }
                }

            });
        });
    }
});