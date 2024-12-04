import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { jwtDecode } from 'jwt-decode';

// import { Chart } from 'chart.js';
import { ChartModule } from 'primeng/chart';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';

import type { Data, MyJwtPayload } from './allorders.model';

@Component({
  selector: 'app-allorders',
  standalone: true,
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
  imports: [
    ChartModule,
    TableModule,
    TagModule,
    ToastModule,
    RatingModule,
    ButtonModule,
    CommonModule,
  ],
  providers: [],
})
export class AllordersComponent implements OnInit {
  allOrders: Data[] = [];
  totalOrders: number = 0;
  currentPage: number = 1;
  pageSize: number = 30;
  searchTerm: string = '';
  userId: string = '';

  expandedRows: { [key: string]: boolean } = {};

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.decodeUserId();
    // this.loadUserOrders();
    this.loadAllOrders();
  }

  expandAll() {
    this.expandedRows = {};
    this.allOrders.forEach((order) => (this.expandedRows[order._id] = true));
  }

  collapseAll() {
    this.expandedRows = {};
  }

  onRowExpand(event: TableRowExpandEvent) {
    this.expandedRows[event.data._id] = true;
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    delete this.expandedRows[event.data._id];
  }

  decodeUserId(): void {
    const token = this._authService.userToken.value;
    if (token) {
      const decoded = jwtDecode<MyJwtPayload>(token);
      this.userId = decoded.id;
    } else {
      console.error('No valid token found');
    }
  }

  loadUserOrders(): void {
    this._authService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        this.allOrders = res;
        console.log('res getUserOrders: ', res);
      },
      error: (err) => {
        console.error('Error fetching user orders: ', err);
      },
    });
  }
  loadAllOrders(): void {
    this._authService.getAllOrders().subscribe({
      next: (res) => {
        this.allOrders = res.data;
        console.log('res getAllOrders: ', res);
      },
      error: (err) => {
        console.error('Error fetching all orders: ', err);
      },
    });
  }
}
