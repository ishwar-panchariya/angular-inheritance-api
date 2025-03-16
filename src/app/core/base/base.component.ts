import { HttpClient } from "@angular/common/http";
import { catchError, finalize, tap, throwError } from "rxjs";

export abstract class BaseComponent {

  isLoading: boolean = false;  // Loading state
  errorMessage: string = '';   // Error state

  constructor(protected http: HttpClient) {}

  fetchData(url: string) {
    this.isLoading = true;  // Start loading

    return this.http.get(url).pipe(
      tap(() => {
        this.errorMessage = ''; // Clear previous errors
      }),
      catchError((error) => {
        this.errorMessage = 'Failed to load data. Please try again.'; // Set error message
        return throwError(() => new Error(error));
      }),
      finalize(() => {
        this.isLoading = false; // Stop loading when request completes
      })
    );
  }
}
