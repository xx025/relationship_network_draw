# 数据库设计

为了简洁使用sqlite数据库

为了简洁尽量少的表，

- 第一张表存储用户名和密码，
- 第二张表存储图的id和用户id,属于中间表
- 第三张表存储点以及点的属性,以及图的id
- 第四张表存储线以及线的属性,以及图的id

用户表

```sqlite
CREATE TABLE user
(
    id            char(16) primary key,
    email         char(64),
    password_hash char(64)
);

```

图表

```sqlite
CREATE TABLE graph
(
    id      char(16) primary key,
    user_id char(16)
);

```

点表

```sqlite
CREATE TABLE point
(
    pid                   char(32) primary key,
    id                    int,
    graph_id              char(16),
    type                  char(32),
    label                 char(64),
    x                     int,
    y                     int,
    radius                int,
    width                 int,
    height                int,
    image                 text,
    alpha                 double,
    fill_color            text,
    text_position         text,
    font                  text,
    border_color          text,
    shape                 text,
    show_label            int,
    text_offset_x         int,
    text_offset_y         int,
    wrap_text             int,
    show_shadow           int,
    shadow_color          text,
    selected_border_color text,
    selected_border_alpha double,
    selected_border_width int,
    line_dash             text,
    scale_x               double,
    scale_y               double,
    tip_text              text,
    selected              int,
    show_selected         int,
    dragable              int DEFAULT 1,
    visible               int DEFAULT 1,
    properties            text
)

```

边表

```sqlite
CREATE TABLE link
(
    lid            char(32) primary key,
    id             int,
    graph_id       char(16),
    label          char(64),
    alpha          double,
    stroke_color   text,
    font           text,
    font_color     text,
    line_width     int,
    weight         int,
    line_type      int,
    show_label     int,
    show_color     text,
    shadow_color   text,
    selected_color text,
    selected_alpha double,
    line_dash      text,
    visible        int DEFAULT 1,
    source         int,
    target         int,
    properties     text
)
```