import * as t from 'io-ts';

export const ItemCodec = t.exact(
  t.type({
    Name: t.string,
    Image: t.string,
    Version: t.string,
    'Internal ID': t.string,
    'Unique Entry ID': t.string,
    Size: t.string,
  }),
);
export type Item = t.TypeOf<typeof ItemCodec>;

export const WallMountCodec = t.intersection([
  ItemCodec,
  t.exact(
    t.type({
      Variation: t.string,
      'Body Title': t.string,
      Pattern: t.string,
      'Pattern Title': t.string,
      DIY: t.string,
      'Body Customize': t.string,
      'Pattern Customize': t.string,
      Buy: t.string,
      Sell: t.string,
      'Color 1': t.string,
      'Color 2': t.string,
      'HHA Concept 1': t.string,
      'HHA Concept 2': t.string,
      'HHA Series': t.string,
      'HHA Set': t.string,
      Interact: t.string,
      'Lighting Type': t.string,
      'Door Deco': t.string,
    }),
  ),
]);

export type WallMount = t.TypeOf<typeof WallMountCodec>;

export const WallMountsCodec = t.array(WallMountCodec);

export type WallMounts = t.TypeOf<typeof WallMountsCodec>;

// TODO: find a way to define codecs without any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Codec = t.TypeC<any> | t.IntersectionC<any> | t.ArrayC<any>;
