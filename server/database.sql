
-- create table
create table names (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(127),
    date_added DATETIME
);

-- check user list
select user FROM mysql.user;

-- create user
CREATE USER admin1 IDENTIFIED BY '1111';

-- grant all to user
GRANT SELECT, INSERT, UPDATE, DELETE ON simple_server.* TO admin1;



INSERT INTO names VALUES(001, 'panda', '2023-12-16 00:00:00');
INSERT INTO names VALUES(002, 'amber', '2023-12-16 18:32:32');
INSERT INTO names VALUES(003, 'hoeny', '2023-12-16 22:15:16');