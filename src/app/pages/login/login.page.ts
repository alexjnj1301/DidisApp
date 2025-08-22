import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonInputOtp, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Constants } from '../../../assets/Constants'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInputOtp],
})
export class LoginPage implements OnInit {
  public pin: number | undefined
  private constants = Constants
  public alertMessage: string = ''

  constructor(private router: Router) { }

  public ngOnInit() {
  }

  public login() {
    if (this.pin !== this.constants.VALID_PIN) {
      this.alertMessage = 'Pas le bon code ca !'
      return
    } else {
      localStorage.setItem(this.constants.AUTH_KEY, JSON.stringify(true))
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true })
    }
  }

  public onComplete() {
    this.login()
  }
}
