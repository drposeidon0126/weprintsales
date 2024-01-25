import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SWITCH({ labelName, onChange, value, error,  ...rest }) {

  return (
    <div className="">
        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 mb-4">
            {labelName}
        </label>
        {/* <div className="mt-1">
            <input
            onChange={onChange} value={value} error={error?"this field is required":""} maxLength={maxLength}
                type={type? type: "text"}
                autoComplete="street-address"
                className="rounded-md shadow-sm sm:text-sm focus:bg-transparent border-[2px] border-gray-300 text-black focus-visible:border-[2px] focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:outline-none block p-2 pl-[7px] h-[45px] w-full"
            />
        </div> */}
        {/* <div className="flex h-5 items-center mb-4">
            <label htmlFor="comments" className="font-medium text-gray-700">
                {labelName}
            </label>
        </div> */}
        <Switch
            checked={value}
            onChange={onChange}
            className={classNames(
                value ? 'bg-blue-600' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
            >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={classNames(
                    value ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
            />
        </Switch>
    </div>
  )
}
