import { Node } from './Node';

export interface NodeSchema {
    data?: Node;
    isLoading: boolean;
    error?: string;
}
