import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
})
export class UserListComponent implements OnInit {
  @Input() users: User[] = [];
  @Output() userSelected = new EventEmitter<User>();

  searchTerm: string = '';
  filterWorkoutType: string = '';
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  page: number = 1;

  get filteredUsers() {
    return this.users
      .filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .filter((user) =>
        this.filterWorkoutType
          ? user.workouts.includes(this.filterWorkoutType)
          : true
      );
  }

  ngOnInit() {
    // Initial data
    this.users.push(
      {
        name: 'John Doe',
        workouts: ['Running', 'Cycling'],
        workoutMinutes: 75,
      },
      {
        name: 'Jane Smith',
        workouts: ['Swimming', 'Running'],
        workoutMinutes: 80,
      },
      {
        name: 'Mike Johnson',
        workouts: ['Yoga', 'Cycling'],
        workoutMinutes: 90,
      }
    );
  }

  selectUser(user: User) {
    this.userSelected.emit(user);
  }
}
