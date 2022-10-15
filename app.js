const app = Vue.createApp({
    data() {
        return {
            firstName: "John",
            lastName: "Wick",
            email:"Wick@john.com",
            gender:"male",
            picture: 'https://randomuser.me/api/portraits/men/10.jpg',
            cell: "046-8924-705",
            age: 30,
            btntxt:"Flush"
        }
    },
    methods: {
        async getUser() {
            const res = await fetch('https://randomuser.me/api')
            const { results } = await res.json()

            this.btntxt = "Loading"
            setTimeout(() => {
                this.picture= results[0].picture.large,
                this.firstName= results[0].name.first,
                this.lastName= results[0].name.last,
                this.email=results[0].email,
                this.gender=results[0].gender,
                this.cell = results[0].cell,
                this.age = results[0].dob.age
                this.btntxt = "Flush"
            }, 500)
        },


    }
})

app.mount('#app')