const User = function (userId, email, password, age, height, weight, genderId, roleId) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.genderId = genderId;
    this.roleId = roleId;
};

export default User;