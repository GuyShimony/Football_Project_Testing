use [Users];

INSERT INTO Games
   ([GameDateTime],[HomeTeam],[HomeTeamID],[AwayTeam],
   [AwayTeamID], [Stadium],[Result], [Referee])
   
VALUES
   ('2021-01-03 19:00:00', 'Midtjylland', 939, 'SønderjyskE, ',390, 'MCH Arena', 
   '0-3', 'Daiyrbek Abdyldayev'),
   ('2021-01-10 19:00:00', 'Midtjylland',939, 'SønderjyskE',390, 'MCH Arena', 
   '0-1','Zainiddin Alimov'),
   ('2021-01-13 19:00:00', 'Randers',2356, 'Horsens',211, 'Cepheus Park Randers', 
   '0-1','Daiyrbek Abdyldayev'),
   ('2021-01-20 19:00:00', 'Horsens',211, 'Randers',2356, 'CASA Arena Horsens', 
   '0-0','Denis Shalayev'),
   ('2021-01-23 20:00:00', 'Horsens',211, 'Midtjylland',939, 'Cepheus Park Randers', 
   '0-0','Daiyrbek Abdyldayev'),
   ('2021-02-03 19:00:00', 'SønderjyskE',390, 'Randers',2356, 'Sydbank Park', 
   '1-2','Zainiddin Alimov'),
    ('2021-08-01 19:00:00', 'SønderjyskE', 390, 'Midtjylland',939, 'Sydbank Park', NULL,'Denis Shalayev'),
    ('2021-08-03 19:00:00', 'Horsens', 211, 'Midtjylland',939, 'CASA Arena Horsens', NULL,'Denis Shalayev'),
     ('2021-08-10 19:00:00', 'Horsens', 211, 'Randers',2356, 'CASA Arena Horsens', NULL,NULL),
    ('2021-10-01 14:30:00', 'SønderjyskE', 390, 'Horsens',211, 'Sydbank Park', NULL,NULL),
    ('2021-10-03 21:05:00', 'Randers', 2356, 'Midtjylland',939, 'Cepheus Park Randers', NULL,NULL),
   ('2021-11-05 21:05:00', 'Randers', 2356, 'SønderjyskE',390, 'Cepheus Park Randers ', NULL,NULL)
GO 


Select * FROM Games;
