$(document).ready(function() {
    $('#submit').click(function() {
        let name = $("#name").val();
        let description = $("#description").val();
        let email = $("#email").val();
        let year = $("#year").val();
        let genderMale = $("#gender-male").is(':checked');
        let genderFemale = $("#gender-female").is(':checked');

        if (name == "" || description == "" || email == "" || year == "" || (genderMale == false && genderFemale == false)) {
            alert("Please fill all the fields");
        } else {
            window.location.replace('setup2/');
        }

        
})});