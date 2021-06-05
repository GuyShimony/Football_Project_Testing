IF OBJECT_ID('dbo.UsersFavoriteGames', 'U') IS NOT NULL
DROP TABLE dbo.UsersFavoriteGames
GO

CREATE TABLE dbo.UsersFavoriteGames
(
    
    userid INT NOT NULL,
    gameid INT NOT NULL,
    PRIMARY KEY (userid, gameid)
);


