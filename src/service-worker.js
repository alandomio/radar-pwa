self.addEventListener('install', event => {
    console.log('Service Worker installato');
    
  });
  
  self.addEventListener('activate', event => {
    console.log('Service Worker attivato');
    sendPeriodicNotification();
  });
  
  self.addEventListener('fetch', event => {
    console.log('Richiesta di fetch:', event.request.url);
  });
  
  function sendPeriodicNotification() {

    // ottieni le coordinate geografiche
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      // 1. recupera il link pubblico dell'applicazione
      const url = self.registration.scope;
      // 2. crea la notifica
      const title = 'Radar PWA';
      const options = {
        body: 'LA tua posizione è: ' + position.coords.latitude + ' ' + position.coords.longitude,
        icon: 'assets/icons/icon-72x72.png',
        badge: 'assets/icons/icon-72x72.png',
        data: {
          url: url
        }
      };
       // 3. aggiungi il link pubblico all'oggetto data
      // 4. mostra la notifica
      self.registration.showNotification(title, options);
      // 5. aggiungi il listener per l'evento click sulla notifica

     
    }
    );
   
  }
  
  self.addEventListener('push', event => {
    console.log('Evento push ricevuto');
    sendPeriodicNotification();
  });

  self.addEventListener('notificationclick', event => {
    // 6. apri l'applicazione usando
    window.open(event.notification.data.url, '_blank');
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  } );
  
  setInterval(() => {
    sendPeriodicNotification();
  }, 60 * 1000); // Ogni minuto
  