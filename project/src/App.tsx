import { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { TodoStats } from './components/TodoStats';

type Filter = 'all' | 'pending' | 'completed';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted, completedCount, pendingCount } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'pending', label: '未完成' },
    { key: 'completed', label: '已完成' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-start justify-center pt-16 pb-16 px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-500 rounded-2xl shadow-lg shadow-blue-200 mb-4">
            <CheckSquare size={28} color="white" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">待办事项</h1>
          <p className="text-gray-400 text-sm mt-1.5">记录你的每一个任务，专注完成它</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/60 border border-blue-50 overflow-hidden">
          <div className="p-6 space-y-5">
            <TodoInput onAdd={addTodo} />

            <div className="flex gap-1 bg-blue-50 p-1 rounded-xl">
              {filters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    filter === f.key
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {f.label}
                  {f.key === 'all' && todos.length > 0 && (
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${filter === f.key ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                      {todos.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 pb-2">
            {filteredTodos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <CheckSquare size={28} className="text-blue-200" />
                </div>
                <p className="text-gray-400 text-sm font-medium">
                  {filter === 'completed' ? '还没有完成的任务' : filter === 'pending' ? '没有待办任务' : '还没有任务，添加一个吧！'}
                </p>
              </div>
            ) : (
              <div className="space-y-2 pb-4">
                {filteredTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </div>
            )}
          </div>

          {todos.length > 0 && (
            <div className="px-6 pb-6 pt-2 border-t border-gray-50">
              <TodoStats
                pendingCount={pendingCount}
                completedCount={completedCount}
                onClearCompleted={clearCompleted}
              />
            </div>
          )}
        </div>

        <p className="text-center text-gray-300 text-xs mt-6">数据已自动保存到本地浏览器</p>
      </div>
    </div>
  );
}

export default App;
