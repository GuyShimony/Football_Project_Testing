

INSERT INTO Games
   ([GameDateTime],[HomeTeam],[HomeTeamID],[AwayTeam],
   [AwayTeamID], [Stadium],[Result], [HeadReferee], [HeadRefereeID], [LineReferee1], [LineRefereeID1]
   , [LineReferee2], [LineRefereeID2], [BoxReferee1], [BoxRefereeID1], [BoxReferee2], [BoxRefereeID2])
   
VALUES
   ('2021-01-03 19:00:00', 'Midtjylland', 939, 'SønderjyskE, ',390, 'MCH Arena', 
   '0-3','Nick Walsh',7, 'Daiyrbek Abdyldayev',3,'Zainiddin Alimov',5,'Denis Shalayev',2,'Bobby Madden',6),
   ('2021-01-10 19:00:00', 'Midtjylland',939, 'SønderjyskE',390, 'MCH Arena', 
   '0-1','William Collum',4, 'Daiyrbek Abdyldayev',3,'Zainiddin Alimov',5,'Denis Shalayev',2,'Bobby Madden',6),
   ('2021-01-13 19:00:00', 'Randers',2356, 'Horsens',211, 'Cepheus Park Randers', 
   '0-1','Nick Walsh',7, 'Daiyrbek Abdyldayev',3,'Zainiddin Alimov',5,'Denis Shalayev',2,'Bobby Madden',6),
   ('2021-01-20 19:00:00', 'Horsens',211, 'Randers',2356, 'CASA Arena Horsens', 
   '0-0','William Collum',4, 'Daiyrbek Abdyldayev',3,'Zainiddin Alimov',5,'Denis Shalayev',2,'Bobby Madden',6),
   ('2021-01-23 20:00:00', 'Horsens',211, 'Midtjylland',939, 'Cepheus Park Randers', 
   '0-0','Nick Walsh',7, 'Daiyrbek Abdyldayev',3,'Zainiddin Alimov',5,'Denis Shalayev',2,'Bobby Madden',6),
   ('2021-02-03 19:00:00', 'SønderjyskE',390, 'Randers',2356, 'Sydbank Park', 
   '1-2','William Collum',4, 'Daiyrbek Abdyldayev',3,'Zainiddin Alimov',5,'Denis Shalayev',2,'Bobby Madden',6),
    ('2021-08-01 19:00:00', 'SønderjyskE', 390, 'Midtjylland',939, 'Sydbank Park', NULL,
    'Nick Walsh',7, 'Daiyrbek Abdyldayev',3,'Zainiddin Alimov',5,'Denis Shalayev',2,'Bobby Madden',6),
    ('2021-08-03 19:00:00', 'Horsens', 211, 'Midtjylland',939, 'CASA Arena Horsens', NULL,
    'William Collum',4, 'Daiyrbek Abdyldayev',3,'Zainiddin Alimov',5,'Denis Shalayev',2,'Bobby Madden',6),
     ('2021-08-10 19:00:00', 'Horsens', 211, 'Randers',2356, 'CASA Arena Horsens', NULL,
     'Nick Walsh',7, 'Daiyrbek Abdyldayev',3,'Zainiddin Alimov',5,'Denis Shalayev',2,'Bobby Madden',6),
    ('2021-10-01 14:30:00', 'SønderjyskE', 390, 'Horsens',211, 'Sydbank Park', NULL,
    'William Collum',4, 'Daiyrbek Abdyldayev',3,'Zainiddin Alimov',5,'Denis Shalayev',2,'Bobby Madden',6),
    ('2021-10-03 21:05:00', 'Randers', 2356, 'Midtjylland',939, 'Cepheus Park Randers', NULL,
    'Nick Walsh',7, 'Daiyrbek Abdyldayev',3,'Zainiddin Alimov',5,'Denis Shalayev',2,'Bobby Madden',6),
   ('2021-11-05 21:05:00', 'Randers', 2356, 'SønderjyskE',390, 'Cepheus Park Randers ', NULL,
   'William Collum',4, 'Daiyrbek Abdyldayev',3,'Zainiddin Alimov',5,'Denis Shalayev',2,'Bobby Madden',6)
GO 


Select * FROM Games;
