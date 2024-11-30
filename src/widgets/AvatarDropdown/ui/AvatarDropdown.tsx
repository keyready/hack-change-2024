import { Button, Image, Modal, ModalContent } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ReactFlipCard from 'reactjs-flip-card';

import classes from './AvatarDropdown.module.scss';

import { HStack, VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames';
import {
    getUserData,
    getUserIsLoading,
    LoginBlock,
    SignupBlock,
    UserActions,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const userData = useSelector(getUserData);
    const isLoading = useSelector(getUserIsLoading);

    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [isAuthModalOpened, setIsAuthModalOpened] = useState<boolean>(false);

    useEffect(() => {
        dispatch(UserActions.clearAuthError());
    }, [authMode, dispatch]);

    if (!userData && isLoading) {
        return (
            <Button isLoading isDisabled variant="ghost" className="px-5 py-5 min-w-0 min-h-0">
                Загрузка...
            </Button>
        );
    }

    if (!userData && !isLoading) {
        return (
            <>
                <Button
                    onClick={() => setIsAuthModalOpened(true)}
                    variant="light"
                    className="px-5 py-5 min-w-0 min-h-0"
                >
                    <HStack
                        gap="12px"
                        className={classNames(classes.AvatarDropdown, {}, [className])}
                    >
                        <Image width={36} height={36} src="/static/avatar.webp" />
                        <VStack gap="4px">
                            <p className="leading-none text-[16px] text-[#4F4F4F] font-bold">
                                Войти
                            </p>
                            <p className="leading-none text-[#9E9E9E] text-[12px]">Гость</p>
                        </VStack>
                    </HStack>
                </Button>
                <Modal isOpen={isAuthModalOpened} onClose={() => setIsAuthModalOpened(false)}>
                    <ModalContent className="p-5">
                        <ReactFlipCard
                            flipByProp={authMode === 'signup'}
                            containerCss="w-full h-fit"
                            flipTrigger="disabled"
                            frontComponent={
                                <LoginBlock onModeChange={() => setAuthMode('signup')} />
                            }
                            backComponent={
                                <SignupBlock onModeChange={() => setAuthMode('login')} />
                            }
                        />
                    </ModalContent>
                </Modal>
            </>
        );
    }

    return (
        <HStack gap="12px" className={classNames(classes.AvatarDropdown, {}, [className])}>
            <Image
                classNames={{ wrapper: `${classes.imgWrapper} w-9 h-9` }}
                src="/static/avatar.webp"
            />
            <VStack gap="4px">
                <p className="leading-none text-[16px] text-[#4F4F4F] font-bold">
                    {userData?.firstname} {userData?.lastname}
                </p>
                <p className="leading-none text-[#9E9E9E] text-[12px]">{userData?.position}</p>
            </VStack>
        </HStack>
    );
};
