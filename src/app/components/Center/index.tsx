import React from "react";

type Props = React.HTMLProps<HTMLDivElement>

export function Center({ children, ...rest } : Props) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div 
        className="bg-primary-subtle py-2 px-3 rounded-2 w-50"
        style={{
          maxWidth: "600px",
          minWidth: "300px"
        }} 
        {...rest}
      >
        {children}
      </div>
    </div>
  )
}