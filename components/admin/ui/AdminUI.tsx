import React from 'react';
import { Trash2, Plus } from 'lucide-react';

export const Field = ({
	label,
	children,
	description,
}: {
	label: string;
	children: React.ReactNode;
	description?: string;
}) => (
	<div className="mb-6">
		<label className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex justify-between items-center">
			{label}
		</label>
		{children}
		{description && (
			<p className="text-xs text-gray-400 mt-2">{description}</p>
		)}
	</div>
);

export const Input = ({
	value,
	onChange,
	placeholder,
	className = '',
}: {
	value: string;
	onChange: (val: string) => void;
	placeholder?: string;
	className?: string;
}) => (
	<input
		type="text"
		value={value}
		onChange={(e) => onChange(e.target.value)}
		placeholder={placeholder}
		className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-geplano-green/20 focus:border-geplano-green transition-all outline-none placeholder-gray-300 shadow-sm ${className}`}
	/>
);

export const TextArea = ({
	value,
	onChange,
	rows = 4,
	placeholder,
	className = '',
}: {
	value: string;
	onChange: (val: string) => void;
	rows?: number;
	placeholder?: string;
	className?: string;
}) => (
	<textarea
		value={value}
		onChange={(e) => onChange(e.target.value)}
		rows={rows}
		placeholder={placeholder}
		className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-geplano-green/20 focus:border-geplano-green transition-all outline-none shadow-sm resize-y min-h-24 ${className}`}
	/>
);

export const SectionCard = ({
	title,
	children,
	id,
	action,
}: {
	title: string;
	children: React.ReactNode;
	id?: string;
	action?: React.ReactNode;
}) => (
	<div
		id={id}
		className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8 scroll-mt-24"
	>
		<div className="bg-gray-50/50 px-4 md:px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
			<div className="flex items-center gap-3">
				<div className="w-1 h-6 bg-geplano-gold rounded-full"></div>
				<h3 className="text-base md:text-lg font-bold text-gray-800">
					{title}
				</h3>
			</div>
			{action}
		</div>
		<div className="p-4 md:p-6">{children}</div>
	</div>
);

export const DeleteButton = ({ onClick }: { onClick: () => void }) => (
	<button
		onClick={onClick}
		className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
		title="Remover item"
	>
		<Trash2 size={18} />
	</button>
);

export const AddButton = ({
	onClick,
	label,
}: {
	onClick: () => void;
	label: string;
}) => (
	<button
		onClick={onClick}
		className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-bold hover:border-geplano-green hover:text-geplano-green hover:bg-green-50 transition-all flex items-center justify-center gap-2"
	>
		<Plus size={20} /> {label}
	</button>
);
