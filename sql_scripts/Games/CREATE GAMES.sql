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
    Referee [NVARCHAR](50)
);




