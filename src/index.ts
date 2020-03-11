import record from './record';
import { Replayer } from './replay';
import { mirror } from './utils';

export * from './types';

const { addCustomEvent } = record;

export { record, addCustomEvent, Replayer, mirror };
