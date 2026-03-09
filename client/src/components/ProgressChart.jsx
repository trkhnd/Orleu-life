import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

export default function ProgressChart({ progress }) {
  const data = [
    { day: 'Mon', value: 35 },
    { day: 'Tue', value: 55 },
    { day: 'Wed', value: 60 },
    { day: 'Thu', value: 50 },
    { day: 'Fri', value: 75 },
    { day: 'Sat', value: 70 },
    { day: 'Sun', value: progress }
  ]

  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}