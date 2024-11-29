import {
    RiBarChartHorizontalLine,
    RiCollapseHorizontalLine,
    RiContactsLine,
    RiExpandHorizontalLine,
    RiHandHeartLine,
} from '@remixicon/react';
import { Button } from '@nextui-org/react';
import { useCallback, useState } from 'react';

import classes from './Sidebar.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleCollapseClick = useCallback(() => {
        setIsExpanded((prevState) => !prevState);
    }, []);

    return (
        <VStack
            align="center"
            className={classNames(classes.Sidebar, { [classes.isExpanded]: isExpanded }, [
                className,
            ])}
            gap={isExpanded ? '8px' : '24px'}
        >
            <AppLink to="/">
                <HStack justify="start" maxW>
                    <RiBarChartHorizontalLine size={isExpanded ? 14 : 20} />
                    {isExpanded && <p className="text-s">Иерархия</p>}
                </HStack>
            </AppLink>
            <AppLink to="/">
                <HStack justify="start" maxW>
                    <RiContactsLine size={isExpanded ? 14 : 20} />
                    {isExpanded && <p className="text-s">Контакты</p>}
                </HStack>
            </AppLink>
            <AppLink to="/">
                <HStack justify="start" maxW>
                    <RiHandHeartLine size={isExpanded ? 14 : 20} />
                    {isExpanded && <p className="text-s">Помощь</p>}
                </HStack>
            </AppLink>

            <Button
                onClick={handleCollapseClick}
                className={`absolute bottom-0 right-1 min-h-0 min-w-0 border-0 leading-none h-auto p-1 ${
                    isExpanded ? '' : 'translate-x-1/2 right-1/2'
                }`}
                variant="faded"
            >
                {isExpanded ? (
                    <RiCollapseHorizontalLine size={36} />
                ) : (
                    <RiExpandHorizontalLine size={20} />
                )}
            </Button>
        </VStack>
    );
};
