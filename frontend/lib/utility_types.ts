export interface VueEvent<T extends EventTarget> extends Event {
  target: T
} 
