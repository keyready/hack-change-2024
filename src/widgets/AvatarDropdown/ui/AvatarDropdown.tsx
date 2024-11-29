import { Image } from '@nextui-org/react';

import classes from './AvatarDropdown.module.scss';

import { HStack, VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
    const { className } = props;

    return (
        <HStack gap="12px" className={classNames(classes.AvatarDropdown, {}, [className])}>
            <Image
                classNames={{ wrapper: `${classes.imgWrapper} w-9 h-9` }}
                src="https://avatar.iran.liara.run/public"
            />
            <VStack gap="4px">
                <p className="leading-none text-[16px] text-[#4F4F4F] font-bold">Иван Котов</p>
                <p className="leading-none text-[#9E9E9E] text-[12px]">Менеджер</p>
            </VStack>
        </HStack>
    );
};
