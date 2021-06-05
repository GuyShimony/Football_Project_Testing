SELECT * FROM Games Where GameDateTime = '2021-10-30 17:00:00' AND
  ((HomeTeamID = 939 AND AwayTeamID = 211) OR
  (HomeTeamID = 211 AND AwayTeamID = 939))