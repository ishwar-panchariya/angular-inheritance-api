import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../core/base/base.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit {
  
  users: Array<any> = []; // Store API data

  constructor(http: HttpClient) {
    super(http); // Call base constructor
  }

  ngOnInit() {
    this.fetchData('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => (this.users = data as Array<any>),
        error: (err) => console.error('Error:', err) // Log errors
      });
  }

}
