import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker registrato con successo:', registration);
    })
    .catch(error => {
      console.error('Errore durante la registrazione del Service Worker:', error);
    });
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
