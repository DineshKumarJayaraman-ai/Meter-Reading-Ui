import { Component } from '@angular/core';
import { UploadService } from '../../services/upload';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './upload-component.html',
  styleUrls: ['./upload-component.css'] 
})
export class UploadComponent {
selectedFile: File | null = null;
  message = '';

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  upload() {
    if (!this.selectedFile) {
      this.message = 'Please select a CSV file.';
      return;
    }

    this.uploadService.uploadCSV(this.selectedFile).subscribe({
      next: (res: any) => {
        this.message = `Uploaded Success: ${res.successCount}, Failed: ${res.failureCount}`;
      },
      error: (err: any) => {
        this.message = `Upload failed: ${err}`;
      }
    });
  }
}
