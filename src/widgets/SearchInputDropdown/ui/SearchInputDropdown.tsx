import { RiSearchLine } from '@remixicon/react';
import { Input } from '@nextui-org/react';
import { useState } from 'react';

import classes from './SearchInputDropdown.module.scss';

import { classNames, Mods } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { FilterButtons, Option } from '@/shared/ui/FilterButtons';

interface SearchInputDropdownProps {
    className?: string;
}

export const SearchInputDropdown = (props: SearchInputDropdownProps) => {
    const { className } = props;

    const [isInFocus, setIsInFocus] = useState<boolean>(false);

    const [selectedFilter, setSelectedFilter] = useState<Option>();

    const mods: Mods = {
        [classes.overlayActive]: isInFocus,
    };

    return (
        <>
            <VStack maxW className={`w-2/3 relative ${isInFocus ? 'z-[150]' : ''}`}>
                <Input
                    onFocus={() => setIsInFocus(true)}
                    startContent={<RiSearchLine color="#BCBDBE" />}
                    placeholder="Поиск специалистов"
                    classNames={{
                        inputWrapper: isInFocus ? 'rounded-b-none' : '',
                    }}
                />
                <VStack
                    maxW
                    className={classNames(classes.filterPanel, {
                        [classes.filterPanelActive]: isInFocus,
                    })}
                >
                    <div className="px-10 py-4 border-t-2 border-[#BCBDBE] w-full">
                        <FilterButtons
                            onOptionChange={setSelectedFilter}
                            selectedOption={selectedFilter}
                            options={[
                                { label: 'Курсанты', value: 'cadets' },
                                { label: 'Разработчики', value: 'devs' },
                                { label: 'Тестировщики', value: 'tests' },
                                { label: 'Менеджеры', value: 'managers' },
                                { label: 'Дизайнеры', value: 'ui' },
                                { label: 'СММ-щики', value: 'smm' },
                                { label: 'Пиарщики', value: 'pr' },
                                { label: 'Аналитики', value: 'analytics' },
                            ]}
                        />
                    </div>
                    <div className="h-48 px-10 py-4 border-t-2 border-[#BCBDBE] w-full">
                        <p className="text-l text-black italic">Результаты поиска</p>
                    </div>
                </VStack>
            </VStack>

            <section
                onClick={() => setIsInFocus(false)}
                className={classNames(classes.SearchInputDropdownOverlay, mods, [className])}
            />
        </>
    );
};
