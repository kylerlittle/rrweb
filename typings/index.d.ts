import record from './record';
import { Replayer } from './replay';
import { mirror } from './utils';
export * from './types';
declare const addCustomEvent: <T>(tag: string, payload: T) => void;
export { record, addCustomEvent, Replayer, mirror };
