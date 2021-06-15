import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MappingComponent } from './pages/mapping/mapping.component';
import { UploadComponent } from './pages/upload/upload.component';

const routes: Routes = [
  { path: '', component: UploadComponent },
  { path: 'mapping', component: MappingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
