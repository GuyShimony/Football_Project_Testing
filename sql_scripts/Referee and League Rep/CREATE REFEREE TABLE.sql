IF OBJECT_ID('dbo.Referees', 'U') IS NOT NULL
DROP TABLE dbo.Referees

CREATE TABLE dbo.Referees
(
    Name [NVARCHAR](50) NOT NULL PRIMARY KEY,
);

