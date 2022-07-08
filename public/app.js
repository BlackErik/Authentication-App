const API_URL = "http://localhost:8080";

var app = new Vue({
  el: "#app",
  data: {
    loginUser: "",
    loginPassword: "",

    registrationUser: "",
    registrationFullName: "",
    registrationPassword: "",

    users: [],
  },
  methods: {
    getSession: async function () {
      let response = await fetch(`${API_URL}/session`, {
        credentials: "include",
      });

      if (response.status == 200) {
        console.log("Logged in ");
        let data = await response.json();
        console.log(data);
      } else if (response.status == 401) {
        console.log("not logged in ");
        let data = await response.json();
        console.log(data);
      } else {
        console.log("Some error in GET /session", response.status, response);
      }
    },

    postSession: async function () {
      let loginCredentials = {
        username: this.loginUser,
        password: this.loginPassword,
      };

      let response = await fetch(`${API_URL}/session`, {
        method: "POST",
        body: JSON.stringify(loginCredentials),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status == 201) {
        console.log("succesful login attempt");
        this.loginUser = "";
        this.loginPassword = "";
        this.getUsers();
      } else if (response.status == 401) {
        console.log("Unsuccessful log in attempt");
      } else {
        console.log("Some error in POST / session", response.status, response);
      }
    },

    postUser: async function () {
      let registrationCredentials = {
        username: this.registrationUser,
        fullname: this.registrationFullName,
        password: this.registrationPassword,
      };

      let response = await fetch(`${API_URL}/users`, {
        method: "POST",
        body: JSON.stringify(registrationCredentials),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      let body = response.json();
      console.log(body);

      if (response.status == 201) {
        console.log("successful create user attempt");
        this.registrationUser = "";
        this.registrationFullName = "";
        this.registrationPassword = "";
      } else {
        console.log("Some error in POST /users", response.status, response);
      }
    },

    getUsers: async function () {
      let response = await fetch(`${API_URL}/users`, {
        credentials: "include",
      });
      let data = await response.json();
      this.users = data;
      console.log(data);
    },
  },
  created: function () {
    this.getSession();
    this.getUsers();
  },
});
