import { Positions } from './Positions';

export interface PositionsSchema {
    data?: Positions;
    isLoading: boolean;
    error?: string;
}
