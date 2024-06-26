-- Created query to get visual representation of tables for reference

SELECT * FROM department;

-- returns (department.id = primary)
-- +----+-----------------+
-- | id | department_name |
-- +----+-----------------+
-- |  1 | Sales           |
-- |  2 | Engineering     |
-- |  3 | Finance         |
-- |  4 | Legal           |
-- +----+-----------------+

SELECT * FROM roles;

-- returns (roles.id = primary, department_id = foreign)
-- +----+-------------------+--------+---------------+
-- | id | title             | salary | department_id |
-- +----+-------------------+--------+---------------+
-- |  1 | Sales Lead        | 100000 |             1 |
-- |  2 | Salesperson       |  80000 |             1 |
-- |  3 | Lead Engineer     | 150000 |             2 |
-- |  4 | Software Engineer | 120000 |             2 |
-- |  5 | Account Manager   | 160000 |             3 |
-- |  6 | Accountant        | 125000 |             3 |
-- |  7 | Legal Team Lead   | 250000 |             4 |
-- |  8 | Lawyer            | 190000 |             4 |
-- +----+-------------------+--------+---------------+

SELECT * FROM employees;

-- returns
-- +----+------------+-----------+---------+------------+
-- | id | first_name | last_name | role_id | manager_id |
-- +----+------------+-----------+---------+------------+
-- |  1 | John       | Doe       |       1 |       NULL |
-- |  2 | Mike       | Chan      |       2 |          1 |
-- |  3 | Ashley     | Rodriguez |       3 |       NULL |
-- |  4 | Kevin      | Tupik     |       4 |          3 |
-- |  5 | Kunal      | Singh     |       5 |       NULL |
-- |  6 | Malia      | Brown     |       6 |          5 |
-- |  7 | Sarah      | Lourd     |       7 |       NULL |
-- |  8 | Tom        | Allen     |       8 |          7 |
-- +----+------------+-----------+---------+------------+

SELECT * FROM employees WHERE manager_id IS NULL;

-- returns
-- +----+------------+-----------+---------+------------+
-- | id | first_name | last_name | role_id | manager_id |
-- +----+------------+-----------+---------+------------+
-- |  1 | John       | Doe       |       1 |       NULL |
-- |  3 | Ashley     | Rodriguez |       3 |       NULL |
-- |  5 | Kunal      | Singh     |       5 |       NULL |
-- |  7 | Sarah      | Lourd     |       7 |       NULL |
-- +----+------------+-----------+---------+------------+

SELECT d.department_name, SUM(r.salary) AS total_utilized_budget
FROM employees e
JOIN roles r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
GROUP BY d.id, d.department_name;