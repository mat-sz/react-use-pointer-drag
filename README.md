<h1 align="center">
react-use-pointer-drag
</h1>

<p align="center">
<img alt="workflow" src="https://img.shields.io/github/actions/workflow/status/mat-sz/react-use-pointer-drag/node.js.yml?branch=main">
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
// In component:

const { dragProps } = usePointerDrag({
  onMove: ({ x, y }) => {
    // Do something.
  },
});

return <div {...dragProps()} />;
```

### With state:

```tsx
// In component:

const { dragProps } = usePointerDrag<{ clip: Clip }>({
  onMove: ({ x, y, state: { clip } }) => {
    // Do something.
  },
});

return <div {...dragProps({ clip })} />;
```
