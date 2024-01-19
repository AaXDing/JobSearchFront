import deleteUser from './localUser';

const logout = () => {
    deleteUser();
    window.location.href = '/';
}