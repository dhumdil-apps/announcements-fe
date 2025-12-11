type Listener = (usingMock: boolean) => void;

let usingMockData = false;
const listeners = new Set<Listener>();

export function isUsingMockData(): boolean {
  return usingMockData;
}

export function setUsingMockData(value: boolean): void {
  if (usingMockData !== value) {
    usingMockData = value;
    listeners.forEach((listener) => listener(value));
  }
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
