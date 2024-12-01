import { RiSearchLine } from '@remixicon/react';
import { Input } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

import classes from './SearchInputDropdown.module.scss';

import { classNames, Mods } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { FilterButtons, Option } from '@/shared/ui/FilterButtons';
import { usePositions } from '@/entities/Positions/api/PositionsApi';
import { SearchResultsCard, useSearchResults } from '@/entities/SearchResults';
import { Skeleton } from '@/shared/ui/Skeleton';

interface SearchInputDropdownProps {
    className?: string;
    placeholder?: string;
}

export const SearchInputDropdown = (props: SearchInputDropdownProps) => {
    const { className, placeholder } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const { data: positions, isLoading: isPositionsLoading } = usePositions();

    const [isInFocus, setIsInFocus] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<Option | undefined>();

    const [debouncedSearchValue] = useDebounce(searchValue, 500);

    const { data: searchResults, isLoading: isSearchLoading } = useSearchResults({
        search: debouncedSearchValue,
        position: selectedFilter?.label || '',
    });

    const mods: Mods = {
        [classes.overlayActive]: isInFocus,
    };

    useEffect(() => {
        const handleKeyPressed = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                setIsInFocus(false);
                if (inputRef.current) {
                    inputRef.current.blur();
                }
            }
        };

        document.addEventListener('keydown', handleKeyPressed);

        return () => document.removeEventListener('keydown', handleKeyPressed);
    }, []);

    return (
        <>
            <VStack maxW className={`w-2/3 relative ${isInFocus ? 'z-[150]' : ''}`}>
                <Input
                    ref={inputRef}
                    value={searchValue}
                    onChange={(ev) => setSearchValue(ev.target.value)}
                    onFocus={() => setIsInFocus(true)}
                    startContent={<RiSearchLine color="#BCBDBE" />}
                    placeholder={placeholder || 'Поиск специалистов'}
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
                            isLoading={isPositionsLoading}
                            onOptionChange={setSelectedFilter}
                            selectedOption={selectedFilter}
                            options={positions?.map((pos) => ({
                                label: pos.title,
                                value: pos.id.toString(),
                            }))}
                        />
                    </div>
                    <div className="min-h-48 max-h-64 overflow-y-auto px-10 py-4 border-t-2 border-[#BCBDBE] w-full">
                        <p className="mb-2 text-l text-black italic">Результаты поиска</p>
                        <VStack maxW gap="8px">
                            {searchValue || selectedFilter?.value ? (
                                !searchResults?.length && !isSearchLoading ? (
                                    <p className="italic text-m opacity-70">
                                        Ничего не найдено. Измените запрос
                                    </p>
                                ) : isSearchLoading ? (
                                    new Array(6)
                                        .fill(0)
                                        .map((_, index) => (
                                            <Skeleton
                                                key={index}
                                                className="rounded-md"
                                                width="100%"
                                                height={40}
                                            />
                                        ))
                                ) : (
                                    searchResults?.map((sr) => (
                                        <SearchResultsCard key={sr.title} data={sr} />
                                    ))
                                )
                            ) : (
                                <p className="italic text-m opacity-70">Введите запрос</p>
                            )}
                        </VStack>
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
