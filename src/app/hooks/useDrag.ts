import { useCallback } from "react";

export function useDrag({ onDragStart, onDragEnd }: {
    onDragStart?: (e: React.DragEvent, id: string) => void,
    onDragEnd?: (e: React.DragEvent) => void
}) {
    const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
        e.dataTransfer.setData("text/plain", id);
        onDragStart?.(e, id);
    }, [onDragStart]);

    const handleDragEnd = useCallback((e: React.DragEvent) => {
        e.dataTransfer.clearData();
        onDragEnd?.(e);
    }, [onDragEnd]);

    return { handleDragStart, handleDragEnd };
}