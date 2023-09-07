import React from 'react';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';

import { usePointerDrag } from '../src';

describe('usePointerDrag', () => {
  describe('onStart', () => {
    it('should be called when move occurs after pointer down', () => {
      const Component: React.FC<{ onStart: () => void }> = ({ onStart }) => {
        const { dragProps } = usePointerDrag({ onStart });

        return <div data-testid="test" {...dragProps()} />;
      };
      const fn = jest.fn();
      render(<Component onStart={fn} />);

      const el = screen.getByTestId('test');
      fireEvent.pointerDown(el);
      fireEvent.pointerMove(el);

      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('onMove', () => {
    it('should be called when move occurs after first move after pointer down', () => {
      const Component: React.FC<{ onMove: () => void }> = ({ onMove }) => {
        const { dragProps } = usePointerDrag({ onMove });

        return <div data-testid="test" {...dragProps()} />;
      };
      const fn = jest.fn();
      render(<Component onMove={fn} />);

      const el = screen.getByTestId('test');
      fireEvent.pointerDown(el);
      fireEvent.pointerMove(el);
      fireEvent.pointerMove(el);

      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('onEnd', () => {
    it('should be called when pointer up occurs after pointer move', () => {
      const Component: React.FC<{ onEnd: () => void }> = ({ onEnd }) => {
        const { dragProps } = usePointerDrag({ onEnd });

        return <div data-testid="test" {...dragProps()} />;
      };
      const fn = jest.fn();
      render(<Component onEnd={fn} />);

      const el = screen.getByTestId('test');
      fireEvent.pointerDown(el);
      fireEvent.pointerMove(el);
      fireEvent.pointerUp(el);

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should not be called if no pointer move occurs', () => {
      const Component: React.FC<{ onEnd: () => void }> = ({ onEnd }) => {
        const { dragProps } = usePointerDrag({ onEnd });

        return <div data-testid="test" {...dragProps()} />;
      };
      const fn = jest.fn();
      render(<Component onEnd={fn} />);

      const el = screen.getByTestId('test');
      fireEvent.pointerDown(el);
      fireEvent.pointerUp(el);

      expect(fn).toHaveBeenCalledTimes(0);
    });
  });

  describe('onClick', () => {
    it('should be called when no pointer move occurs after pointer down', () => {
      const Component: React.FC<{ onClick: () => void }> = ({ onClick }) => {
        const { dragProps } = usePointerDrag({ onClick });

        return <div data-testid="test" {...dragProps()} />;
      };
      const fn = jest.fn();
      render(<Component onClick={fn} />);

      const el = screen.getByTestId('test');
      fireEvent.pointerDown(el);
      fireEvent.pointerUp(el);

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should not be called if pointer move occurs after pointer down', () => {
      const Component: React.FC<{ onClick: () => void }> = ({ onClick }) => {
        const { dragProps } = usePointerDrag({ onClick });

        return <div data-testid="test" {...dragProps()} />;
      };
      const fn = jest.fn();
      render(<Component onClick={fn} />);

      const el = screen.getByTestId('test');
      fireEvent.pointerDown(el);
      fireEvent.pointerMove(el);
      fireEvent.pointerUp(el);

      expect(fn).toHaveBeenCalledTimes(0);
    });
  });
});
