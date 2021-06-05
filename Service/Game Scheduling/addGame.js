var axios = require("axios");
axios.defaults.withCredentials = true
const api_domain = "http://localhost:3000";
/*
This module represent the service component for the game scheduling request send by the user.
For tests purposes we will use a fake user that is already a league representive and wants to add a game
*/


function addGame()
{
    return axios.post(`${api_domain}/games/addGame`, {
    game_date: "2021-10-28", game_time: "17:00:00", 
    home_team: "Midtjylland",
    home_team_id: 939,
    away_team: "Horsens",
    away_team_id: 211,
    stadium: "MCH Arena",
    referee: {
        name: "Denis Shalayev"
    }
}, headers: {
  Cookie: "cookie1=value; cookie2=value; cookie3=value;"
})

}

addGame().then(result => {
    console.log(result.status, result.data)
  }).catch(error => {
    console.log(error)
  })
