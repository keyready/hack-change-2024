import { classNames } from '@/shared/lib/classNames';
import { memo } from 'react';
import classes from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.ProfileCard, {}, [className])}>
            {t('ProfileCard')}
        </div>
    );
});
