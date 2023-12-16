
-- create table
create table names (
    id int primary key,
    name varchar(127),
    data_added datetime
);

-- check user list
select user from mysql.user;

-- create user
create user admin1 identified by '1111';

-- grant all to user
grant select, insert, update, delete on simple_server.* to admin1;

