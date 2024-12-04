import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent implements OnInit, OnDestroy {
  intervalRef: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    this.intervalRef = setInterval(() => {
      this.router.navigate(['/']);
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalRef);
  }
}
