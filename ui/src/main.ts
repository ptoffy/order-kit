/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { CSP_NONCE } from '@angular/core'

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [{
    provide: CSP_NONCE,
    useValue: 'nonce-12345'
  }],
})
  .catch(err => console.error(err))
