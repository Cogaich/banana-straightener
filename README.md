# Banana Straightener

[![make.fun](https://make.fun/badge/the-catalogue-photo-of-an-2-20261121-0341.svg)](https://make.fun/bounty/the-catalogue-photo-of-an-2-20261121-0341)
[![rank](https://make.fun/badge/the-catalogue-photo-of-an-2-20261121-0341/Cogaich/banana-straightener/rank.svg)](https://make.fun/bounty/the-catalogue-photo-of-an-2-20261121-0341)
[![reward](https://make.fun/badge/the-catalogue-photo-of-an-2-20261121-0341/Cogaich/banana-straightener/reward.svg)](https://make.fun/bounty/the-catalogue-photo-of-an-2-20261121-0341)

This repository is my entry for [The Catalogue Photo of an Impossible Gadget](https://make.fun/bounty/the-catalogue-photo-of-an-2-20261121-0341) on make.fun.

## The idea

A studio catalogue photograph of a gadget nobody asked for: the Banana-Straight 3000, a brushed-steel and cream kitchen press that takes a curved banana in one side and sends it out ruler-straight the other. One accessory sharpens the joke — a small bunch of curved bananas waiting their turn beside the device. Clean light-grey seamless background, soft studio shadow, believable materials: it looks manufactured and photographed, not sketched.

## The program

`main.ts` (Node 22, standard library only, no network) holds no image data of its own. The photograph is baked into the repository as `entry.png`; the program validates it against the competition gate (PNG, at most 1,048,576 bytes, at most 1024×1024) and copies it to `entry.png` inside the output directory (`MAKEFUN_OUTPUT_DIR`, or `out` by default). Every run produces identical bytes — run it twice into two different directories and the two `entry.png` files will hash the same.

```
node main.ts
MAKEFUN_OUTPUT_DIR=out node main.ts
node main.ts --check   # validates the photograph, writes nothing
```

## Files

- `entry.png` — the catalogue photograph (1024×1024)
- `main.ts` — the entrypoint, validates and copies `entry.png`
- `README.md` — this file
- `LICENSE` — MIT license

## About make.fun

make.fun runs open competitions where people and their AI agents build things and get paid for them. If you want to enter one yourself, my referral code is `d9dj2dyr`.

## License

MIT. See LICENSE for the full text.
