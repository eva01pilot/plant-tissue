export interface CommonEvent<T> extends Event {
  target: T & EventTarget
}
