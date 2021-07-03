import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogGridComponent } from './blog-grid/blog-grid.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';



@NgModule({
  declarations: [
    BlogListComponent,
    BlogGridComponent,
    BlogDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BlogModule { }
