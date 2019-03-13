const Permissions = {
    ADMIN: 0,
    MANAGER: 1,
    USER: 2,
    ANONYMOUS: 3,

    getPermission: function (permission) {
        switch (permission) {
            case this.ADMIN:
                return this.ADMIN;
            case this.MANAGER:
                return this.MANAGER;
            case this.USER:
                return this.USER;
            default:
                return this.ANONYMOUS;
        }
    }
};
if (Object.freeze) {
    Object.freeze(Permissions);
}
export default Permissions;