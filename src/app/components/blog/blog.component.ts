import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BloglistService } from "../../services/bloglist.service";


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private router: Router, public bloglistService: BloglistService) { }

  ngOnInit(): void {
    this.bloglistService.bloglist(10);
  }

  forbloginnerpage(id: any) {
    if (id != null) {
      if (localStorage.getItem('blogId') != null) {
        localStorage.setItem('blogId', id);
      } else {
        localStorage.setItem('blogId', id);
      }
      this.router.navigateByUrl('/blogpage/bloginnerpage');
    } else {
      alert('Blog Id Required');
    }
  }
}
