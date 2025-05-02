import { NodeUsage } from '@/services/resourcesService';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts'


interface ResourceUsageProps {
  data: NodeUsage[];
}

export function ResourceUsage({ data }: ResourceUsageProps) {
  const chartData = data.map(node => ({
    name: node.nodeName,
    cpu: node.cpuPercent,
    memory: node.memoryPercent,
  }));

  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={chartData} barCategoryGap="20%">
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey='cpu' fill='#8884d8' name='CPU Usage' radius={[4, 4, 0, 0]} />
        <Bar dataKey='memory' fill='#82ca9d' name='Memory Usage' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
