import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  currentUser: User = new User("", "", "", "", "", "", "");

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private auth: AuthService, ) { }

  ngOnInit() {
    this.auth.observableUser.subscribe(user => {
      if (user && user != null) {
        this.currentUser = user;
      }
    })
  }

  signOut() {
    this.auth.signOut();
    this.menuCtrl.close();
    this.router.navigate(['login']);
  }
}
