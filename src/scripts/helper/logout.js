import deleteUser from './scripts/helper/localUser';

const logout = () => {
    deleteUser();
    window.location.href = '/';
}