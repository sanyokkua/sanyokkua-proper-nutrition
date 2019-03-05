const Permissions = {
    ADMIN: 0,
    MANAGER: 1,
    USER: 2,
    ANONYMOUS: 3
};
if (Object.freeze) {
    Object.freeze(Permissions);
}
export default Permissions;