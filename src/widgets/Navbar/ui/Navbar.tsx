import { Image } from '@nextui-org/react';
import { useState } from 'react';

import classes from './Navbar.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack } from '@/shared/ui/Stack';
import { AvatarDropdown } from '@/widgets/AvatarDropdown';
import { SearchInputDropdown } from '@/widgets/SearchInputDropdown';
import { Option } from '@/shared/ui/FilterButtons';

interface NavbarProps {
    className?: string;
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props;

    const [searchString, setSearchString] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<Option>();

    return (
        <HStack
            className={classNames(classes.Navbar, {}, [className])}
            align="center"
            justify="between"
            gap="64px"
            maxW
        >
            <Image
                classNames={{ wrapper: classes.imgWrapper, img: 'rounded-none w-18 h-18' }}
                src="/static/logo.webp"
            />
            <SearchInputDropdown
                onSelectedFilterChange={setSelectedFilter}
                selectedFilter={selectedFilter}
                onSearchValueChange={setSearchString}
                searchValue={searchString}
            />

            <AvatarDropdown />
        </HStack>
    );
};
