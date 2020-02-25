import { eventWithTime } from '../types';

export type PackFn = (events: eventWithTime[]) => string;
export type UnpackFn = (raw: string) => eventWithTime[];

export type Meta = {
  packer: string;
  version: number;
};

export type eventWithTimeAndPacker = eventWithTime & {
  p: string;
};
