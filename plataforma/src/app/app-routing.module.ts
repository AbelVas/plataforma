import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/shared/components/not-found/not-cound.component';
import { LoginComponent } from './public/login/containers/login-1/login.component';

const routes: Routes = [
  { path:'',loadChildren:()=>import('./public/public.module').then(m=>m.PublicModule)},
  { path:'admin', loadChildren:()=>import('./admin/admin.module').then(a=>a.AdminModule)},
  { path:'teacher', loadChildren:()=>import('./profesor/profesor.module').then(b=>b.ProfesorModule)},
  { path:'student', loadChildren:()=>import('./student/student.module').then(c=>c.StudentModule)},
  { path:'tutor', loadChildren:()=>import('./tutor/tutor.module').then(d=>d.TutorModule)},
  { path:'**', component:NotFoundComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
