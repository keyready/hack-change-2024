import { AuthErrorTypes } from '../types/User';

export const renderAuthErrorText = (authError: AuthErrorTypes) => {
    switch (authError) {
        case 'bad_credentials':
            return 'Неверная пара логин/пароль!';
        case 'not_found':
            return 'Пользователь не найден!';
        case 'user_exist':
            return 'Такой пользователь уже существует';
        default:
            return 'Серверная ошибка, попробуйте позже';
    }
};
