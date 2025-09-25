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
loading = false;
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
     if (!this.selectedFile.name.toLowerCase().endsWith('.csv')) {
    this.message = 'Only CSV files are allowed.';
    return;
  }

  if (this.selectedFile.size > 5 * 1024 * 1024) {
    this.message = 'File size exceeds 5MB limit.';
    return;  
  }

  this.loading = true;         
  this.message = 'Processing...';

  this.uploadService.uploadCSV(this.selectedFile).subscribe({
    next: (res: any) => {
      this.message = `Uploaded Success: ${res.successCount}, Failed: ${res.failureCount}`;
      this.loading = false;     
    },
    error: (err: any) => {
      this.message = `Upload failed: ${err}`;
      this.loading = false;    
    }
  });

  }
}
