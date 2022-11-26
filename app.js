const app = Vue.createApp({
  data() {
    return {
      name: "Hey!",
      gender: "male",
      shadow: "blue",
      picture: 'Ct.gif ',
      combination: "Explore Catheriens!",
      description: "Click Flush to shuffle",
      btntxt: "Flush",
      enjoyment: "0%",
      informative: "0%",
      hatefull: "0%",
      check: "check",
      verified: "Welcome",
      instagram: "",
      twitter: "",
      snapchat: "",
      retries: 0,
      style: "",
    }
  },
  methods: {
    async getUser() {

      let name, description, gender, picture, combination, enjoyment, informative, hatefull, check, verified, instagram, twitter, snapchat;

      this.btntxt = "Loading"

      //get usercount
      var settings = {
        "url": "https://raw.githubusercontent.com/catherians-database/user_count/main/user_count",
        "method": "GET",
        "timeout": 0,
      };

      $.ajax(settings).done(async function (response) {

        //get random user id except current user id
        let id, temp, current = 5//Math.floor(Math.random() * (response));

        temp = window.localStorage.getItem("temp");
        if (temp == current) {
          id = current + 1;
          window.localStorage.setItem("temp", id);
        } else {
          id = current;
          window.localStorage.setItem("temp", id);
        }


        console.log("Requested ID: "+id);
        console.log("Total Users: "+response);
        //get userdata
        var settings = {
          "url": `https://api.github.com/repos/catherians-database/user-base1/contents/Users/User%20${id}/data.json`,
          "method": "GET",
          "timeout": 0,
          "headers": {
          },
        };

        $.ajax(settings).done(async function (response) {
          const res = JSON.parse(atob(response.content));
          //console.log(res);
          name = res.userName;
          description = res.description;
          gender = res.gender;
          combination = res.combination;
          enjoyment = res.enjoyment;
          informative = res.informative;
          hatefull = res.hatefull;
          check = res.check;
          verified = res.verified;
          instagram = res.instagram;
          twitter = res.twitter;
          snapchat = res.snapchat;
          check = res.check;
          verified = res.verified;
          console.log("User " + res.UserID);

          //GEt proflile.png
          picture = `https://raw.githubusercontent.com/catherians-database/user-base1/main/Users/User%20${id}/profile.png`

        });

      });

      setTimeout(() => {
        if (name == undefined && description == undefined && gender == undefined && combination == undefined) {
          if (this.retries <= 10) {
            this.retries++;
            setTimeout(() => {
              this.getUser();
              console.log("Network Error: Executing reccursion");
              this.btntxt = "Connecting...";
              this.shadow = "red"
            }, 100);
          }
          else {
            this.btntxt = "Try again";
            this.shadow = "red",
              this.description = "Network Error"
            this.retries = 0;
          }

        }
        else {
          this.retries = 0;
          this.name = name,
            this.gender = gender,
            this.combination = combination,
            this.description = description,
            this.picture = (picture),
            this.btntxt = "Flush",
            this.informative = informative + " %",
            this.enjoyment = enjoyment + " %",
            this.hatefull = hatefull + " %",
            this.twitter = "https://twitter.com/" + twitter,
            this.snapchat = "https://snapchat.com/add" + snapchat,
            this.instagram = "https://www.instagram.com/" + instagram;
          if (this.gender == "male") this.shadow = "blue"
          else if (this.gender == "female") this.shadow = "pink";
          if (check != undefined) {
            this.verified = verified;
            this.check = check
          }

        }
      }, 1000)
    },
  }
})

app.mount('#app')