import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BloglistService } from "../../services/bloglist.service";

@Component({
  selector: 'app-single-blog-page',
  templateUrl: './single-blog-page.component.html',
  styleUrls: ['./single-blog-page.component.scss']
})
export class SingleBlogPageComponent implements OnInit {
  blogdetails: any = [];

  constructor(private router: Router, public bloglistService: BloglistService) { }

  ngOnInit(): void {
    this.bloglistService.blogdetails(localStorage.getItem('blogId')).subscribe((data: any) => {
      this.blogdetails = data;
    });
  }

}
