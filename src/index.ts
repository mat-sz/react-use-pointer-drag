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

export interface IPointerDragOptions {
  /**
   * If set to true, stopPropagation will be called.
   * Default: true.
   */
  stopPropagation?: boolean;

  /**
   * If set to true, preventDefault will be called.
   * Default: true.
   */
  preventDefault?: boolean;
}

/**
 * Common mouse/touch hold and move actions.
 * @param updatePosition Function to be called with clientX and clientY when mouse/touch is down and dragged.
 * @returns IPointerDragState
 */
export function usePointerDrag<T>(
  updatePosition: (x: number, y: number, dragState: T) => void,
  options: IPointerDragOptions = {}
): IPointerDragState<T> {
  const [dragState, setDragState] = useState<T | undefined>(undefined);

  const { stopPropagation = true, preventDefault = true } = options;

  useEffect(() => {
    if (typeof dragState === 'undefined') {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (preventDefault) e.preventDefault();
      if (stopPropagation) e.stopPropagation();

      updatePosition(e.clientX, e.clientY, dragState);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (preventDefault) e.preventDefault();
      if (stopPropagation) e.stopPropagation();

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
  updatePosition: (x: number, y: number) => void,
  options: IPointerDragOptions = {}
): IPointerDragSimpleState {
  const { startDragging, dragState } = usePointerDrag<boolean>(
    updatePosition,
    options
  );

  const { stopPropagation = true, preventDefault = true } = options;

  const events = useMemo(
    () => ({
      onMouseDown: (e: React.MouseEvent) => {
        if (preventDefault) e.preventDefault();
        if (stopPropagation) e.stopPropagation();

        startDragging(true);
      },
      onTouchStart: (e: React.TouchEvent) => {
        if (preventDefault) e.preventDefault();
        if (stopPropagation) e.stopPropagation();

        startDragging(true);
      }
    }),
    [startDragging, preventDefault, stopPropagation]
  );

  return {
    events,
    moving: dragState || false
  };
}
