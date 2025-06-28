import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Empleado {
  id: number;
  numEmpleado: string;
  nombre: string;
  correo: string;
  telefono: string;
  fechaNac: string;
  sexo: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'AppListado';
  
  
  numEmpleado: string = '';
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  fechaNac: string = '';
  sexo: string = '';

  
  empleados: Empleado[] = [];

  
  agregarEmpleado() {
    if (this.validarFormulario()) {
      const nuevoEmpleado: Empleado = {
        id: this.empleados.length + 1,
        numEmpleado: this.numEmpleado,
        nombre: this.nombre,
        correo: this.correo,
        telefono: this.telefono,
        fechaNac: this.fechaNac,
        sexo: this.sexo
      };

      this.empleados.push(nuevoEmpleado);
      this.limpiarFormulario();
      alert('Empleado agregado exitosamente');
    }
  }

  
  eliminarEmpleado(id: number) {
    if (confirm('¿Está seguro de eliminar este empleado?')) {
      this.empleados = this.empleados.filter(emp => emp.id !== id);
    }
  }

  
  validarFormulario(): boolean {
    if (!this.numEmpleado || !this.nombre || !this.correo || !this.telefono || !this.fechaNac || !this.sexo) {
      alert('Por favor complete todos los campos');
      return false;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.correo)) {
      alert('Por favor ingrese un correo válido');
      return false;
    }

    
    if (this.empleados.some(emp => emp.numEmpleado === this.numEmpleado)) {
      alert('El número de empleado ya existe');
      return false;
    }

    return true;
  }


  limpiarFormulario() {
    this.numEmpleado = '';
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
    this.fechaNac = '';
    this.sexo = '';
  }

 
  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES');
  }
}
