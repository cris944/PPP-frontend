import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component'; 
import { HomeComponent } from './components/home/home.component';
import { PersonaComponent } from './components/Mantener-CRUD/persona/persona.component';
import { EmpresaComponent } from './components/Mantener-CRUD/empresa/empresa.component';
import { EstudianteComponent } from './components/Mantener-CRUD/estudiante/estudiante.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { MisArchivosComponent } from './components/mis-archivos/mis-archivos.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: HomeComponent }, // Ruta principal
      { path: 'personas', component: PersonaComponent }, // Ruta para gestión de personas
      { path: 'empresas', component: EmpresaComponent }, // Ruta para gestión de empresas
      { path: 'estudiantes', component: EstudianteComponent }, // Ruta para gestión de estudiantes
      { path: 'solicitudes', component: SolicitudComponent },
      { path: 'mis-archivos', component: MisArchivosComponent }
    ],
  },
  {
    path: '**', // Ruta para páginas no encontradas
    redirectTo: '',
  },
];
