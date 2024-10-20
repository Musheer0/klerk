import React, { useState } from 'react';
import { Input } from "@/components/ui/input"; // Adjust the import path according to your project structure
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react"; // Icons for show/hide

const PasswordInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        autoComplete="false"
        required
        className="pr-10"
      />
      <Button
        type="button"
        onClick={togglePasswordVisibility}
        variant="ghost"
        className="absolute inset-y-0 right-0 flex items-center px-3"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </Button>
    </div>
  );
};

export default PasswordInput;
