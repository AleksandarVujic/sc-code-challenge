import { Component, OnInit } from '@angular/core';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ProductsService } from '../../services/products-service/products.service';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  constructor(private productService: ProductsService) {}
  priceChartData: any;
  pieChartData: any;

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      console.log('Fetched Products:', products);

      this._preparePriceChartData(products);
      this._preparePieChartData(products);
    });
  }

  chartOptions = {
    title: {
      text: 'Price of medicine',
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: 'column', //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        dataPoints: [
          { x: 10, y: 71 },
          { x: 20, y: 55 },
          { x: 30, y: 50 },
          { x: 40, y: 65 },
          { x: 50, y: 71 },
          { x: 60, y: 92, indexLabel: 'Highest\u2191' },
          { x: 70, y: 68 },
          { x: 80, y: 38, indexLabel: 'Lowest\u2193' },
          { x: 90, y: 54 },
          { x: 100, y: 60 },
        ],
      },
    ],
  };

  private _preparePriceChartData(products: IProduct[]): void {
    const dataPoints = products.map((product) => ({
      label: product.name,
      y: product.price,
    }));

    this.priceChartData = {
      title: {
        text: 'Price of Medicine',
      },
      theme: 'light2',

      animationEnabled: true,
      axisY: {
        includeZero: true,
        valueFormatString: '€#,#0',
      },
      data: [
        {
          type: 'column',
          indexLabelFontColor: '#5A5757',
          dataPoints: dataPoints,
        },
      ],
    };
  }

  private _preparePieChartData(products: IProduct[]): void {
    const manufacturerProductCount: { [key: string]: number } = {};

    for (const product of products) {
      const manufacturerName = product.manufacturer.name;
      if (!manufacturerProductCount[manufacturerName]) {
        manufacturerProductCount[manufacturerName] = 1;
      } else {
        manufacturerProductCount[manufacturerName] += 1;
      }
    }

    this.pieChartData = {
      animationEnabled: true,
      theme: 'light2',

      title: {
        text: 'Manufacturer Product Count',
      },
      data: [
        {
          type: 'pie',
          startAngle: -90,
          indexLabel: '{name}: {y}',
          dataPoints: Object.entries(manufacturerProductCount).map(
            ([name, count]) => ({
              y: count,
              name: name,
            })
          ),
        },
      ],
    };
  }
}
