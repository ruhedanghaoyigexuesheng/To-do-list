interface TodoStatsProps {
  pendingCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export function TodoStats({ pendingCount, completedCount, onClearCompleted }: TodoStatsProps) {
  const total = pendingCount + completedCount;
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>
            未完成 <span className="font-semibold text-blue-500">{pendingCount}</span>
          </span>
          <span>
            已完成 <span className="font-semibold text-green-500">{completedCount}</span>
          </span>
        </div>
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-150 underline underline-offset-2"
          >
            清除已完成
          </button>
        )}
      </div>

      {total > 0 && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-gray-400">
            <span>进度</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-blue-50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
