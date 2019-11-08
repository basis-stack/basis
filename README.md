# Basis
[![Build Status](https://travis-ci.org/basis-stack/basis.svg?branch=master)](https://travis-ci.org/basis-stack/basis)
[![Build status](https://ci.appveyor.com/api/projects/status/y9frdmgti2eujjyd?svg=true)](https://ci.appveyor.com/project/justinware/basis)
[![Coverage Status](https://coveralls.io/repos/github/basis-stack/basis/badge.svg?branch=master)](https://coveralls.io/github/basis-stack/basis?branch=master)
[![Code Climate](https://codeclimate.com/github/basis-stack/basis/badges/gpa.svg)](https://codeclimate.com/github/basis-stack/basis)

## What ?
**TL;DR**: Node.js + ES6/TS + React project setup & framework pieces that forms the ***basis*** of next-gen, dependable, testable, scalable, amazing JavaScript applications. Work in Progress.

Basis is a full-stack ES6 or TypeScript application project setup + framework elements for creating highly testable, robust, easy to scale, nice to use, feature focused, deploy-ready JavaScript applications. It combines both server & client code structure and framework elements (client / server mutually exclusive), and also build chain concerns in order to minimise boilerplate, bury repetitive setup and noise, bury build chain, bury productionisation concerns, bury wire-up, bury runtime and allow the application creator solely to focus on the good stuff, the timely and easy horizontal feature scale out.

Basis is **NOT** just another application quick starter / template / etc a la create-react-app or others, it can do that job if that’s the sole desire…but it’s goals, approach and reasoning is much more holistic that simply booting up a quick app.

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

Basis is currently being used for personal projects, and has been used in the enterprise across a wide variety of applications in both ES6 and TypeScript flavours.

## Why ?
**TL;DR**: Quality, testability, reduce boilerplate, bury non-feature concerns, great UX, scalable, production ready.

### Goals

The 10 core pillars of Basis:

* 100% (unit) testable - Reliable, dependable code...always
* ES6 / ES7 / ESNext or TypeScript as 1st-class concern
* (True) Production Ready - Including logging, multi-environment support, security, robustness, etc
* Push-button deployable - Deploy to PROD from initial clone
* Minimum Boilerplate - Minimum boilerplate / repetitive setup code / config from server, to build chain, to client (from project to project)
* Ease of Use (UX) - Easy to get up and running, easy to consume, easy to scale features, easy to deploy
* Versatile / Scalable - Can be used as true *basis* of everything, from static websites to complex enterprise applications
* Modular - Both in architecture (stack / npm packages), and in features from server to client
* Great UX - For everything...from Rest APIs, to errors, to logs, to build-chain, to deploys, to UI
* Enjoyable - Must be fun to use and build apps with

With secondary goals being:

* Dogfooding - Everything that *can* be built with Basis *is* built with Basis.
* Extension - Easy to extend architecture for complex cases, easy to add core modules
* Performant - Everything from server, to build chain, to client is snappy and responsive

Full Why / Background coming soon…

## How ?
**TL;DR**: Clone the repo, then:

yarn:
```sh
$ yarn
$ yarn link:packages
$ yarn build
$ yarn start
```

npm:
```sh
$ npm install
$ npm run link:packages
$ npm run build
$ npn run start
```

This will spin up both the Server & UI from this Monorepo setup, linking the nested npm packages (Basis framework packages).

***Note**: This is not normally how an application creator would use this stack, it is highlighted here for demonstration purposes only.*

This Monorepo setup is used as the core development platform so that framework pieces can be worked on and tested together in the broader context of the template. I.e. This repo is a dev only reference, not a ready to go template. 

Going forward separate application templates for each of the supported application modes will be created (sans framework packages) and given their own repos inside the Basis Stack org, and creators will then simply clone & tweak the appropriate template. This is very much a work in progress.

There is also a CLI / generator in the pipeline a la express generator that will do this template-specific cloning for the application creator via targeted questions and then apply a few smarts / tweaks to cloned template to be app-specific and spin-up ready.

Full How / Setups / Config options, etc coming soon…

## Who ?

Basis is and has been the passion project of Justin Ware, who serves as founder and project lead, and who has endeavoured to bring about a structured, repeatable and (Software Engineering) best practice approach to building large scale JavaScript applications ever since diverging from the fullstack .NET world a few years ago.

There is a ginormous amount of pipeline work still to do to get it where it needs to be, so **collaborators & PRs are absolutely welcome !!**