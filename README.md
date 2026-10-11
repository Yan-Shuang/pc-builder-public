# PC Builder — public source snapshot

This is a curated public snapshot of **Yan Shuang's private `pc-builder` project**.
It preserves the product's deterministic recommendation approach in a compact,
auditable static demo while keeping the original private repository and its full
history unchanged.

## Included

- A deterministic, exhaustive budget recommender.
- Compatibility gates for socket, memory generation, case size, cooling, GPU
  clearance, and power supply headroom.
- A geometric CPU/GPU score based on the private project's `site-score-v1`
  design: `1000 × CPU^0.5 × GPU^0.5` relative to a fixed example baseline.
- Fictional, explicitly labelled example parts and prices.
- A zero-backend interactive demo that runs entirely in the browser.
- Node tests for stable ranking, budget, and compatibility behavior.

## Excluded on purpose

The original private Git history, vendor logos, product images, manuals, copied
product pages, product-specific 3D files, model working assets, private catalog,
and any service configuration are not part of this snapshot. This repository is
not a mirror of the full application and does not make claims about real-market
prices or compatibility.

The public demo does not call model providers, shopping APIs, analytics, or any
other network service. It never asks for or stores an API key. Browser storage is
not used.

## Run locally

Serve the repository root with any static HTTP server, then open `index.html`.
ES modules do not run reliably from `file://` URLs.

```sh
python3 -m http.server 4173
```

Run checks with Node 20 or newer:

```sh
npm test
npm run check
```

## License

Project-authored code in this snapshot is MIT licensed. See `LICENSE` and
`THIRD_PARTY_NOTICES.md`.
