import { Component } from '@angular/core'
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import {
  arrowForward,
  document,
  documents,
  ellipse,
  fileTrayFull,
  closeOutline,
  cloudDownloadOutline,
  createOutline,
} from 'ionicons/icons'
import { Tab1Page } from './tab1/tab1.page'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  standalone: true
})
export class AppComponent {
  public component = Tab1Page
  constructor() {
    addIcons(
      {
        documents, document, ellipse,
        'file-tray-full': fileTrayFull,
        'arrow-forward': arrowForward,
        'close-outline': closeOutline,
        'create-outline': createOutline,
        'cloud-download-outline': cloudDownloadOutline
      })
  }
}
