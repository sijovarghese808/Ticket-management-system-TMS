import { useEffect, useState } from 'react';
import { ToastType } from './ToastContext';

export function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: ToastType;
  onClose: () => void;
}) {
  const [progress, setProgress] = useState(100);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 2;
      });
    }, 100);

    const timeout = setTimeout(() => handleClose(), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300); // Delay for exit animation
  };

  const getWrapperClasses = () => {
    let base = 'w-72 border-l-4 shadow-md rounded-md overflow-hidden transform transition-all duration-300 ';
    if (closing) {
      base += 'opacity-0 translate-x-full ';
    } else {
      base += 'translate-x-0 ';
    }

    if (type === 'success') base += 'bg-green-100 text-green-800 border-green-500';
    else if (type === 'error') base += 'bg-red-100 text-red-800 border-red-500';
    else base += 'bg-blue-100 text-blue-800 border-blue-500';

    return base;
  };

  const getProgressColor = () => {
    if (type === 'success') return 'bg-green-500 text-white';
    if (type === 'error') return 'bg-red-500';
    return 'bg-blue-500';
  };

  const getIcon = () => {
    if (type === 'success') return '✔️';
    if (type === 'error') return '❌';
    return 'ℹ️';
  };

  return (
    <div className={getWrapperClasses()}>
      <div className="flex justify-between items-center px-4 py-3">
        <span className="text-sm font-medium flex items-center gap-2">
          <span>{getIcon()}</span> {message}
        </span>
        <button onClick={handleClose} className="text-lg text-gray-400 hover:text-gray-600">×</button>
      </div>
      <div className="h-1 bg-gray-200">
        <div
          className={`${getProgressColor()} h-full transition-all duration-100`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
