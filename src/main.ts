/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Repository: https://github.com/vercel/vercel
*    Source File: examples/angular/src/main.ts
*    
*    Copyrights:
*      copyright (c) 2019
*      copyright (c) 2018, alexander lozada
*      copyright (c) 2016 bud parr
*      copyright 2015 drifty co
*      copyright (c) 2015 gatsbyjs
*      copyright 2012 moneydesktop inc
*      copyright (c) 2020 redwood
*      copyright (c) 2013 tommy chen
*      copyright 2017 vercel, inc
*      copyright (c) 2022 zach leatherman @zachleat
*    
*    Licenses:
*      Apache License 2.0
*      SPDXId: Apache-2.0
*    
*    Auto-attribution by Threatrix, Inc.
*    
*    ------ END LICENSE ATTRIBUTION ------
*/
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
