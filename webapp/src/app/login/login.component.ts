import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from './login.service';
import {User} from "../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  scale = 1;
  model = {};
  hide = true;
  user: User = new User();

  @HostListener('window:resize', ['$event'])
  onresize(event): void {
    let size = event.target.outerHeight / 768;
    if (size > 1.2) {
      size = 1.2;
    }
    if (size < 1) {
      size = 1;
    }
    this.scale = size;
  }

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {

  }

  formSubmit(): void {


  }

  getScale() {
    return {
      transform: `scale(${this.scale})`
    };
  }

  login() {
    // this.loginService.login(this.user).subscribe(res => {
    //
    // });
    this.router.navigate(['home'])
  }

}
