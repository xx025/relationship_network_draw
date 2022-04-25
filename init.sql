drop table if exists USER;
create table USER
(
    email    text PRIMARY KEY,
    password text
);

INSERT INTO USER (email, password)
VALUES ('chongfu@test.com', '11223344');
-- 向数据库插入邮箱chongfu@test.com 用于注册时账户已注册校验

-- INSERT INTO USER (email, password)
-- VALUES ('ds226688@aliyun.com', '11223344');
-- -- 向数据库插入邮箱chongfu@test.com 用于注册时账户已注册校验