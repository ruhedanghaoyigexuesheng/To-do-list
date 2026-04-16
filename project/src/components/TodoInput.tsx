import { useState, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';
import { Priority } from '../hooks/useTodos';

interface TodoInputProps {
  onAdd: (text: string, priority: Priority) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleAdd = () => {
    if (value.trim()) {
      onAdd(value, priority);
      setValue('');
      setPriority('medium');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="添加新任务..."
          className="flex-1 px-5 py-3.5 rounded-2xl border border-blue-100 bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent shadow-sm transition-all"
        />
        <button
          onClick={handleAdd}
          disabled={!value.trim()}
          className="flex items-center gap-2 px-5 py-3.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>添加</span>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-600">优先级:</span>
        <div className="flex gap-2">
          {(['low', 'medium', 'high'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                priority === p
                  ? p === 'high'
                    ? 'bg-red-100 text-red-700'
                    : p === 'medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-green-100 text-green-700'
                  : p === 'high'
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : p === 'medium'
                      ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
              }`}
            >
              {p === 'high' ? '高' : p === 'medium' ? '中' : '低'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
