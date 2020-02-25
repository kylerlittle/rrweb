/* tslint:disable: no-console */
import { deflate, inflate } from 'pako';
import { eventWithTime } from '../types';
import { PackFn, UnpackFn, eventWithTimeAndPacker } from './base';

const VERSION = 1;
const PACKER = 'p';
const MARK = `${PACKER}${VERSION}`;

export const pack: PackFn = (events: eventWithTime[]): string => {
  return JSON.stringify(
    events.map(e => {
      const _e: eventWithTimeAndPacker = {
        ...e,
        p: MARK,
      };
      return deflate(JSON.stringify(_e));
    }),
  );
};

export const unpack: UnpackFn = (raw: string): eventWithTime[] => {
  if (Array.isArray(raw)) {
    // unpacking unpacked data, maybe legacy events
    console.info('unpacking unpacked data...');
    return raw;
  }
  const data: string[] | eventWithTime[] = JSON.parse(raw);
  if (!data.length) {
    return [];
  }
  if (
    data.every(
      (item: string | eventWithTime) =>
        typeof item === 'object' && 'timestamp' in item,
    )
  ) {
    // unpacking unpacked data, maybe legacy events
    console.info('unpacking unpacked data...');
    return data as eventWithTime[];
  }
  let firstEvent!: eventWithTimeAndPacker;
  try {
    firstEvent = JSON.parse(inflate(data[0] as string, { to: 'string' }));
  } catch (error) {
    console.error(error);
    throw new Error('Unknown data format.');
  }
  if (firstEvent.p !== MARK) {
    throw new Error(
      `These events were packed with packer ${firstEvent.p} which is incompatible with current packer ${MARK}.`,
    );
  }
  return (data as string[]).map(item => {
    return JSON.parse(inflate(item, { to: 'string' }));
  });
};
