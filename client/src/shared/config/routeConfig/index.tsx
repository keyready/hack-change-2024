import { RouteProps } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';
import { NotFound } from '@/pages/NotFound';
import { UserRoles } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
};

export enum AppRoutes {
    MAIN = 'main',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    // авторизация
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
