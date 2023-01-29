import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { newComment } from 'src/app/models/new-comment';
import { PostService } from '../../service/posts.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.page.html',
  styleUrls: ['./create-comment.page.scss'],
})
export class CreateCommentPage implements OnInit {

  comment: newComment;
  commentError: boolean;
  userId: string;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private post: PostService, private toast: ToastService) {

    this.auth.getUser$().subscribe(user => {
      this.userId = user._id
    })

    this.comment = {
      description: '',
      userId: this.userId,
      postId: this.route.snapshot.paramMap.get('id')
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }

    this.comment.description = form.value.description
    this.commentError = false;

    this.post.postComment$(this.comment).subscribe({
      next: () => {
        this.router.navigate(['post', this.comment.postId])
        this.toast.show('Comment posted successfully')
      },
      error: (err) => {
        this.commentError = true;
        console.warn(`Failed to post comment: ${err.message}`);
      },
    });
  }

  ngOnInit() {
  }

}
