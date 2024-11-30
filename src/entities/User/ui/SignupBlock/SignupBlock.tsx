import InputMask from 'react-input-mask';
import { Button, Checkbox, Divider, Input } from '@nextui-org/react';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RiCheckLine, RiEyeLine, RiEyeOffLine } from '@remixicon/react';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { TextButton } from '@/shared/ui/TextButton';
import {
    getUserAuthError,
    getUserAuthIsLoading,
    renderAuthErrorText,
    signupUser,
    UserActions,
} from '@/entities/User';
import { toastDispatch } from '@/widgets/Toaster';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface Credentials {
    phone?: string;
    password?: string;
    repeatedPassword?: string;
    firstname?: string;
    lastname?: string;
    position?: string;
}

interface SignupBlockProps {
    className?: string;
    onModeChange: () => void;
}

export const SignupBlock = (props: SignupBlockProps) => {
    const { className, onModeChange } = props;

    const dispatch = useAppDispatch();

    const isAuthLoading = useSelector(getUserAuthIsLoading);
    const authError = useSelector(getUserAuthError);

    const [credentials, setCredentials] = useState<Credentials>({});
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
    const [isEmployer, setIsEmployer] = useState<boolean>(false);

    useEffect(() => {
        dispatch(UserActions.clearAuthError());
    }, [credentials, dispatch]);

    const isButtonDisabled = useMemo(() => {
        const { phone, password, repeatedPassword, firstname, lastname, position } = credentials;
        return (
            !phone ||
            phone.includes('_') ||
            !password ||
            !firstname ||
            !lastname ||
            !repeatedPassword ||
            repeatedPassword !== password
        );
    }, [credentials]);

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const res = await toastDispatch(dispatch(signupUser(credentials)), {
                error: 'Что-то пошло не так',
                loading: 'В процессе...',
                success: 'Успешно зарегистрированы!',
            });

            if (res.meta.requestStatus === 'fulfilled') {
                onModeChange();
            }
        },
        [credentials, dispatch, onModeChange],
    );

    return (
        <VStack className={classNames('', {}, [className])} align="center" maxW gap="24px">
            <h1 className="font-bold text-center leading-none text-l">Регистрация</h1>

            <form onSubmit={handleFormSubmit}>
                <VStack maxW gap="8px">
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
                        {(inputProps) => (
                            <Input isRequired {...inputProps} label="Телефон" type="tel" />
                        )}
                    </InputMask>

                    <Input
                        isRequired
                        endContent={
                            <button
                                tabIndex={-1}
                                onClick={() => setIsPasswordHidden((prevState) => !prevState)}
                                type="button"
                                disabled={false}
                            >
                                {isPasswordHidden ? (
                                    <RiEyeLine size={20} className="z-50 text-gray" />
                                ) : (
                                    <RiEyeOffLine size={20} className="z-50 text-gray" />
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
                    <Input
                        isRequired
                        value={credentials.repeatedPassword}
                        onChange={(ev) =>
                            setCredentials({
                                ...credentials,
                                repeatedPassword: ev.target.value,
                            })
                        }
                        label="Повторите пароль"
                        type={isPasswordHidden ? 'password' : 'text'}
                    />

                    <Divider />

                    <HStack maxW>
                        <Input
                            isRequired
                            label="Имя"
                            value={credentials.firstname}
                            onChange={(ev) =>
                                setCredentials({
                                    ...credentials,
                                    firstname: ev.target.value,
                                })
                            }
                        />
                        <Input
                            isRequired
                            label="Фамилия"
                            value={credentials.lastname}
                            onChange={(ev) =>
                                setCredentials({
                                    ...credentials,
                                    lastname: ev.target.value,
                                })
                            }
                        />
                    </HStack>
                    <Checkbox
                        isSelected={isEmployer}
                        icon={<RiCheckLine size={18} className="text-red" />}
                        color="danger"
                        onChange={(ev) => setIsEmployer(ev.target.checked)}
                    >
                        Сотрудник компании
                    </Checkbox>

                    {isEmployer && (
                        <Input
                            isRequired
                            label="Должность"
                            value={credentials.position}
                            onChange={(ev) =>
                                setCredentials({
                                    ...credentials,
                                    position: ev.target.value,
                                })
                            }
                        />
                    )}
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
                        {isAuthLoading ? 'Подождите...' : 'Зарегистрироваться'}
                    </Button>
                    <HStack maxW justify="center" className="mt-4">
                        <p className="text-s">Уже есть аккаунт?</p>
                        <TextButton onClick={onModeChange} className="text-s text-red">
                            Войти
                        </TextButton>
                    </HStack>
                </VStack>
            </form>
        </VStack>
    );
};
