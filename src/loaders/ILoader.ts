export default interface ILoader {
    load(): Promise<void>;
    destroy(): Promise<void>;
  }
  