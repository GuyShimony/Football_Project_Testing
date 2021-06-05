IF OBJECT_ID('dbo.UsersFavoritePlayers', 'U') IS NOT NULL
DROP TABLE dbo.UsersFavoritePlayers

CREATE TABLE dbo.UsersFavoritePlayers
(
    
    userid INT NOT NULL,
    playerid [INT] NOT NULL
    PRIMARY KEY(userid, playerid)
);

