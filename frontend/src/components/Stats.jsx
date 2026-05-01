import { useEffect, useState } from "react";
import { getStats } from "../api/task";
import { ListTodo, Clock, CheckCircle, BarChart3 } from "lucide-react";

export const Stats = ({ refreshKey }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await getStats();
      setStats(res.data);
    };
    fetch();
  }, [refreshKey]);

  if (!stats) {
    return <p className="text-gray-500">Loading stats...</p>;
  }

  const cards = [
    {
      label: "Total",
      value: stats.total,
      icon: <BarChart3 />,
      color: "bg-blue-100",
    },
    {
      label: "To Do",
      value: stats.todo,
      icon: <ListTodo />,
      color: "bg-red-100",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: <Clock />,
      color: "bg-yellow-100",
    },
    {
      label: "Done",
      value: stats.done,
      icon: <CheckCircle />,
      color: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`${card.color} p-5 rounded-xl shadow flex items-center justify-between`}
        >
          <div>
            <h3 className="text-sm font-semibold text-gray-600">
              {card.label}
            </h3>
            <p className="text-2xl font-bold text-gray-800">
              {card.value}
            </p>
          </div>

          <div className="text-gray-700">{card.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;