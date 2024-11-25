import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css'],
})
export class SolicitudComponent implements OnInit {
  estudiante: any = null; // Datos del estudiante
  empresas: any[] = []; // Lista de empresas
  empresaSeleccionada: any = null; // Empresa seleccionada en el formulario
  solicitud: any = {
    empresaId: null,
  }; // Datos de la solicitud
  mensaje: string = ''; // Mensaje de confirmación
  acceptTerms: boolean = false;

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    // Obtener datos del estudiante al cargar el componente
    this.obtenerDatosEstudiante();

    // Cargar las empresas disponibles
    this.obtenerEmpresas();
  }

  obtenerDatosEstudiante(): void {
    this.solicitudService.obtenerDatosEstudiante().subscribe(
      (data) => {
        this.estudiante = data;
      },
      (error) => {
        console.error('Error al cargar datos del estudiante:', error);
      }
    );
  }

  obtenerEmpresas(): void {
    this.solicitudService.obtenerEmpresas().subscribe(
      (data) => {
        this.empresas = data;
      },
      (error) => {
        console.error('Error al cargar empresas:', error);
      }
    );
  }

  mostrarDatosEmpresa(event: any): void {
    this.empresaSeleccionada = this.empresas.find(
      (empresa) => empresa.id === parseInt(event.target.value, 10)
    );
  }

  enviarSolicitud(): void {
    const solicitudDatos = {
      estudianteId: this.estudiante.codigo,
      empresaId: this.solicitud.empresaId,
    };

    this.solicitudService.enviarSolicitud(solicitudDatos).subscribe(
      (response) => {
        this.mensaje = 'Solicitud enviada exitosamente.';
      },
      (error) => {
        console.error('Error al enviar la solicitud:', error);
        this.mensaje = 'Error al enviar la solicitud.';
      }
    );
  }

  rechazarSolicitud(): void {
    this.solicitudService.rechazarSolicitud(this.estudiante.codigo).subscribe(
      (response) => {
        this.estudiante.estado = 'Rechazado';
        this.mensaje = 'Solicitud eliminada correctamente.';
      },
      (error) => {
        console.error('Error al eliminar la solicitud:', error);
        this.mensaje = 'Error al eliminar la solicitud.';
      }
    );
  }

  abrirFormularioEmpresa(): void {
    alert('Abrir formulario para agregar una nueva empresa.');
  }

  onDeleteRequirements() {
    console.log('Deleting requirements...');
  }

  onSendRequirements() {
    if (this.acceptTerms) {
      console.log('Sending requirements...');
    } else {
      alert('Please accept the terms and conditions before proceeding.');
    }
  }
}
