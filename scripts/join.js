let name, description, email;
let year, genderMale, genderFemale;
let privateKey, confirmKey, combination;
let enjoyment, informative, hatefull;
let uploadStatus = 0, retries = 0;
let token = "DfpWNZ9cfdQXpr68cSAI0jpCN77SI70WXpn6";
$(document).ready(function () {

    if (getCookies("userID") == null) $('#userID').text("Hello Anonymous");
    else $('#userID').text(`Hello  ${getCookies("userName")} #${getCookies("userID")}`);
    console.log("Hello " + getCookies("userID"));

    //setup

    $('#join').click(function () {
        if (getCookies("setup1") == "true") window.location.replace('/Catheriens/join/setup2/');
        else if (getCookies("setup2") == "true") window.location.replace('/Catheriens/join/setup3/');
        else if (getCookies("setup3") == "true") window.location.replace('/Catheriens/join/setup4/');
        else window.location.replace('/Catheriens/join/setup1/');
    })

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
            setCookies("setup1", "true", 30);
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
            else if ($("#hm").is(':checked')) return "Humanities"
        };

        if (privateKey === undefined || confirmKey === undefined || combination === undefined) {
            alert("Please fill all the fields");
        }
        else if (privateKey != confirmKey) {
            alert("Private keys do not match");
        } else {
            encryptedKey = CryptoJS.AES.encrypt(privateKey, privateKey);
            setCookies("setup2", "true", 30);
            setCookies("encryptedKey", encryptedKey, 30);
            setCookies("combination", combination(), 30);
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
        terms = $("#terms").is(':checked');

        setCookies("setup3", "true", 30);
        setCookies("instagram", instagram, 30);
        setCookies("snapchat", snapchat, 30);
        setCookies("twitter", twitter, 30);
        setCookies("enjoyment", enjoyment, 30);
        setCookies("informative", informative, 30);
        setCookies("hatefull", hatefull, 30);

        if(terms)window.location.replace('/Catheriens/join/setup4');
        else alert("You have to agree to the terms and conditions to continue");
    });

    $('#upload').click(function () {

        var element = document.getElementById("file-upload");
        var file = element.files[0];

        //window.open(image)
        //console.log(element)
        //output.onload = function () {
        //URL.revokeObjectURL(output.src) // free memory
        //}
        if (file == undefined) {
            alert("Uploaded image is not supported");
            $('#upload').on("Upload");
            return;
        }
        $('#upload').text("Uploading...");
        $('#upload').off('click');
        // Upload Image 
        console.log("Uploading...");
        updateCount();
        var userID = getCookies("userID");

        //console.log(file)


        data = `{"userName": "${getCookies("userName")}","description": "${getCookies("description")}","email": "${getCookies("email")}","year": "${getCookies("year")}","gender": "${getCookies("gender")}","combination": "${getCookies("combination")}","informative": "${getCookies("informative")}","enjoyment": "${getCookies("enjoyment")}","hatefull": "${getCookies("hatefull")}","instagram": "${getCookies("instagram")}","snapchat": "${getCookies("snapchat")}","twitter": "${getCookies("twitter")}","encryptedKey": "${getCookies("encryptedKey")}","UserID": "${userID}","verified": "undefined","check": "undefined"}`;

        data = btoa(data);
        uploadData(data, `User ${userID}/data.json`)

        //upload image
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            var raw = btoa(reader.result.replace("data:image/jpeg;base64,", ""));
            uploadData(raw, `User ${userID}/profile.png`)
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
                "Authorization": `Bearer ghp_${token}`,
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
                    window.location.replace(`/Catheriens/`);
                    deleteCookies("setup1");
                    deleteCookies("setup2");
                    deleteCookies("setup3");

                }
            }
            else if (statuscode == "error") {
                alert("Server Busy: Please try again");
            }
        });

        function update(content, url) {
            var settings = {
                "url": url,
                "method": "PUT",
                "timeout": 0,
                "headers": {
                    "Authorization": `Bearer ghp_${token}`,
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "message": "Create",
                    "content": `${content}`,
                    "sha": getCookies("sha")
                }),
            };

            $.ajax(settings).done(function (response) {
                if(statuscode=="success") console.log(response);
                else alert("Server Busy: Please try again");
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
                "Authorization": `Bearer ghp_${token}`,
                "Content-Type": "application/json"
            }
        };

        //update count
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
                    "Authorization": `Bearer ghp_${token}`,
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