IF OBJECT_ID('dbo.GamesEvents', 'U') IS NOT NULL
DROP TABLE dbo.GamesEvents

CREATE TABLE dbo.GamesEvents
(
    gameid INT NOT NULL,
    eventid INT NOT NULL,
    PRIMARY KEY (gameid, eventid)
);
