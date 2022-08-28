![CS1 Logo](https://cdn.glitch.com/ea426344-f1a7-4a2b-8557-b641408c03a1%2FCS1_logo_64.png?v=1589664754866)
# CS1 Engine Community Edition
---

<a href="https://cs1ce.glitch.me/staging/index.html" rel="noreferrer noopener">Staging</a>

<a href="https://cs1ce.glitch.me/index.html" rel="noreferrer noopener">Prod</a>

### Desired Features

- WebXR
- PWA
- Reactive State Management
- Realtime Multiuser
- Auth

### Building the CS1 Engine Locally

From the terminal execute: `npm run engine`

### Building a CS1 App Locally

From the terminal execute: `npm run app`

### Building the CS1 Engine On Glitch

From the terminal execute: `pnpm run engine-glitch`

### Building a CS1 App On Glitch

From the terminal execute: `pnpm run app-glitch`
___

## Run Your App Locally on Chrome

**Enable this flag:**

chrome://flags/#allow-insecure-localhost

**Then:**

From the terminal execute: `npm run start`

**Then go to:**
https://localhost:8443

___


## Publishing to NPM

#### Use the following pattern to publish any npm package from Glitch


If you wish to create your own modified version of the CS1 Game Server:
- Create an <a href="https://www.npmjs.com/" rel="noopener noreferrer ">**npm account**</a>
- Create an <a href="https://docs.npmjs.com/creating-and-viewing-authentication-tokens" rel="noopener noreferrer ">**npm token**</a>
- Record your **npm token** in **.env**.
- Create a **.npmrc** file in the **src/server** directory with the following line:
```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```
- Configure the **package.json** in the **src/server** directory according to your details
- Make sure to set a unique version before publishing package to npm.
- Open a **Terminal** and run ```cd src/server```
- In the **Terminal** run ```npm publish```
