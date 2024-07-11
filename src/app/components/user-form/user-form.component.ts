import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less'],
})
export class UserFormComponent {
  name: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  @Output() userAdded = new EventEmitter<User>();

  addUser() {
    if (this.name && this.workoutType && this.workoutMinutes) {
      const user: User = {
        name: this.name,
        workouts: [this.workoutType],
        workoutMinutes: this.workoutMinutes,
      };
      this.userAdded.emit(user);
      this.name = '';
      this.workoutType = '';
      this.workoutMinutes = 0;
    }
  }
}
