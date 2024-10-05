import { Component, OnInit } from '@angular/core';
import { SALES_DATA } from '../mock-data';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/authentication.service';

interface SalestDataItem {
  label: string;
  visits: number;
}

@Component({
  selector: 'app-analytic-report',
  templateUrl: './analytic-report.component.html',
  styleUrl: './analytic-report.component.css'
})
export class AnalyticReportComponent implements OnInit {
  barChartData = SALES_DATA;
  userAuthenticated = true;
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {

    Chart.register(...registerables); 

    const canvas = <HTMLCanvasElement>document.getElementById('barChart');
    const ctx = canvas.getContext('2d');

    if (ctx) { // Check if ctx is not null
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.barChartData.map(item => item.date),
          datasets: [{
            label: 'Sale',
            data: this.barChartData.map(item => item.totalSales),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
        },
        options: {
          animation: {
            duration: 1000, 
            easing: 'easeInOutQuart' 
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error("Canvas context not found");
    }
  }

  dash(){
    this.router.navigate(['/admin-dash']);
  }

  logout(){
    this.userAuthenticated = false;
    this.authService.logOut();
  }
}