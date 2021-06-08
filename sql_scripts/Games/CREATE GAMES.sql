-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Games', 'U') IS NOT NULL
DROP TABLE dbo.Games

CREATE TABLE dbo.Games
(
    gameid INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    GameDateTime DATETIME NOT NULL,
    HomeTeam [NVARCHAR](50) NOT NULL,
    HomeTeamID INT NOT NULL,
    AwayTeam [NVARCHAR](50) NOT NULL,
    AwayTeamID INT NOT NULL,
    Stadium [NVARCHAR](50) NOT NULL,
    Result [NVARCHAR](50),
    HeadReferee [NVARCHAR](50) NOT NULL,
    HeadRefereeID INT NOT NULL,
    LineReferee1 [NVARCHAR](50) NOT NULL,
    LineRefereeID1 INT NOT NULL,
    LineReferee2 [NVARCHAR](50) NOT NULL,
    LineRefereeID2 INT NOT NULL,
    BoxReferee1 [NVARCHAR](50) NOT NULL,
    BoxRefereeID1 INT NOT NULL,
    BoxReferee2 [NVARCHAR](50) NOT NULL,
    BoxRefereeID2 INT NOT NULL,
);




