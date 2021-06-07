
INSERT INTO Events
   ([EventDate], [EventTime], [EventGameTime],[Event])
   
VALUES
   ('2021-01-03', '19:10:00', 10, 'Goal Jesper Hansen'),
   ('2021-01-03', '19:44:00', 44, 'Goal Jesper Hansen'),
   ('2021-01-03', '20:50:00', 91, 'Goal Mikkel Anderson'),
   ('2021-01-10', '20:15:00', 73, 'Red Card Mikkel Anderson'),
   ('2021-01-10', '20:22:00', 80, 'Yellow Card Stefan Gartenmann'),
   ('2021-01-10', '20:27:00', 85,'Goal Lawrence Thomas'),
   ('2021-01-13', '19:13:00', 13,'Goal Rune Frantsen'),
   ('2021-01-13', '19:40:00', 40,'Yellow Card Anders Hoff'),
   ('2021-01-13', '20:31:00', 89,'Yellow Card Patrik Carlgren'),
   ('2021-01-20', '19:21:00', 21,'Yellow Card Valdemar Thorsen'),
   ('2021-01-20', '19:27:00', 27,'Offside Mikkel Anderson'),
   ('2021-01-20', '19:30:00', 30,'Substitute James Gomez for Rune Frantsen'),
   ('2021-01-23', '19:10:00', 10,'Substitute James Gomez for Anders Hoff'),
   ('2021-01-23', '19:15:00', 15,'Offside James Gomez'),
   ('2021-01-23', '20:02:00', 60,'Foul Stefan Gartenmann'),
   ('2021-02-03', '19:46:00', 46,'Goal Lawrence Thomas'),
   ('2021-02-03', '20:04:00', 62,'Goal Patrik Carlgren'),
   ('2021-02-03', '20:18:00', 78,'Goal Jonas Dakir')
GO

Select * FROM Events;

GO