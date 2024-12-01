import { Background, ConnectionLineType, Edge, Node, ReactFlow } from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import {
    type MouseEvent as ReactMouseEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Image, Modal, ModalContent } from '@nextui-org/react';
import { RiPhoneLine, RiUser2Line } from '@remixicon/react';
import { useSelector } from 'react-redux';

import { SourceNodesMap, transformData } from '../lib/initialNodes';

import { classNames } from '@/shared/lib/classNames';
import { useNode } from '@/entities/Node';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getUserData } from '@/entities/User';
import { Spinner } from '@/shared/ui/Spinner';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 120;
const nodeHeight = 70;

interface GraphGeneratorProps {
    className?: string;
}

export const GraphGenerator = (props: GraphGeneratorProps) => {
    const { className } = props;

    const userData = useSelector(getUserData);

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [selectedNode, setSelectedNode] = useState<Partial<SourceNodesMap>>({});

    const getLayoutedElements = useCallback(
        (nodes: Node[], edges: Edge[], direction = 'TB'): { nodes: Node[]; edges: Edge[] } => {
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
        },
        [],
    );

    const { data: rawNodesData, isLoading: isNodesLoading } = useNode();

    const { edges: formattedEdges, nodes: formattedNodes } = transformData(rawNodesData || []);

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        formattedNodes,
        formattedEdges,
    );

    const nodes = useMemo(() => layoutedNodes, [layoutedNodes]);
    const edges = useMemo(() => layoutedEdges, [layoutedEdges]);

    const handleNodeClick = useCallback((event: ReactMouseEvent, node: Node) => {
        setIsModalOpened(true);
        setSelectedNode(node.data);
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

    if (isNodesLoading) {
        return (
            <div
                className={classNames('flex justify-center items-center w-full h-screen', {}, [
                    className,
                ])}
            >
                <Spinner height="128px" width="128px" fill="#E2001A" />
            </div>
        );
    }

    return (
        <div className={classNames('w-full h-screen', {}, [className])}>
            <Modal hideCloseButton isOpen={isModalOpened} onClose={() => setIsModalOpened(false)}>
                <ModalContent className="p-4">
                    <div className="relative mb-4">
                        <Image src="/static/avatar.webp" width="100%" height={400} />
                        <div className="flex justify-start align-center absolute top-0 left-0 z-50 p-1 w-52 h-10 rounded-md bg-red">
                            <p className="font-bold text-white">{selectedNode.position}</p>
                        </div>
                    </div>
                    <VStack maxW gap="4px">
                        <HStack maxW>
                            <RiUser2Line className="text-gray" />
                            <h1 className="text-md text-gray font-bold leading-none text-center">
                                {selectedNode.name}
                            </h1>
                        </HStack>
                        <HStack maxW>
                            <RiPhoneLine className="text-gray" />
                            {userData?.lastname ? (
                                <h2 className="text-md text-gray font-bold leading-none text-center">
                                    {selectedNode.phone}
                                </h2>
                            ) : (
                                <h2 className="text-s text-gray font-bold leading-none text-center">
                                    Авторизуйтесь, чтобы получить доступ ко всей информации
                                </h2>
                            )}
                        </HStack>
                    </VStack>
                </ModalContent>
            </Modal>

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
