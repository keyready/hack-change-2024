import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUserData, getUserRoles, UserRoles } from '@/entities/User';
import { RoutePath } from '@/shared/config/routeConfig';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRoles[];
}
export function RequireAuth({ children, roles }: RequireAuthProps) {
    const userData = useSelector(getUserData);
    const userRoles = useSelector(getUserRoles);

    const currentLocation = useLocation();

    // const hasRequiredRoles = useMemo(() => {
    //     if (!roles) return true;
    //
    //     return roles.every((requiredRole) => userRoles?.includes(requiredRole));
    // }, [roles, userRoles]);
    //
    // if (!hasRequiredRoles) {
    //     return <Navigate to={RoutePath.main} state={{ from: currentLocation }} replace />;
    // }

    if (!userData) {
        return <Navigate to={RoutePath.main} state={{ from: currentLocation }} replace />;
    }

    return children;
}
