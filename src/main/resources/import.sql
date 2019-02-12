insert into role (role_id, name) values (0, 'admin');
insert into role (role_id, name) values (1, 'manager');
insert into role (role_id, name) values (2, 'user');
insert into gender (gender_id, name) values (0, 'male');
insert into gender (gender_id, name) values (1, 'female');
insert into appuser (user_id, age, email, height, login, password, weight, gender_id, role_id) values (0, 0, 'admin@admin.com', 0, 'admin', 'welcome', 0, 0, 0);
insert into appuser (user_id, age, email, height, login, password, weight, gender_id, role_id) values (1, 0, 'manager@manager.com', 0, 'manager', 'welcome', 0, 0, 1);
insert into appuser (user_id, age, email, height, login, password, weight, gender_id, role_id) values (2, 0, 'user@user.com', 0, 'user', 'welcome', 0, 0, 2);