import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonInputOtp, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';
import { Constants } from '../../../assets/Constants'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInputOtp, IonToast],
})
export class LoginPage implements OnInit {
  public pin: number | undefined
  private constants = Constants
  public alertMessage: string = 'Pas le bon code ca !'
  public openAlert: boolean = false
  public toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel'
    }
  ]

  constructor(private router: Router) { }

  public ngOnInit() {
  }

  public login() {
    if (this.pin !== this.constants.VALID_PIN) {
      this.setOpen(true)
      return
    } else {
      localStorage.setItem(this.constants.AUTH_KEY, JSON.stringify(true))
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true })
      this.setOpen(false)
    }
  }

  public onComplete() {
    this.login()
  }

  public setOpen(b: boolean) {
    this.openAlert = b
  }
}
