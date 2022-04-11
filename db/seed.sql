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
    ('Red Rose Painter', 2.00, 1),
    ('Paint Mixer', 1.00, 1),
    ('Ace of Hearts', 5.00, 2),
    ('Head Hatter', 5.00, 3),
    ('Ribbon Cutter', 0.50, 3),
    ('Hat Model', 0.50, 3),
    ('Bandersnatch', 10.00, 5),
    ('Jabberwocky', 100.00, 5),
    ('Vorpal Blade Carrier', 20.00, 6),
    ('Heart Tart Baker', 8.00, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Big Nose Bob', 'Bob', 1, NULL),
    ('Jonny', 'White', 2, 1),
    ('Leonardo', 'Decaprio', 3, NULL),
    ('Johnny', 'Depp', 4, NULL),
    ('Edward', 'Scissorhands', 5, 4),
    ('Giselle', 'Supermodel', 6, 4),
    ('Gene', 'Simmons', 7, NULL),
    ('Richard', 'Nixon', 8, NULL),
    ('Denzel', 'Washington', 9, NULL),
    ('Gordon', 'Ramsey', 10, NULL);