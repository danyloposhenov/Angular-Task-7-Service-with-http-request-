import { Component, OnInit } from '@angular/core';
import { IBlogResponse, IBlog } from '../shared/interfaces/blog.interface';
import { BlogService } from '../shared/services/blog/blog.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public title!: string;
  public text!: string;
  public author!: string;
  public blogs!: IBlog[];
  public editID!: number;

  public btnAdd = true;
  public btnSave = false;

  constructor ( private blogService: BlogService ) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getAll().subscribe(data => {
      this.blogs = data;
    })
  }

  addBlog(): void {
    if (this.title && this.text && this.author) {
      const newBlog = {
        title: this.title,
        text: this.text,
        author: this.author
      };
      this.blogService.create(newBlog).subscribe(() => {
        this.getBlogs();
        this.resetForm();
      })
    }
  }

  editBlog(blog: IBlog): void {
    this.editID = blog.id
    this.title = blog.title;
    this.text = blog.text;
    this.author = blog.author;
    this.btnAdd = false;
    this.btnSave = true;
  }

  saveBlog(): void {
    const updateBlog = {
      title: this.title,
      text: this.text,
      author: this.author
    }
    this.blogService.update(updateBlog, this.editID).subscribe(() => {
      this.getBlogs();
      this.resetForm();
      this.btnAdd = true;
      this.btnSave = false;
    })
  }

  deleteBlog(blog: IBlog): void {
    if (confirm('Are you sure?')) {
      this.blogService.delete(blog.id).subscribe(() => {
        this.getBlogs();
      })
    }
  }

  resetForm(): void {
    this.title = '';
    this.text = '';
    this.author = '';
  }

  // public login!: string;
  // public password!: string;
  // public email!: string;
  // public persons: any = [];
  // public editStatus = false;
  // public modal = false;
  // public editIndex!: number;
  // constructor() { }
  // addUser(): void {
  //   let person = {
  //     login: this.login,
  //     password: this.password,
  //     email: this.email
  //   }
  //   this.persons.push(person);
  //   this.login = '';
  //   this.password = '';
  //   this.email = '';
  // }

  // delete(index: number): void {
  //   this.persons.splice(index, 1);
  // }
  // edit(index: number): void {
  //   this.login = this.persons[index].login;
  //   this.password = this.persons[index].password;
  //   this.email = this.persons[index].email;
  //   this.editStatus = true;
  //   this.modal = true;
  //   this.editIndex = index;
  // }
  // editUser(): void {
  //   this.persons[this.editIndex].login = this.login;
  //   this.persons[this.editIndex].password = this.password;
  //   this.persons[this.editIndex].email = this.email;
  //   this.editStatus = false;
  //   this.modal = false;
  //   this.login = '';
  //   this.password = '';
  //   this.email = '';
  // }
}
