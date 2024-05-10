import React, { ReactNode, useState } from "react";

export const ActionButton = ({
  children,
  onAction,
  disabled,
  actionButtonColor,
  padding,
}: {
  children: ReactNode;
  onAction?: () => void;
  disabled?: boolean;
  actionButtonColor?: { base?: string; hovered?: string };
  padding?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const divStyle = {
    backgroundColor: isHovered
      ? actionButtonColor?.hovered ?? "#0000FF"
      : actionButtonColor?.base ?? "#0075FF",
    transition: "all 0.3s ease",
    padding: padding ? `${padding}px` : "12px",
  };
  return (
    <button
      className=" text-white font-bold  rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition duration-300 ease-in-out hover:scale-105"
      onClick={onAction}
      disabled={disabled}
      style={{ ...divStyle, borderRadius: "100%" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export const Tick = ({ color }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ?? "currentColor"}
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
};
export const PlayIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ?? "currentColor"}
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
      />
    </svg>
  );
};
export const PauseIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={color ?? "currentColor"}
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export const DeleteIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ?? "currentColor"}
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};

export const MicOffIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ?? "currentColor"}
      className="w-6 h-6"
    >
      {" "}
      <line x1="1" y1="1" x2="23" y2="23" />{" "}
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />{" "}
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />{" "}
      <line x1="12" y1="19" x2="12" y2="23" />{" "}
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
};
export const MicIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color ?? "currentColor"}
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
      />
    </svg>
  );
};
