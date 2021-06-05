var axios = require("axios");
const api_domain = "http://localhost:3000";
const cookie = ""
/*
This module represent the service component for the login request send by the user.
For tests purposes we will use a fake user that already exists in the DB and wants to login
*/


function login()
{
    return axios.post(`${api_domain}/login`, {username: "Johnc", password: "1234John"})

}

login().then(result => {
    console.log(result.status, result.data)
    
  }).catch(error => {
    console.log(error)
  })

  