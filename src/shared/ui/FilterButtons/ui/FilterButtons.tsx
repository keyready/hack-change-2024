import classes from './FilterButtons.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack } from '@/shared/ui/Stack';

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

    return (
        <HStack gap="12px" maxW className={classNames(classes.FilterButtons, {}, [className])}>
            {options.map((opt) => (
                <button
                    type="button"
                    className={classNames(classes.option, {
                        [classes.selected]: selectedOption?.value === opt.value,
                    })}
                    onClick={() => onOptionChange(opt)}
                >
                    {opt.label}
                </button>
            ))}
        </HStack>
    );
};
