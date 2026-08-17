import type { DoctorStatus } from "../../types/doctor.types";
import { statusLabels } from "../../data/doctor.data";

interface DoctorAvatarProps {
  firstName: string;
  lastName: string;
  size?: 'sm' | 'md' | 'lg';
  status?: DoctorStatus;
  className?: string;
}

const SIZES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-lg',
} as const;

const STATUS_COLORS: Record<DoctorStatus, string> = {
  ACTIVE: 'border-green-500 bg-green-500',
  INACTIVE: 'border-red-500 bg-red-500',
  ON_LEAVE: 'border-amber-500 bg-amber-500',
  BUSY: 'border-purple-500 bg-purple-500',
};

export default function DoctorAvatar({ 
  firstName, 
  lastName, 
  size = 'md', 
  status,
  className = ''
}: DoctorAvatarProps) {
  // Handle edge cases for initials
  const getInitials = () => {
    const first = firstName?.trim()?.[0] || '';
    const last = lastName?.trim()?.[0] || '';
    return (first + last).toUpperCase() || '?';
  };

  const initials = getInitials();
  const sizeClasses = SIZES[size];

  return (
    <div className={`relative shrink-0 ${className}`}>
      <div 
        className={`
          flex 
          items-center 
          justify-center 
          rounded-full 
          bg-linear-to-br 
          from-indigo-500 
          to-indigo-600 
          font-semibold 
          text-white 
          shadow-md 
          transition-all 
          duration-200 
          hover:shadow-lg
          ${sizeClasses}
        `}
        role="img"
        aria-label={`Avatar for ${firstName} ${lastName}`}
      >
        {initials}
      </div>

      {status && (
        <div 
          className={`
            absolute 
            -bottom-0.5 
            -right-0.5 
            h-3.5 
            w-3.5 
            rounded-full 
            border-2 
            border-white 
            ${STATUS_COLORS[status]}
            transition-all 
            duration-200
            hover:scale-110
          `}
          title={statusLabels[status]}
          role="status"
          aria-label={`Status: ${statusLabels[status]}`}
        />
      )}
    </div>
  );
}