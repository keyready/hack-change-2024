import InputMask from 'react-input-mask';
import { Button, Input } from '@nextui-org/react';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { TextButton } from '@/shared/ui/TextButton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { toastDispatch } from '@/widgets/Toaster';
import {
    getUserAuthError,
    getUserAuthIsLoading,
    getUserDataService,
    loginUser,
    renderAuthErrorText,
    UserActions,
} from '@/entities/User';

interface Credentials {
    phone?: string;
    password?: string;
    repeatedPassword?: string;
}

interface LoginBlockProps {
    className?: string;
    onModeChange: () => void;
}

export const LoginBlock = (props: LoginBlockProps) => {
    const { className, onModeChange } = props;

    const dispatch = useAppDispatch();

    const isAuthLoading = useSelector(getUserAuthIsLoading);
    const authError = useSelector(getUserAuthError);

    const [credentials, setCredentials] = useState<Credentials>({});
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

    const isButtonDisabled = useMemo(() => {
        const { phone, password } = credentials;
        return !phone || phone.includes('_') || !password;
    }, [credentials]);

    useEffect(() => {
        dispatch(UserActions.clearAuthError());
    }, [credentials, dispatch]);

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const res = await toastDispatch(
                dispatch(
                    loginUser({
                        password: credentials.password,
                        phone: credentials.phone,
                    }),
                ),
                {
                    error: 'Что-то пошло не так',
                    loading: 'В процессе...',
                    success: 'Успешно авторизованы!',
                },
            );

            if (res.meta.requestStatus === 'fulfilled') {
                await dispatch(getUserDataService());
            }
        },
        [credentials, dispatch],
    );

    return (
        <VStack className={classNames('h-full', {}, [className])} align="center" maxW gap="24px">
            <h1 className="font-bold text-center leading-none text-l">Вход</h1>

            <form className="h-full flex-grow" onSubmit={handleFormSubmit}>
                <VStack className="h-full" justify="center" maxW gap="8px">
                    <InputMask
                        mask="+7 (999) 999 99 99"
                        value={credentials.phone}
                        onChange={(ev) =>
                            setCredentials({
                                ...credentials,
                                phone: ev.target.value,
                            })
                        }
                    >
                        {(inputProps) => <Input {...inputProps} label="Телефон" type="tel" />}
                    </InputMask>
                    <Input
                        endContent={
                            <button
                                tabIndex={-1}
                                onClick={() => setIsPasswordHidden((prevState) => !prevState)}
                                type="button"
                            >
                                {isPasswordHidden ? (
                                    <RiEyeLine size={20} className="text-gray" />
                                ) : (
                                    <RiEyeOffLine size={20} className="text-gray" />
                                )}
                            </button>
                        }
                        value={credentials.password}
                        onChange={(ev) =>
                            setCredentials({
                                ...credentials,
                                password: ev.target.value,
                            })
                        }
                        label="Пароль"
                        type={isPasswordHidden ? 'password' : 'text'}
                    />

                    {authError && (
                        <p className="text-red text-center w-full">
                            {renderAuthErrorText(authError)}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="font-bold w-full bg-red text-white"
                        isDisabled={isButtonDisabled || isAuthLoading}
                        isLoading={isAuthLoading}
                    >
                        {isAuthLoading ? 'Подождите...' : 'Войти'}
                    </Button>
                    <HStack maxW justify="center" className="mt-4">
                        <p className="text-s">Нет аккаунта?</p>
                        <TextButton onClick={onModeChange} className="text-s text-red">
                            Зарегистрироваться
                        </TextButton>
                    </HStack>
                </VStack>
            </form>
        </VStack>
    );
};
