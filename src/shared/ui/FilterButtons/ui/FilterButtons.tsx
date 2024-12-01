import { useCallback, useMemo, useState } from 'react';

import classes from './FilterButtons.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';

export interface Option {
    value: string;
    label: string;
}

interface FilterButtonsProps {
    className?: string;
    options?: Option[];
    isLoading?: boolean;
    onOptionChange: (opt: Option | undefined) => void;
    selectedOption?: Option;
}

export const FilterButtons = (props: FilterButtonsProps) => {
    const { className, isLoading, onOptionChange, selectedOption, options } = props;

    const [cutFilters, setCutFilters] = useState<boolean>(true);

    const handleFilterSelect = useCallback(
        (opt: Option) => {
            if (selectedOption?.value === opt.value) {
                onOptionChange(undefined);
            } else {
                onOptionChange(opt);
                setCutFilters(true);
            }
        },
        [onOptionChange, selectedOption],
    );

    const isSelectedFilterHidden = useMemo(
        () =>
            options?.length
                ? options.findIndex((opt) => opt.value === selectedOption?.value) > 8
                : false,
        [options, selectedOption?.value],
    );

    if (isLoading || !options?.length) {
        return (
            <div className={classes.FilterButtons}>
                {new Array(10).fill(0).map((_, index) => (
                    <Skeleton
                        className="border-1 border-red rounded-xl "
                        key={index}
                        width="100%"
                        height="40px"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className={classNames(classes.FilterButtons, {}, [className])}>
            {options?.slice(0, cutFilters ? 9 : options?.length).map((opt) => (
                <button
                    type="button"
                    className={classNames(classes.option, {
                        [classes.selected]: selectedOption?.value === opt.value,
                    })}
                    onClick={() => handleFilterSelect(opt)}
                >
                    {opt.label}
                </button>
            ))}
            {options?.length > 9 && cutFilters ? (
                <button
                    onClick={() => setCutFilters(false)}
                    type="button"
                    className={classNames(classes.option, {
                        [classes.selected]: isSelectedFilterHidden,
                    })}
                >
                    + еще {options.length - 9}
                </button>
            ) : null}
        </div>
    );
};
