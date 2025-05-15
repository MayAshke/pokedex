import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() closeFilter = new EventEmitter<void>();
  @Output() filterApplied = new EventEmitter<any>();

  filterForm: FormGroup;
  dropdownOpen: boolean = false;
  selectedType: string | null = null;
  types = ['grass', 'fire', 'water', 'bug', 'normal', 'poison', 'electric', 'ground', 'fairy'];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      type: [''],
      totalStat: [''],
      height: ['']
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  
  selectType(type: string) {
    this.selectedType = type;
    this.dropdownOpen = false;
    this.filterForm.get('type')?.setValue(type);
  }

  onCancel() {
    this.closeFilter.emit(); 
  }

  applyFilters() {
    if (this.filterForm.valid) {
      this.filterApplied.emit(this.filterForm.value); 
    }
  }
}