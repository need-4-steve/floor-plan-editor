import { useEffect } from "react";

export class Callback<T = null> {
  private callbacks: Array<(event?: T) => void> = [];

  public fire(event?: T) {
    this.callbacks.forEach((cb) => cb(event));
  }

  public add(fn: (event?: T) => void) {
    this.callbacks.push(fn);
  }

  public remove(fn: (event?: T) => void) {
    this.callbacks = this.callbacks.filter(
      (f) => f !== fn,
    );
  }
}

export function useCallback<T = null>(callback: Callback<T>, fn: (value?: T) => void) {
  useEffect(() => {
    callback.add(fn);
    return () => callback.remove(fn);
  }, []);
}
