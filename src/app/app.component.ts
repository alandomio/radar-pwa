import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'radar-pwa';
  remoteHtml: string = '';
  constructor(private http: HttpClient) { }

 

  ngOnInit() {
    this.fetchRemoteHtml();
  }

  fetchRemoteHtml() {
    // recupera il contenuto HTML dalla pagina remota  http://192.168.120.90:8030/
    this.http.get('http://192.168.120.90:8030/', {responseType: 'text'}).subscribe((response) => {
      console.log('Risposta:', response);
      this.remoteHtml = response.toString();
    }
    );
    
    
  
  }

  requestNotificationStop() {
    if ('Notification' in window) {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            console.log('Autorizzazione alle notifiche concessa.');
            // disattiva il service worker
            navigator.serviceWorker.ready.then((registration) => {
              registration.unregister();
            });
          } else {
            console.warn('Autorizzazione alle notifiche non concessa.');
          }
        })
        .catch((error) => {
          console.error('Errore durante la richiesta di autorizzazione alle notifiche:', error);
        });
    }
  }

  

  requestNotificationPermission() {
    // richiedo permesso per ottenere la posizione geografica
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('La posizione è:', position);
      } 
      );

    }



    if ('Notification' in window) {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            console.log('Autorizzazione alle notifiche concessa.');
            // attiva il service worker
            navigator.serviceWorker.ready;

          } else {
            console.warn('Autorizzazione alle notifiche non concessa.');
          }
        })
        .catch((error) => {
          console.error('Errore durante la richiesta di autorizzazione alle notifiche:', error);
        });
    }
  }
}
