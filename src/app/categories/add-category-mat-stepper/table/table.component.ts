import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
// import { MatTableModule } from '@angular/material/table';
import { AddCategoryService } from '../add-category.service';
import { type formObject } from '../add-cat.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  // standalone: true,
  // imports: [MatTableModule],
})
export class TableComponent implements OnInit {
  @Input({ required: true }) data!: formObject;
  @Output() editRow = new EventEmitter<any>();

  displayedColumns: string[] = ['name', 'weight', 'edit'];
  dataSource: any;
  categoryName: any;

  // editRow = output();
  _form = inject(AddCategoryService);

  ngOnInit(): void {
    this.loadCatTable();
  }

  loadCatTable() {
    console.log('Updated table data:', this.dataSource);

    this._form.categoryForm.subscribe({
      next: (res) => {
        if (res) {
          const parsedData = JSON.parse(res);
          this.categoryName = parsedData.form1.categoryNameEn;
          // Force refresh of the data source
          this.dataSource = [...parsedData.form2]; // Create a new reference for the array
        }
      },
    });
  }
  onEdit(row: any) {
    this.editRow.emit(row);
  }
}
