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
            window.location.replace('/setup1/');
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
            deleteCookies("privateKey");
            deleteCookies("confirmKey");
            console.log(document.cookie);
            console.log(getCookies("userName"));
        }
    });

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