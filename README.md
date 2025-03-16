# Angular Inheritance-based API Handling 🚀

## Overview 📌

This project demonstrates how to use inheritance in Angular to handle API calls efficiently, with built-in loading indicators and error handling.

## Features 🎯 

- Reusable Base Component for API requests.
- Loading Indicators to improve user experience.
- Error Handling to manage failed API calls.
- Clean & Maintainable Code using TypeScript inheritance.

## Installation & Setup 🛠️

Clone the Repository
```
git clone https://github.com/ishwar-panchariya/angular-inheritance-api.git
cd angular-inheritance-api
```

### Install Dependencies
```
npm install
```
We need `HttpClientModule` to make API requests in Angular. It’s already included in Angular, but we need to import it.'

## Implementation Details 📜

### 1. Create a Reusable BaseComponent
**Why Use a Base Component?**

In many Angular projects, different components need to make API requests. Instead of writing the same logic in multiple components, we move the common logic to a base component and reuse it across different components.

Create a new directory inside `src/app/` called `core/` and inside it, create a file named `base.component.ts`.

```
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export abstract class BaseComponent {
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(protected http: HttpClient) {}

  fetchData(url: string) {
    this.isLoading = true;
    return this.http.get(url).pipe(
      tap(() => (this.errorMessage = '')),
      catchError((error) => {
        this.errorMessage = 'Failed to load data';
        return throwError(() => new Error(error));
      }),
      finalize(() => (this.isLoading = false))
    );
  }
}
```

### 2. Extend BaseComponent in UsersComponent
```
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseComponent } from '../core/base.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BaseComponent implements OnInit {
  users: any[] = [];

  constructor(http: HttpClient) {
    super(http);
  }

  ngOnInit() {
    this.fetchData('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => (this.users = data as any[]),
        error: (err) => console.error('Error:', err)
      });
  }
}
```
### 3. Update users.component.html
```
<h2>User List</h2>
<p *ngIf="isLoading">Loading users... 🔄</p>
<p *ngIf="errorMessage" style="color: red;">{{ errorMessage }}</p>
<table *ngIf="!isLoading && !errorMessage && users.length > 0" border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let user of users">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
      </tr>
    </tbody>
  </table>
```
### Run project
```
ng serve
```

## Expected Behavior ✅

Initially, it shows "Loading users...".
If the API is successful, it displays the user list.
If the API fails, it shows an error message.

## Next Steps 🎯 

Want to improve this further? Consider:
- Adding retry logic for failed API calls.
- Implementing custom loading spinners.
- Extending BaseComponent to handle POST, PUT, DELETE requests.

🚀 Happy Coding!
