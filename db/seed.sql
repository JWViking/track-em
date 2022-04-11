INSERT INTO department (name)
VALUES
    ('Rose Painter'),
    ('Card Guard'),
    ('Hattery'),
    ('Advisors'),
    ('Evil Beasts'),
    ('Weaponry'),
    ('Tart Bakery');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Red Rose Painter', '$2', 1),
    ('Paint Mixer', '$1', 1),
    ('Ace of Hearts', '$5', 2),
    ('Head Hatter', '$5', 3),
    ('Ribbon Cutter', '$0.50', 3),
    ('Hat Model', '$0.50', 3),
    ('Bandersnatch', '5 mice', 5),
    ('Jabberwocky', '2 advisors', 5),
    ('Vorpal Blade Carrier', '$20', 6),
    ('Heart Tart Baker', '$8', 7);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('Big Nose Bob', Bob, 1),
    ('Jonny', 'White', 2),
    ('Leonardo', 'Decaprio', 3),
    ('Johnny', 'Depp', 4),
    ('Edward', Scissorhands, 5),
    ('Giselle', 'Supermodel', 6),
    ('Gene', 'Simmons', 7),
    ('Richard', 'Nixon', 8),
    ('Denzel', 'Washington', 9),
    ('Gordon', 'Ramsey', 10);