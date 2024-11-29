import {
    ConnectionLineType,
    Edge,
    Node,
    ReactFlow,
    useEdgesState,
    useNodesState,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import { type MouseEvent as ReactMouseEvent, useCallback } from 'react';

import classes from './MainPage.module.scss';
import { rawData, transformData } from './initialNodes';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 110;
const nodeHeight = 50;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };
    });

    return { nodes: newNodes, edges };
};

const { edges: formattedEdges, nodes: formattedNodes } = transformData(rawData);

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    formattedNodes,
    formattedEdges,
);

const MainPage = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

    const handleNodeClick = useCallback((event: ReactMouseEvent, node: Node) => {
        alert(node.id);
    }, []);

    return (
        <Page className={classNames(classes.MainPage, {}, [])}>
            <ReactFlow
                nodesConnectable={false}
                nodesDraggable={false}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                connectionLineType={ConnectionLineType.SmoothStep}
                onNodeClick={handleNodeClick}
            />
        </Page>
    );
};

export default MainPage;
