# Qoria Dashboard - Microfrontend Architecture

A modern product dashboard built with React, TypeScript, and microfrontend architecture using Module Federation.

## 🏗️ Architecture

This project consists of two applications:

- **Container Application** (`qoria-container-application`) - Main application with filters and business logic
- **Child Application** (`qoria-child-application`) - Chart components using Highcharts

## 🎥 Demo
 
[![Qoria Dashboard Demo](https://img.youtube.com/vi/Q21I13ht-hM/0.jpg)](https://youtu.be/Q21I13ht-hM)  
👉 **Watch the demo video here:** [https://youtu.be/Q21I13ht-hM](https://youtu.be/Q21I13ht-hM)

## 🚀 Features

- **Microfrontend Architecture**: Module Federation for scalable frontend architecture
- **Interactive Charts**: Pie charts and column charts using Highcharts
- **Real-time Filtering**: Dynamic data filtering and chart updates
- **Responsive Design**: Mobile-friendly UI with Ant Design
- **State Management**: Redux with Redux Saga for async operations
- **Type Safety**: Full TypeScript support
- **Performance Optimized**: Lazy loading, code splitting, and optimized builds

## 📦 Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Microfrontend**: Module Federation
- **State Management**: Redux + Redux Saga
- **UI Framework**: Ant Design
- **Charts**: Highcharts
- **Data Source**: DummyJSON API

## 🛠️ Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <https://github.com/sithum20210380/Qoria-Dashboard.git>
cd qoria-dashboard

cd qoria-container-application
npm install

cd..

cd qoria-child-application
npm install
```

## 🏃 Running the Applications

### Child Application First
```bash
cd qoria-child-application
npm run build
cp dist/assets/remoteEntry.js dist/remoteEntry.js
npm run preview
```

### Container Application
```bash
cd qoria-container-application
npm run build
npm run preview
```

## 📁 Project Structure
```
root/
├── qoria-child-application/
│   ├── dist/                          
│   ├── node_modules/                 
│   ├── public/                       
│   ├── src/
│   │   ├── assets/                   
│   │   ├── components/
│   │   │   └── ChartComponents.tsx   
│   │   ├── types/                    
│   │   ├── App.tsx                   
│   │   ├── main.tsx                 
│   │   └── vite-env.d.ts            
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts

├── qoria-container-application/
│   ├── dist/                         
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/                   
│   │   ├── components/
│   │   │   ├── chartContainer/
│   │   │   │   ├── ChartContainer.tsx
│   │   │   │   └── ChartContainer.module.css
│   │   │   ├── filterPanel/
│   │   │   │   ├── FilterPanel.tsx
│   │   │   │   ├── FilterPanel.module.css
│   │   │   │── ErrorBoundary.tsx
│   │   ├── layouts/
│   │   │   └── DashboardLayout.tsx
│   │   │   └── DashboardLayout.module.css
│   │   ├── store/
│   │   │   ├── sagas/
│   │   │   ├── slices/
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── global.d.ts
│   │   │   ├── theme.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.tsx
│   │   ├── index.css
│   │   └── vite-env.d.ts
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
```

## 🎯 Usage

1. **Start the applications**: Both child and container apps must be running
2. **Filter Products**: Select a category from the dropdown
3. **Select Products**: Choose specific products (optional)
4. **View Pie Chart**: Updates automatically based on selections
5. **Generate Report**: Click "Run Report" to show column chart
6. **Clear Filters**: Use individual or "Clear All" buttons

## 🔧 Configuration

### Container Application (Port 3001)
- Main dashboard interface
- Filter controls
- Redux store management
- Consumes chart components from child app

### Child Application (Port 3002)
- Chart components (Pie & Column)
- Highcharts integration
- Exposed via Module Federation
- Standalone development capability

## 🎨 Design System

- **Primary Color**: #1890ff (Ant Design Blue)
- **Secondary Color**: #722ed1 (Purple)
- **Background**: #f0f2f5 (Light Gray)
- **Typography**: System fonts with Ant Design styling
- **Charts**: Custom Highcharts theme with consistent colors

## 📊 Data Flow

1. Container app fetches data from DummyJSON API
2. User interacts with filters in FilterPanel
3. Redux store updates filter state
4. ChartContainer generates chart data
5. Chart data passed to child app components
6. Child app renders interactive charts


## 📈 Performance Optimizations

- **Code Splitting**: Automatic with Module Federation
- **Lazy Loading**: Chart components loaded on demand
- **Memoization**: Expensive computations cached
- **Bundle Analysis**: Use `npm run build:analyze`


## 🙏 Acknowledgments

- **Ant Design** for UI components
- **Highcharts** for chart library
- **DummyJSON** for sample data
- **Module Federation** for microfrontend architecture
