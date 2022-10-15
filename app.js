const app = Vue.createApp({
    data() {
        return {
            name: "John",
            gender: "male",
            shadow: "pink",
            picture: 'https://randomuser.me/api/portraits/men/10.jpg',
            combination: "Comp-Science",
            description: "Hello world",
            btntxt: "Flush",
            enjoyment: "50%",
            informative: "20%",
            hatefull: "60%"
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
                    this.btntxt = "Flush";
                if (this.gender == "male") this.shadow = "blue"
                else if (this.gender == "female") this.shadow = "pink"
            }, 500)

        },


    }
})

app.mount('#app')