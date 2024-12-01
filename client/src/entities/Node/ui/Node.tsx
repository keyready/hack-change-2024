import { classNames } from '@/shared/lib/classNames';
import { memo } from 'react';
import classes from './NodeCard.module.scss';

interface NodeCardProps {
    className?: string;
}

export const NodeCard = memo((props: NodeCardProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.NodeCard, {}, [className])}>
            {t('NodeCard')}
        </div>
    );
});
