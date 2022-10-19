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
            const res = await fetch('https://randomuser.me/api')
            const { results } = await res.json()

            this.btntxt = "Loading"
            setTimeout(() => {
                this.picture = results[0].picture.large,
                    this.name = results[0].name.first + " " + results[0].name.last,
                    this.gender = results[0].gender,
                    this.btntxt = "Flush",
                    this.check = "null";
                if (this.gender == "male") this.shadow = "blue"
                else if (this.gender == "female") this.shadow = "pink";
                    this.twitter = "https://twitter.com/"+this.name,
                    this.snapchat = "https://snapchat.com/"+this.name,
                    this.instagram = "https://www.instagram.com/"+this.name;
            }, 500)
        },
    }
})

app.mount('#app')