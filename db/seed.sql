INSERT INTO department 
    (name)
VALUES
    ("Kings Landing"),
    ("The North"),
    ("Essos");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Lord of Winterfell", 200000, 2),
    ("Hand of the King", 250000, 1),
    ("King of the Westeros", 300000, 1),
    ("Dragon Queen", 400000, 3),
    ("Lord Commander", 100000, 2),
    ("Three Eyed Raven", 35000, 2),
    ("Kingsguard", 50000, 1),
    ("Prince", 100000, 1),
    ("Queens Council", 150000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Robert", "Baratheon", 3, NULL),
    ("Dany", "Targaryen", 4, NULL),    
    ("Bran", "Stark", 6, NULL),
    ("Jon", "Snow", 5, NULL),
    ("Jeoffrey", "Baratheon", 3, 1),
    ("Ned", "Stark", 2, 1),
    ("Robb", "Stark", 1, 6),
    ("Tyrion", "Lannister", 2, 5),
    ("Jaime", "Lannister", 7, 5),
    ("Tommen", "Baratheon", 8, 5),
    ("Jorah", "Mormont", 9, 2),
    ("John", "Aryyn", 2, 1),
    ("Old", "Dude", 6, NULL);