import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Event object to be applied on the target element.
 * <div {...events} />
 */
export interface IPointerDragEvents {
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

export interface IPointerDragState<T> {
  /**
   * Function to be called when dragging begins.
   */
  startDragging: (state: T) => void;

  /**
   * Current drag state. Undefined if not moving.
   */
  dragState?: T;
}

/**
 * Common mouse/touch hold and move actions.
 * @param updatePosition Function to be called with clientX and clientY when mouse/touch is down and dragged.
 * @returns IPointerDragState
 */
export function usePointerDrag<T>(
  updatePosition: (x: number, y: number, dragState: T) => void
): IPointerDragState<T> {
  const [dragState, setDragState] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (typeof dragState === 'undefined') {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      updatePosition(e.clientX, e.clientY, dragState);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const touch = e.touches[0];
      if (!touch) {
        return;
      }

      updatePosition(touch.clientX, touch.clientY, dragState);
    };

    const handleUp = () => {
      setDragState(undefined);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleUp);

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleUp);
    document.addEventListener('touchcancel', handleUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleUp);

      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleUp);
      document.removeEventListener('touchcancel', handleUp);
    };
  });

  const startDragging = useCallback((state: T) => setDragState(state), [
    setDragState
  ]);

  return {
    startDragging,
    dragState
  };
}

export interface IPointerDragSimpleState {
  /**
   * Event object to be applied on the target element.
   * <div {...events} />
   */
  events: IPointerDragEvents;

  /**
   * Whether the element is currently being dragged.
   */
  moving: boolean;
}

/**
 * Common mouse/touch hold and move actions.
 * @param updatePosition Function to be called with clientX and clientY when mouse/touch is down and dragged.
 * @returns IPointerDragState
 */
export function usePointerDragSimple(
  updatePosition: (x: number, y: number) => void
): IPointerDragSimpleState {
  const { startDragging, dragState } = usePointerDrag<boolean>(updatePosition);

  const events = useMemo(
    () => ({
      onMouseDown: (e: React.MouseEvent) => {
        e.preventDefault();
        startDragging(true);
      },
      onTouchStart: (e: React.TouchEvent) => {
        e.preventDefault();
        startDragging(true);
      }
    }),
    [startDragging]
  );

  return {
    events,
    moving: dragState || false
  };
}
