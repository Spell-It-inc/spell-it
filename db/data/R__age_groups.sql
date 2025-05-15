TRUNCATE TABLE age_groups RESTART IDENTITY CASCADE;

INSERT INTO age_groups(minimum_age, maximum_age)
VALUES
(4, 6),
(7, 9),
(10, 12),
(13, 17);
