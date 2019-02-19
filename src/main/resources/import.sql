create schema if not exists pp_app;

create table pp_app.appuser
(
  user_id   int8         not null,
  age       int4,
  email     varchar(255) not null,
  height    int4,
  login     varchar(255) not null,
  password  varchar(255) not null,
  weight    int4,
  gender_id int8,
  role_id   int8,
  primary key (user_id)
);
create table pp_app.dish
(
  dish_id int8         not null,
  name    varchar(255) not null,
  primary key (dish_id)
);
create table pp_app.dish_products
(
  dish_id    int8 not null,
  product_id int8 not null,
  primary key (dish_id, product_id)
);
create table pp_app.gender
(
  gender_id int8         not null,
  name      varchar(255) not null,
  primary key (gender_id)
);
create table pp_app.prod_type
(
  prod_type_id int8         not null,
  name         varchar(255) not null,
  primary key (prod_type_id)
);
create table pp_app.product
(
  product_id   int8         not null,
  amount       int8,
  energy       float8       not null,
  name         varchar(255) not null,
  prod_type_id int8,
  primary key (product_id)
);
create table pp_app.role
(
  role_id int8         not null,
  name    varchar(255) not null,
  primary key (role_id)
);
create table pp_app.user_dishes
(
  user_id int8 not null,
  dish_id int8 not null,
  primary key (user_id, dish_id)
);

alter table pp_app.appuser
  drop constraint UK_USER_EMAIL_LOGIN;
alter table pp_app.appuser
  add constraint UK_USER_EMAIL_LOGIN unique (email, login);
alter table pp_app.dish
  drop constraint UK_DISH_NAME;
alter table pp_app.dish
  add constraint UK_DISH_NAME unique (name);
alter table pp_app.gender
  drop constraint UK_GENDER_NAME;
alter table pp_app.gender
  add constraint UK_GENDER_NAME unique (name);
alter table pp_app.prod_type
  drop constraint UK_PRODUCT_TYPE_NAME;
alter table pp_app.prod_type
  add constraint UK_PRODUCT_TYPE_NAME unique (name);
alter table pp_app.product
  drop constraint UK_PRODUCT_NAME;
alter table pp_app.product
  add constraint UK_PRODUCT_NAME unique (name);
alter table pp_app.role
  drop constraint UK_USER_ROLE_NAME;
alter table pp_app.role
  add constraint UK_USER_ROLE_NAME unique (name);

create sequence if not exists pp_app.dish_id_generator start 1 increment 10;
create sequence if not exists pp_app.gender_id_generator start 1 increment 10;
create sequence if not exists pp_app.prod_type_id_generator start 1 increment 10;
create sequence if not exists pp_app.product_id_generator start 1 increment 10;
create sequence if not exists pp_app.role_type_id_generator start 1 increment 10;
create sequence if not exists pp_app.user_id_generator start 1 increment 10;

alter table pp_app.appuser
  add constraint FK_USER_GENDER foreign key (gender_id) references pp_app.gender;
alter table pp_app.appuser
  add constraint FK_USER_ROLE foreign key (role_id) references pp_app.role;
alter table pp_app.dish_products
  add constraint FK_DISH_PRODUCTS_PRODUCT foreign key (product_id) references pp_app.product;
alter table pp_app.dish_products
  add constraint FK_DISH_PRODUCTS_DISH foreign key (dish_id) references pp_app.dish;
alter table pp_app.product
  add constraint FK_PRODUCT_TYPE foreign key (prod_type_id) references pp_app.prod_type;
alter table pp_app.user_dishes
  add constraint FK_USER_DISHES_DISH foreign key (dish_id) references pp_app.dish;
alter table pp_app.user_dishes
  add constraint FK_USER_DISHES_USER foreign key (user_id) references pp_app.appuser;

insert into pp_app.role (role_id, name)
values (0, 'admin');
insert into pp_app.role (role_id, name)
values (1, 'manager');
insert into pp_app.role (role_id, name)
values (2, 'user');
insert into pp_app.gender (gender_id, name)
values (0, 'male');
insert into pp_app.gender (gender_id, name)
values (1, 'female');
insert into pp_app.appuser (user_id, age, email, height, login, password, weight, gender_id, role_id)
values (0, 0, 'admin@admin.com', 0, 'admin', 'welcome', 0, 0, 0);
insert into pp_app.appuser (user_id, age, email, height, login, password, weight, gender_id, role_id)
values (1, 0, 'manager@manager.com', 0, 'manager', 'welcome', 0, 0, 1);
insert into pp_app.appuser (user_id, age, email, height, login, password, weight, gender_id, role_id)
values (2, 0, 'user@user.com', 0, 'user', 'welcome', 0, 0, 2);