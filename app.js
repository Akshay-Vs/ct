const app = Vue.createApp({
    data() {
        return {
            name: "Akshay Vs",
            gender: "male",
            shadow: "blue",
            picture: 'profile.jpg',
            combination: "Comp-Science",
            description: "Machine et trois personnes",
            btntxt: "Flush",
            enjoyment: "50%",
            informative: "20%",
            hatefull: "60%",
            check: "check",
            verified: "developer",
            instagram: "https://www.instagram.com/akshay._.vs__",
            twitter: "https://twitter.com/Akshay_vs__",
            snapchat: ""
        }
    },
    methods: {
        async getUser() {

            this.btntxt = "Loading"

            count = async function () {
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch("https://raw.githubusercontent.com/catherians-database/user_count/main/user_count", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            }

            res = async function () {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer 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");

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                await fetch("https://api.github.com/repos/catherians-database/user-base1/contents/Users/", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            }
            console.log(count());
            console.log(res());


            setTimeout(() => {
                this.picture = results[0].picture.large,
                    this.name = results[0].name.first + " " + results[0].name.last,
                    this.gender = results[0].gender,
                    this.btntxt = "Flush",
                    this.check = "null";
                if (this.gender == "male") this.shadow = "blue"
                else if (this.gender == "female") this.shadow = "pink";
                this.twitter = "https://twitter.com/" + this.name,
                    this.snapchat = "https://snapchat.com/" + this.name,
                    this.instagram = "https://www.instagram.com/" + this.name;
            }, 500)
        },
    }
})

app.mount('#app')