import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BloglistService } from "../../services/bloglist.service";


@Component({
  selector: 'app-articles-blog',
  templateUrl: './articles-blog.component.html',
  styleUrls: ['./articles-blog.component.scss']
})
export class ArticlesBlogComponent implements OnInit {

  constructor(private router: Router, public bloglistService: BloglistService) { }

   ngOnInit(): void {
    this.bloglistService.bloglist(4);
  }

}
