import { memo } from 'react';

import { SearchResults } from '../model/types/SearchResults';

import classes from './SearchResultsCard.module.scss';

import { classNames } from '@/shared/lib/classNames';

interface SearchResultsCardProps {
    className?: string;
    data: SearchResults;
}

export const SearchResultsCard = memo((props: SearchResultsCardProps) => {
    const { className, data } = props;

    return (
        <div className={classNames(classes.SearchResultsCard, {}, [className])}>
            <h1>{data.title}</h1>
            <p>{data.address}</p>
        </div>
    );
});
