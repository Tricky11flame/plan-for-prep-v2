import { useEffect } from 'react';
import type { NotificationState } from '../types';

interface NotificationProps {
  notification: NotificationState | null;
  onClear: () => void;
}

export default function Notification({ notification, onClear }: NotificationProps) {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(onClear, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClear]);

  if (!notification) return null;

  const colorClasses = {
    error: 'bg-rose-400',
    success: 'bg-blue-400',
    info: 'bg-indigo-500',
  };

  return (
    <div
  className={`fixed top-5 right-5 z-50 font-mono font-bold uppercase tracking-tight text-sm border-[2pt] border-black text-black py-3 px-5 rounded shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${colorClasses[notification.type]}`}
>
  {/* Notification Content goes here */}
  {notification.message}
</div>
  );
}