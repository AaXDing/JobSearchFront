const saveUser = (userId) => {
    localStorage.setItem('user_id', userId);
};

const getUser = () => {
    return localStorage.getItem('user_id');
};

const deleteUser = () => {
    localStorage.removeItem('user_id');
}

export { saveUser, getUser, deleteUser };