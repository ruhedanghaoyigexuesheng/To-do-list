import { useState } from 'react';
import { Trash2, CreditCard as Edit2, Check, X } from 'lucide-react';
import { Todo, Priority } from '../hooks/useTodos';
import { formatTime } from '../utils/formatTime';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, priority: Priority) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText, editPriority);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const priorityColor = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-green-100 text-green-700 border-green-200',
  };

  const priorityLabel = {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级',
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border bg-white border-blue-100">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-blue-500 border-blue-500'
              : 'border-blue-300 hover:border-blue-500'
          }`}
          aria-label="标记完成状态"
        >
          {todo.completed && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <div className="flex-1 flex flex-col gap-2">
          <input
            type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            className="px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            autoFocus
          />
          <div className="flex gap-2 items-center">
            <span className="text-xs font-medium text-gray-600">优先级:</span>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setEditPriority(p)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                    editPriority === p
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

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-all"
            aria-label="保存"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            aria-label="取消"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-200 ${
        todo.completed
          ? 'bg-gray-50 border-gray-100'
          : 'bg-white border-blue-50 hover:border-blue-200 hover:shadow-sm'
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? 'bg-blue-500 border-blue-500'
            : 'border-blue-300 hover:border-blue-500'
        }`}
        aria-label={todo.completed ? '标记为未完成' : '标记为完成'}
      >
        {todo.completed && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-sm leading-relaxed transition-all duration-200 ${
              todo.completed
                ? 'text-gray-400 line-through'
                : 'text-gray-700'
            }`}
          >
            {todo.text}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${priorityColor[todo.priority]} whitespace-nowrap`}>
            {priorityLabel[todo.priority]}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>添加于 {formatTime(todo.createdAt)}</span>
          {todo.completed && todo.completedAt && (
            <>
              <span>•</span>
              <span>完成于 {formatTime(todo.completedAt)}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1.5 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all duration-150"
          aria-label="编辑任务"
        >
          <Edit2 size={15} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
          aria-label="删除任务"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
