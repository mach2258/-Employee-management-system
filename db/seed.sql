INSERT INTO department (name)
VALUES
("engineering"),
("finance"),
("legal"),
("sales");
INSERT INTO roles (title, salary, department_id)
VALUES
("sales lead", 10000,1)
("software engineer", 20000,4)
("lawyer", 40000,2)
("lead engineer", 50000,1)
("salesperson", 80000,4)
INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES
("ben", "dover", 1, NULL),
("enrique", "jennison", 2, 1),
("pan", "joe", 3, NULL),
("jolyen", "yang", 4, 3),
("eric", "garcia", 5, NULL),