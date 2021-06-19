# react-use-pointer-drag

A simple hook for handling drag and move actions in React apps.

## Example usage

### Simple:

```tsx
const { events } = usePointerDragSimple((x, y) => {
  // Do something.
});

return <div {...events} />;
```

### With state:

```tsx
const { startDragging } = usePointerDrag((x, y, dragState) => {
  // Do something.
});

return (
  <div
    onMouseDown={(e: React.MouseEvent) => {
      e.preventDefault();
      startDragging({
        initX: e.clientX,
        clip
      });
    }}
    onTouchStart={(e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) {
        return;
      }

      startDragging({
        initX: touch.clientX,
        clip
      });
    }}
  />
);
```
