// chartConfig.js
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, BarElement, Filler } from 'chart.js';

// Registering the necessary Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement, // Register the PointElement for Line charts
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Filler
);
