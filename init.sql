drop table if exists USER;
create table USER
(
    email    text PRIMARY KEY,
    password text
);
-- 创建用户表

drop table if exists USER_FILE;
Create table USER_FILE
(
    user  text,
    fpath text primary key,
    fname text,
    constraint user_key foreign key (user) references USER (email)
);
-- 创建用户文件关联表
--
-- INSERT INTO USER (email, password)
-- VALUES ('ds226688@aliyun.com', '7e5c1cfc2079877c5d961450084831aedd6c7c6c3e7ffca9605d5a04b097359d');
-- -- -- 插入一个邮箱，密码明文： pTJF55pASEvWWcF

