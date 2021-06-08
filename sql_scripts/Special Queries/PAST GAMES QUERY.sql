-- SELECT * FROM Games JOIN (Select gameid, 
-- string_agg(concat(EventGameTime, ':', [Event]), ', ') as 
-- GameEvents From GamesEvents GROUP BY gameid) as Events 
-- ON Games.gameid = Events.gameid


-- SELECT Games.GameDateTime, Games.HomeTeam, Games.AwayTeam, 
-- Games.Stadium, Games.Result , Events.GameEvents, Games.Referee 
-- FROM Games JOIN (Select gameid, 
-- string_agg(concat(EventGameTime, ':', [Event]), ', ') as 
-- GameEvents From GamesEvents GROUP BY gameid) as Events 
-- ON Games.gameid = Events.gameid
-- WHERE GameDateTime <'${now}' ORDER BY GameDateTime

SELECT * FROM Games
