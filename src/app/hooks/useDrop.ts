
// --- Custom Hooks for Drag and Drop ---

import { useCallback } from "react";

export function useDrop({ onDrop, onDragOver }: {
    onDrop?: (e: React.DragEvent, id: string) => void,
    onDragOver?: (e: React.DragEvent) => void
}) {
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        onDrop?.(e, id);
    }, [onDrop]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        onDragOver?.(e);
    }, [onDragOver]);

    return { handleDrop, handleDragOver };
}