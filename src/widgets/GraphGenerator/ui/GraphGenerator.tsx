import { Background, ConnectionLineType, Edge, Node, ReactFlow } from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import { type MouseEvent as ReactMouseEvent, useCallback, useEffect, useMemo } from 'react';

import { rawData, transformData } from '../lib/initialNodes';

import { classNames } from '@/shared/lib/classNames';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 120;
const nodeHeight = 70;

const getLayoutedElements = (
    nodes: Node[],
    edges: Edge[],
    direction = 'TB',
): { nodes: Node[]; edges: Edge[] } => {
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
            targetPosition: 'top',
            sourcePosition: 'bottom',
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };
    });

    // @ts-ignore
    return { nodes: newNodes, edges };
};

const { edges: formattedEdges, nodes: formattedNodes } = transformData(rawData);

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    formattedNodes,
    formattedEdges,
);

interface GraphGeneratorProps {
    className?: string;
}

export const GraphGenerator = (props: GraphGeneratorProps) => {
    const { className } = props;

    const nodes = useMemo(() => layoutedNodes, []);
    const edges = useMemo(() => layoutedEdges, []);

    const handleNodeClick = useCallback((event: ReactMouseEvent, node: Node) => {
        alert(node.id);
    }, []);

    // убираем мыльный знак
    useEffect(() => {
        const banner = document.getElementsByClassName(
            'react-flow__panel react-flow__attribution bottom right',
        );
        if (banner.length) {
            banner[0].remove();
        }
    }, []);

    return (
        <div className={classNames('w-full h-screen', {}, [className])}>
            <ReactFlow
                nodesConnectable={false}
                nodesDraggable={false}
                nodes={nodes}
                edges={edges}
                connectionLineType={ConnectionLineType.SmoothStep}
                onNodeClick={handleNodeClick}
            >
                <Background />
            </ReactFlow>
        </div>
    );
};
