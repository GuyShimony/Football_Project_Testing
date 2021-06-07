IF OBJECT_ID('dbo.Referees', 'U') IS NOT NULL
DROP TABLE dbo.Referees

CREATE TABLE dbo.Referees
(
    userid INT NOT NULL PRIMARY KEY,
    Name [NVARCHAR](50) NOT NULL,
    RefereeType [NVARCHAR](50) NOT NULL,

);

