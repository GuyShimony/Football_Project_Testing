const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";


/*
The method extract all the relevent info about the coach 
*/
function extractCoachData(coach_info){
  const { fullname, image_path, nationality } = coach_info;
  return {
    name: fullname,
    image: image_path,
    nationality: nationality,
  };
}

/*
Used for coach personal page - get all the info about the coach from the SportMonk API
*/
function getCoachInfo(coachId){
  coach_info = axios.get(`${api_domain}/coaches/${coachId}`, {
    params: {
      api_token: process.env.api_token,
    },
  })
  return (coach_info) => {
    extractCoachData(coach_info);
  };
}





exports.extractCoachData = extractCoachData;
exports.getCoachInfo = getCoachInfo;


