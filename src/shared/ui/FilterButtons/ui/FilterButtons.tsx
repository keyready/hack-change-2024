import { useCallback, useMemo, useState } from 'react';

import classes from './FilterButtons.module.scss';

import { classNames } from '@/shared/lib/classNames';

export interface Option {
    value: string;
    label: string;
}

interface FilterButtonsProps {
    className?: string;
    options: Option[];
    onOptionChange: (opt: Option) => void;
    selectedOption?: Option;
}

export const FilterButtons = (props: FilterButtonsProps) => {
    const { className, onOptionChange, selectedOption, options } = props;

    const [cutFilters, setCutFilters] = useState<boolean>(true);

    const handleFilterSelect = useCallback(
        (opt: Option) => {
            onOptionChange(opt);
            setCutFilters(true);
        },
        [onOptionChange],
    );

    const isSelectedFilterHidden = useMemo(
        () => options.findIndex((opt) => opt.value === selectedOption?.value) > 8,
        [options, selectedOption?.value],
    );

    return (
        <div className={classNames(classes.FilterButtons, {}, [className])}>
            {options.slice(0, cutFilters ? 9 : options.length).map((opt) => (
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
            {options.length > 9 && cutFilters ? (
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
