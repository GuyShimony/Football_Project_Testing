-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
DROP TABLE dbo.Users


-- Create all the Users details with all the user's personal data.
-- The favorite teams and players will be in a different tables with the user name
-- acting as a foregin key to the main users table.
CREATE TABLE dbo.Users
(
    userid INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    username [NVARCHAR](50) NOT NULL,
    password [NVARCHAR](100) NOT NULL,
    firstname [NVARCHAR](50) NOT NULL,
    lastname [NVARCHAR](50) NOT NULL,
    country [NVARCHAR](50) NOT NULL,
    email [NVARCHAR](50) NOT NULL,
    imageurl [NVARCHAR](100) NOT NULL,
);



