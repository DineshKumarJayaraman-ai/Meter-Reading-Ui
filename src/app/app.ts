import { Component, signal } from '@angular/core';
import { UploadComponent } from './pages/upload-component/upload-component';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UploadComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {
  protected readonly title = signal('meter-reading-app');
}
