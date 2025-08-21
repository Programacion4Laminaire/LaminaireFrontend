import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0258AF',
      background: '#ffffff',
      color: '#1f2937',
      width: 430,
      draggable: true
    });
  }

  warn(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0258AF',
      background: '#ffffff',
      color: '#1f2937',
      width: 430,
      draggable: true
    });
  }

  error(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0258AF',
      background: '#ffffff',
      color: '#1f2937',
      width: 430,
      draggable: true
    });
  }
}
