import React from "react";

type Props = React.HTMLProps<HTMLDivElement>

export function Center({ children, ...rest } : Props) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className='bg-primary-subtle py-4 px-5 rounded-2 w-50' {...rest}>
        {children}
      </div>
    </div>
  )
}