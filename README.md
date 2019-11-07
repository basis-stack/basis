# Basis
[![Build Status](https://travis-ci.org/basis-stack/basis.svg?branch=master)](https://travis-ci.org/basis-stack/basis)
[![Build status](https://ci.appveyor.com/api/projects/status/y9frdmgti2eujjyd?svg=true)](https://ci.appveyor.com/project/justinware/basis)
[![Coverage Status](https://coveralls.io/repos/github/basis-stack/basis/badge.svg?branch=master)](https://coveralls.io/github/basis-stack/basis?branch=master)
[![Code Climate](https://codeclimate.com/github/basis-stack/basis/badges/gpa.svg)](https://codeclimate.com/github/basis-stack/basis)

### What ?
**TL;DR**: Node.js + ES6/TS + React project setup & framework pieces that forms the *basis* of solid, testable, production-ready JavaScript apps. Work in Progress.

Basis is a full-stack ES6 or TypeScript application project setup + framework elements for creating highly testable, robust, easy to scale, nice to use, feature focused, deploy-ready JavaScript applications. It combines both server & client code structure and framework elements (client / server mutually exclusive), and also build chain concerns in order to minimise boilerplate, bury repetitive setup and noise, bury build chain, bury productionisation concerns, bury wire-up, bury runtime and allow the application creator solely to focus on the good stuff, the timely and easy horizontal feature scale out.

Basis is NOT just another application quick starter / template / etc a la create-react-app or others, it can do that job if that’s the sole desire…but it’s goals, approach and reasoning is much more holistic that simply booting up a quick app.

In essence, Basis is a best-practice JavaScript stack…it is not a framework…nor a sole template. It combines the best of those approaches to pull together best-of-breed, prevalent, high-usage JavaScript libraries across the server, client (UI) and build tiers into a single full-stack offering for creating scalable and dependable applications.

At its core is an ethos of quality…quality code, quality testing, quality experience (be that in the server API, UI or even build chain experience) and is designed to create structured, large JavaScript apps.

Basis supports the following application modes:

* Server – ES6 – Defined (opt-in) structure. Express.js based
* Server – ES6 – Freeform. Raw app.js, no frameworks
* Server – TypeScript - Defined (opt-in) structure. Express.js based
* Server – TypeScript - Freeform. Raw app.ts, no frameworks
* Client - ES6 – Defined (opt-in) structure. React/Redux based
* Client - ES6 – Freeform. Raw index.js, no frameworks
* Client - TypeScript – Defined (opt-in) structure. React/Redux based
* Client - TypeScript – Freeform. Raw index.ts, no frameworks
* Plus an ES or TypeScript Monorepo setup for shared libraries (npm packages).

The Server and Client do not need to be used together, they can utilised mutually exclusively. Basis supports Server only (API / WebSockets), Client only (WebPack Bundle) or both. It’s entirely up to application creators how the stack is used.

Similar to create-react-app and others, Basis also supports a zero-config approach for both the Server and Client, applying sound defaults to allow creators to get up and running quickly with minimum fuss. Opt-in config options can then be layered on to the defaults as and when needed.

Basis is currently being used for personal projects, and has been used extensively in the enterprise across a cross-section of applications.

### Why ?
**TL;DR**: Quality, testability, reduce boilerplate, bury non-feature concerns, great UX, production ready.

Full Why / Background coming soon…

### How ?
**TL;DR**: Clone the repo, delete packages directory, tweak to taste, then:

```sh
$ yarn || npm install
$ yarn build || npm run build
$ yarn start || npn run start
```

Full How / Setups / Config options coming soon…

