import React from "react";

export function Button({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={
        "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      }
      {...rest}
    >
      {children}
    </button>
  );
}

export function PageButton({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ModalConfirmButton({
  onCancel,
  onConfirm,
  isAdd,
  disabled,
  activeColor,
  ...rest
}) {

  return (
    <div className="flex flex-row-reverse py-3 bg-translate sm:px-0">
      <button
        type="button"
        onClick={onConfirm}
        disabled={disabled}
        style={{
          backgroundColor: activeColor,
        }}
        className={`inline-flex w-[100px] justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm sm:px-10 ${disabled ? "bg-blue-200" : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {isAdd ? 'Add' : 'Save'}
      </button>
      <button
        type="button"
        onClick={onCancel}
        disabled={disabled}
        className={`inline-flex w-[100px] justify-center rounded-md border border-gray-300  px-4 py-2 text-base font-medium text-gray-700 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2  sm:mr-3 sm:w-auto sm:text-sm sm:px-10 mr-3 ${disabled ? "bg-white" : "bg-white hover:bg-gray-50"
          }`}
      >
        Cancel
      </button>
    </div>
  );
}
