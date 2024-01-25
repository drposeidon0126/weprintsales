import {} from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ totalPage, currentPage, onSetPage, loadingData, ...rest }) {
	const normalClass =
		'px-4 py-2 text-sm h-[36px] font-semibold cursor-pointer text-gray-700 border  hover:bg-gray-50 focus:z-20 focus:outline-offset-0';
	const activeClass =
		'px-4 py-2 text-sm h-[36px] font-semibold cursor-pointer text-blue-600 border border-blue-600 bg-blue-50 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';
	const navClass = 'h-[36px] px-2 py-2 border hover:bg-gray-50 focus:z-20 focus:outline-offset-0';
	return (
		<div className={`flex items-center mb-3 ${loadingData ? 'pointer-events-none' : ''}`}>
			<span
				className={`rounded-l-md ${navClass} ${
					currentPage === 1 ? 'cursor-default text-gray-300' : 'text-gray-700  cursor-pointer'
				}`}
				style={{ paddingLeft: '8px', paddingRight: '8px' }}
				onClick={() => {
					onSetPage(currentPage - 1);
				}}
			>
				<ChevronLeftIcon className='w-5 h-5' aria-hidden='true' />
			</span>
			{currentPage > 1 ? (
				<span
					className={normalClass}
					onClick={() => {
						onSetPage(1);
					}}
				>
					1
				</span>
			) : (
				<></>
			)}
			{currentPage > 3 && totalPage <= 4 ? (
				<span
					className={normalClass}
					onClick={() => {
						onSetPage(2);
					}}
				>
					2
				</span>
			) : (
				<></>
			)}
			{currentPage > 3 && totalPage > 4 ? <span className={normalClass}>...</span> : <></>}
			{currentPage > 2 ? (
				<span
					className={normalClass}
					onClick={() => {
						onSetPage(currentPage - 1);
					}}
				>
					{currentPage - 1}
				</span>
			) : (
				<></>
			)}
			<span className={activeClass}>{currentPage}</span>

			{currentPage + 1 < totalPage ? (
				<span
					className={normalClass}
					onClick={() => {
						onSetPage(currentPage + 1);
					}}
				>
					{currentPage + 1}
				</span>
			) : (
				<></>
			)}
			{currentPage + 2 < totalPage && currentPage === 1 ? (
				<span
					className={normalClass}
					onClick={() => {
						onSetPage(currentPage + 2);
					}}
				>
					{currentPage + 2}
				</span>
			) : (
				<></>
			)}
			{totalPage > 3 && currentPage + 3 <= totalPage ? <span className={normalClass}>...</span> : <></>}

			{totalPage > 1 && currentPage !== totalPage ? (
				<span
					className={normalClass}
					onClick={() => {
						onSetPage(totalPage);
					}}
				>
					{totalPage}
				</span>
			) : (
				<></>
			)}
			<span
				className={` ${navClass} rounded-r-md ${
					currentPage === totalPage ? 'cursor-default text-gray-300' : 'text-gray-700  cursor-pointer'
				}`}
				style={{ paddingLeft: '8px', paddingRight: '8px' }}
				onClick={() => {
					onSetPage(currentPage + 1);
				}}
			>
				<ChevronRightIcon className='w-5 h-5' aria-hidden='true' />
			</span>
		</div>
	);
}
