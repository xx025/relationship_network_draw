drop table if exists USER;
create table USER
(
    email    text PRIMARY KEY,
    password text
);

INSERT INTO USER (email, password)
VALUES ('chongfu@test.com', '11223344');
-- 向数据库插入邮箱chongfu@test.com 用于注册时账户已注册校验

INSERT INTO USER (email, password)
VALUES ('ds226688@aliyun.com', '7e5c1cfc2079877c5d961450084831aedd6c7c6c3e7ffca9605d5a04b097359d');
-- -- 向数据库插入邮箱chongfu@test.com 用于注册时账户已注册校验