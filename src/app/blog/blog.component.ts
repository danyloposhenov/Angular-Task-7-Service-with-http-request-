import { Component, OnInit } from '@angular/core';
import { IBlogResponse } from '../shared/interfaces/blog.interface';
import { BlogService } from '../shared/services/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  public blogs: Array<IBlogResponse> = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getAll().subscribe(data => {
      this.blogs = data;
    })
  }

}
