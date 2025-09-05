import { useState } from "react";

// Custom Tooltip for charts
export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            className="text-sm"
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Generate random data for real-time simulation
export const generateRandomData = (baseData, variance = 0.1) => {
  return baseData.map((item) => ({
    ...item,
    value: Math.max(
      0,
      item.value * (1 + (Math.random() * variance * 2 - variance))
    ),
  }));
};

// Simulate real-time data updates
export const useRealtimeData = (initialData, interval = 5000) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const timer = setInterval(() => {
      setData((prevData) => generateRandomData(prevData));
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return data;
};
