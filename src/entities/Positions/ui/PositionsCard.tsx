import { memo } from 'react';

import classes from './PositionsCard.module.scss';

import { classNames } from '@/shared/lib/classNames';

interface PositionsCardProps {
    className?: string;
}

export const PositionsCard = memo((props: PositionsCardProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.PositionsCard, {}, [className])}>
            <p>hello</p>
        </div>
    );
});
