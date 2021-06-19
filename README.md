<h1 align="center">
react-use-pointer-drag
</h1>

<p align="center">
<img alt="workflow" src="https://img.shields.io/github/workflow/status/mat-sz/react-use-pointer-drag/CI">
<a href="https://npmjs.com/package/react-use-pointer-drag">
<img alt="npm" src="https://img.shields.io/npm/v/react-use-pointer-drag">
<img alt="npm" src="https://img.shields.io/npm/dw/react-use-pointer-drag">
<img alt="NPM" src="https://img.shields.io/npm/l/react-use-pointer-drag">
</a>
</p>
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
