import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../middleware/auth.service';
import { LayoutService } from '../../../layout/service/app.layout.service';

import { MessageService, Message } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message'; 
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent{

  valCheck: string[] = ['remember'];
  username: string = 'Holger'; 
  password: string = '123456'; 
  rememberMe: boolean = false;
  loading: boolean = false;

  msgs: Message[] = [];

  constructor(public layoutService: LayoutService, 
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(loginForm: any): void{
    
    this.msgs = [];
    if (loginForm.valid){ 
      this.loading = true;
      this.http.post(
        'http://192.168.10.58:1234/api/login', 
        { usuario:this.username, clave:this.password },
        { observe: 'response', withCredentials: true }
      ).subscribe((response: any) => { 
        this.loading = false;
        if(response.auth){
          // console.log(response.jwt_token)
          this.authService.login(response.jwt_token);
          // this.router.navigate(['/']);
        }
        this.msgs.push({ severity: response.status, summary: '', detail: response.message });


        try {
          this.loading = true;
          this.http.get('http://192.168.10.58:1234/api/menu', { observe: 'response', withCredentials: true }) 
          .subscribe((response: any) => { 
              this.loading = false;
              console.log(response);
          }, 
          error=>{
            this.loading = false;
            console.error(error.error.message);
          });
        }catch(error){

        }



      }, 
      error => {
        this.msgs = [];
        this.loading = false;
        this.msgs.push({ severity: error.error.status, summary: '', detail: error.error.message });
        console.error(error.error.message);
      });
    }

  }
}