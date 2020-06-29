import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(private service: PostService) {}

  posts: any;
  ngOnInit(): void {
    this.service.getPosts().subscribe(
      (response) => {
        this.posts = response;
      }
      // (error: AppError) => {
      //   console.log(error);
      //   if (error instanceof NotFoundError) {
      //     alert('Error');
      //   } else if (error instanceof AppError) {
      //     alert('Some error');
      //   }
      // }
    );
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    this.posts.unshift(post);
    this.service.createPost(JSON.stringify(post)).subscribe(
      (response: any) => {
        post['id'] = response.id;
      },
      (error: Response) => {
        this.posts.shift(post);

        if (error.status === 400) {
          // this.form.setErrors(error)
        } else throw error;
      }
    );
  }

  updatePost(post: HTMLInputElement) {
    const update = {
      isRead: true,
    };
    this.service
      .updatePost(post.id, update)
      .subscribe((response) => console.log(response));

    // this.http.put(this.url, JSON.stringify(post));
  }
}
