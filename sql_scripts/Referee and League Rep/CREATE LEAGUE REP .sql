IF OBJECT_ID('dbo.LeagueRepsUsers', 'U') IS NOT NULL
DROP TABLE dbo.LeagueRepsUsers

CREATE TABLE dbo.LeagueRepsUsers
(
   userid INT NOT NULL PRIMARY KEY,
);

INSERT INTO LeagueRepsUsers
VALUES (1)


