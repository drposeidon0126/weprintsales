import { CheckIcon } from '@heroicons/react/20/solid'
import orderService from '@/services/order-service';
import { useEffect } from 'react';
const steps = [
  {
    id: 1,
    name: "Pending Review",
    description: "new order created",
    href: "#",
    status: "complete",
  },
  {
    id: 2,
    name: "Pre-Production",
    description: "System accepted order of customer.",
    href: "#",
    status: "complete",
    
  },
  {
    id: 3,
    name: "Processing",
    description: "System is working on order.",
    href: "#",
    status: "current",
  },
  {
    id: 4,
    name: "Complete Design",
    description: "Order was shipped successfully.",
    href: "#",
    status: "upcoming",
  },
  {
    id: 5,
    name: "Pick-Up",
    description: "Order was shipped successfully.",
    href: "#",
    status: "upcoming",
  },
  {
    id: 6,
    name: "Delivered",
    description: "Order was delivered successfully.",
    href: "#",
    status: "upcoming",
  },
];

const statusList = [
    { id: 1, name: "request" },
    { id: 2, name: "accepted" },
    { id: 3, name: "processing" },
    { id: 4, name: "completed" },
    { id: 5, name: "pick-up" },
    { id: 6, name: "delivered" }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Example(props) {
    useEffect(() => {}, [props.currentStatus]);
  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <div className="flex items-start justify-between">
            <li
              key={step.name}
              className={classNames(
                stepIdx !== steps.length - 1 ? "pb-10" : "",
                "relative"
              )}
            >
              {step.id <= props.currentStatus ? (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-blue-600"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div
                    onClick={() => props.changeStaus(step)}
                    className="group relative flex items-start"
                  >
                    <span className="flex h-9 items-center">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 group-hover:bg-blue-800">
                        <CheckIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium">{step.name}</span>
                      <span className="text-sm text-gray-500">
                        {step.description}
                      </span>
                    </span>
                  </div>
                </>
              ) : step.id === (parseInt(props.currentStatus)+1) ? (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div
                    onClick={() => props.changeStaus(step)}
                    className="group relative flex items-start"
                    aria-current="step"
                  >
                    <span className="flex h-9 items-center" aria-hidden="true">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-blue-600">
                        {step.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {step.description}
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div
                    onClick={() => props.changeStaus(step)}
                    className="group relative flex items-start"
                  >
                    <span className="flex h-9 items-center" aria-hidden="true">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                        <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-gray-500">
                        {step.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {step.description}
                      </span>
                    </span>
                  </div>
                </>
              )}
            </li>
            {/* <button
              type="button"
              onClick={() => props.changeStaus(step)}
              className=" h-[40px] w-[130px] rounded bg-blue-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {step.name}
            </button> */}
          </div>
        ))}
      </ol>
    </nav>
  );
}
