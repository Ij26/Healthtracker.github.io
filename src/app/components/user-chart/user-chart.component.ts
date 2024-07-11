import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.less'],
})
export class UserChartComponent implements OnChanges {
  @Input() users: User[] = [];

  chartOptions: any = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: [],
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { show: true },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users']) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    if (this.users.length > 0) {
      this.chartOptions.legend.data = this.users.map((user) => user.name);
      this.chartOptions.xAxis.data = Array.from(
        new Set(this.users.flatMap((user) => user.workouts))
      );

      this.chartOptions.series = this.users.map((user) => ({
        name: user.name,
        type: 'bar',
        data: this.chartOptions.xAxis.data.map((workout: string) => {
          const index = user.workouts.indexOf(workout);
          return index !== -1 ? user.workoutMinutes : 0;
        }),
      }));
    }
  }
}
