TRUNCATE TABLE words RESTART IDENTITY CASCADE;

INSERT INTO words (category_id, word)
VALUES
(1, 'Lion'), (1, 'Elephant'), (1, 'Tiger'), (1, 'Zebra'), (1, 'Giraffe'),
(1, 'Monkey'), (1, 'Panda'), (1, 'Kangaroo'), (1, 'Bear'), (1, 'Dolphin'),
(2, 'Red'), (2, 'Blue'), (2, 'Green'), (2, 'Yellow'), (2, 'Purple'),
(2, 'Orange'), (2, 'Pink'), (2, 'Black'), (2, 'White'), (2, 'Brown'),
(3, 'One'), (3, 'Two'), (3, 'Three'), (3, 'Four'), (3, 'Five'),
(3, 'Six'), (3, 'Seven'), (3, 'Eight'), (3, 'Nine'), (3, 'Ten'),
(4, 'Circle'), (4, 'Square'), (4, 'Triangle'), (4, 'Rectangle'), (4, 'Oval'),
(4, 'Diamond'), (4, 'Hexagon'), (4, 'Octagon'), (4, 'Star'), (4, 'Heart'),
(5, 'Head'), (5, 'Arm'), (5, 'Leg'), (5, 'Eye'), (5, 'Ear'),
(5, 'Nose'), (5, 'Mouth'), (5, 'Hand'), (5, 'Foot'), (5, 'Knee')
ON CONFLICT (category) DO NOTHING;