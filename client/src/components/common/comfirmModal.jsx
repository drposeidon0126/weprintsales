import { Fragment, useRef, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function ConfirmModal(props) {
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setDisable(false);
		props.handleClose();
	};
	const [disable, setDisable] = useState(false);
	const deleteData = () => {
		setDisable(false);
		props.deleteItem();
	};
	const handleChange = () => {
		setDisable(!disable);
	};
	useEffect(() => {
		setOpen(props.open);
	}, [props.open]);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as='div' className='relative z-30' onClose={handleClose}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				<div className='fixed inset-0 z-10 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 w-full text-center sm:items-center sm:p-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							enterTo='opacity-100 translate-y-0 sm:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 sm:scale-100'
							leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						>
							<Dialog.Panel className='relative transform w-full overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
								<div className='absolute top-0 right-0 hidden pt-2 pr-4 sm:block'>
									<button
										type='button'
										className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
										onClick={handleClose}
									>
										<span className='sr-only'>close</span>
										<XMarkIcon className='h-6 w-6 text-black' aria-hidden='true' />
									</button>
								</div>
								<div className='sm:flex sm:items-start'>
									<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
										<ExclamationTriangleIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
									</div>
									<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
										<Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
											Warning
										</Dialog.Title>
										<div className='mt-2 w-full '>
											<p className='text-sm text-gray-500'>
												{props.message}
											</p>
										</div>
										<div className='flex h-5 items-center justify-center mt-4'>
											<input
												id='comments'
												name='comments'
												value={disable}
												onChange={e => handleChange(e)}
												type='checkbox'
												className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2'
											/>
											<p className='text-sm text-gray-500'>Please confirm before precess</p>
										</div>
									</div>
								</div>
								<div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
									<button
										type='button'
										disabled={!disable}
										onClick={() => deleteData()}
										className={classNames(
											'inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm',
											!disable ? 'bg-red-200 ' : ' bg-red-600 hover:bg-red-700'
										)}
									>
										Ok
									</button>
									<button
										type='button'
										className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm'
										onClick={() => handleClose(false)}
									>
										Cancel
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export function DeleteModal(props) {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const cancelButtonRef = useRef(null);

	const handleClose = () => {
		props.handleClose();
	};

	useEffect(() => {
		setOpen(props.open);
	}, [props.open]);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as='div' className='relative z-30' initialFocus={cancelButtonRef} onClose={handleClose}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				<div className='fixed inset-0 z-10 overflow-y-auto'>
					<div className='flex min-h-full items-end justify-center p-4 w-full text-center sm:items-center sm:p-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							enterTo='opacity-100 translate-y-0 sm:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 sm:scale-100'
							leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						>
							<Dialog.Panel className='relative transform overflow-hidden w-full rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:mr-[14px]'>
								<div className='absolute top-0 right-0 pt-2 pr-4 sm:block'>
									<button
										type='button'
										className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
										onClick={() => handleClose()}
									>
										<span className='sr-only'>Close</span>
										<XMarkIcon className='h-6 w-6 text-black' aria-hidden='true' />
									</button>
								</div>
								<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
									<div className='sm:flex sm:items-start'>
										<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
											<Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
												{t('admin.delete')} photo?
											</Dialog.Title>
											{/* <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        Delete photo?
                        </p>
                      </div> */}
										</div>
									</div>
								</div>
								<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
									<button
										type='button'
										className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
										onClick={() => props.deleteItem()}
									>
										{t('admin.yes')}
									</button>
									<button
										type='button'
										className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
										onClick={() => handleClose()}
									>
										{t('admin.no')}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
