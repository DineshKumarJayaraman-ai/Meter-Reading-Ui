import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'https://dinesh001-appservice-cnbrcafcadcfe5eg.canadacentral-01.azurewebsites.net/api/MeterReading/meter-reading-uploads'; 

  constructor(private http: HttpClient) {}

  uploadCSV(file: File) {
    const formData = new FormData();
    formData.append('formFile', file, file.name);
    return this.http.post(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.title || error.message || 'Unknown error';
    return throwError(() => message);
  }
}
