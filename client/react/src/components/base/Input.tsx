import { type IconType } from "react-icons/lib";

interface InputProps {
  label: string;
  type: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  Icon?: IconType;
  disabled?: boolean;
}

function Input({ label, type, className, onChange, value, Icon, disabled }: InputProps) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />}
      <input
        type={type}
        placeholder={label}
        className={`w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
        id={label}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;