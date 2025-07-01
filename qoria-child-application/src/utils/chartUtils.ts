import type { Product, ChartDataPoint, ColumnChartData } from '../types';

export const CHART_COLORS = [
  '#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1',
  '#13c2c2', '#eb2f96', '#fa8c16', '#a0d911', '#2f54eb'
];

/**
 * Transforms raw product data into pie chart format
 */
export const transformToPieChartData = (
  products: Product[],
  selectedCategory?: string,
  selectedProducts?: string[]
): ChartDataPoint[] => {
  let filteredProducts = products;

  // Filter by category if selected
  if (selectedCategory) {
    filteredProducts = products.filter(p => p.category === selectedCategory);
  }

  // Filter by selected products if any
  if (selectedProducts && selectedProducts.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      selectedProducts.includes(p.title)
    );
  }

  // Group by category and count
  const categoryCount = filteredProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoryCount).map(([category, count], index) => ({
    name: category,
    y: count,
    color: CHART_COLORS[index % CHART_COLORS.length]
  }));
};

/**
 * Transforms product data into column chart format
 */
export const transformToColumnChartData = (
  products: Product[],
  selectedCategory?: string,
  selectedProducts?: string[]
) => {
  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = products.filter(p => p.category === selectedCategory);
  }

  if (selectedProducts && selectedProducts.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      selectedProducts.includes(p.title)
    );
  }

  // Group by category
  const categoryData = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const categories = Object.keys(categoryData);
  const series: ColumnChartData[] = [
    {
      name: 'Average Price',
      data: categories.map(category => {
        const products = categoryData[category];
        const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
        return Math.round(avgPrice * 100) / 100;
      }),
      color: '#1890ff'
    },
    {
      name: 'Average Rating',
      data: categories.map(category => {
        const products = categoryData[category];
        const avgRating = products.reduce((sum, p) => sum + p.rating, 0) / products.length;
        return Math.round(avgRating * 100) / 100;
      }),
      color: '#52c41a'
    },
    {
      name: 'Total Stock',
      data: categories.map(category => {
        const products = categoryData[category];
        return products.reduce((sum, p) => sum + p.stock, 0);
      }),
      color: '#faad14'
    }
  ];

  return { categories, series };
};

/**
 * Generates chart options for Highcharts
 */
export const getPieChartOptions = (data: ChartDataPoint[]) => ({
  chart: {
    type: 'pie',
    height: 400,
    backgroundColor: 'transparent'
  },
  title: {
    text: 'Product Distribution by Category',
    style: {
      fontSize: '18px',
      fontWeight: 'bold'
    }
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br/>Count: <b>{point.y}</b>'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      },
      showInLegend: true
    }
  },
  series: [{
    name: 'Categories',
    colorByPoint: true,
    data: data
  }],
  credits: {
    enabled: false
  }
});

export const getColumnChartOptions = (chartData: {
  categories: string[];
  series: ColumnChartData[];
}) => ({
  chart: {
    type: 'column',
    height: 400,
    backgroundColor: 'transparent'
  },
  title: {
    text: 'Product Analytics by Category',
    style: {
      fontSize: '18px',
      fontWeight: 'bold'
    }
  },
  xAxis: {
    categories: chartData.categories,
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Values'
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y}</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: chartData.series,
  credits: {
    enabled: false
  }
});