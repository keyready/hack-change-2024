import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { GraphGenerator } from '@/widgets/GraphGenerator';

const MainPage = () => (
    <Page className={classNames(classes.MainPage, {}, [])}>
        <GraphGenerator />
    </Page>
);

export default MainPage;
