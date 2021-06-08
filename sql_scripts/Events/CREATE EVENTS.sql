IF OBJECT_ID('dbo.Events', 'U') IS NOT NULL
DROP TABLE dbo.Events
-- Create table for the all the games

-- Create table for the all the game's events
-- The Event Game time is an int representing minutes from 0
CREATE TABLE dbo.Events
(
    eventid INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    EventDate [NVARCHAR](50) NOT NULL,
    EventTime [NVARCHAR](50) NOT NULL,
    EventGameTime [INT] NOT NULL,
    Event [NVARCHAR](50) NOT NULL,
);