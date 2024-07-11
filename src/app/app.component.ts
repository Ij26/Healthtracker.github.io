import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserChartComponent } from './components/user-chart/user-chart.component';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    UserFormComponent,
    UserListComponent,
    UserChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  users: User[] = [];
  selectedUser: User | null = null;
  chartView: boolean = false;

  onUserAdded(user: User) {
    this.users.push(user);
  }

  onUserSelected(user: User) {
    this.selectedUser = user;
  }

  toggleChartView() {
    this.chartView = !this.chartView;
  }
}
