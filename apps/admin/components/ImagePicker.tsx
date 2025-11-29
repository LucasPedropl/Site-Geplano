import React, { useRef, useState } from 'react';
import { Link as LinkIcon, Image as ImageIcon, Upload, X } from 'lucide-react';

interface ImagePickerProps {
  label?: string;
  currentValue: string;
  onImageSelected: (url: string) => void;
  compact?: boolean;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({ label, currentValue, onImageSelected, compact = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [inputType, setInputType] = useState<'upload' | 'link'>('upload');

  // Função para comprimir e converter imagem para Base64
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Redimensionar se for muito grande (Max 800px width)
        const MAX_WIDTH = 800;
        if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Converter para Base64 com qualidade reduzida (0.7) para economizar espaço
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        onImageSelected(dataUrl);
        setIsCompressing(false);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const isBase64 = currentValue?.startsWith('data:image');

  return (
    <div className={`w-full ${compact ? '' : 'mb-6'}`}>
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center justify-between truncate">
            <div className="flex items-center gap-2">
                <ImageIcon size={16} className="text-geplano-green shrink-0" />
                {label}
            </div>
            {!compact && (
                <div className="flex bg-gray-100 rounded p-1">
                    <button 
                        onClick={() => setInputType('upload')}
                        className={`px-2 py-1 text-[10px] font-bold rounded transition-colors ${inputType === 'upload' ? 'bg-white shadow text-geplano-green' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        UPLOAD
                    </button>
                    <button 
                         onClick={() => setInputType('link')}
                         className={`px-2 py-1 text-[10px] font-bold rounded transition-colors ${inputType === 'link' ? 'bg-white shadow text-geplano-green' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        LINK
                    </button>
                </div>
            )}
        </label>
      )}

      <div className="flex flex-col gap-2">
        
        {/* INPUT: FILE UPLOAD */}
        {inputType === 'upload' && (
             <div className="relative group">
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isCompressing}
                    className={`w-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-green-50 hover:border-geplano-green rounded-lg flex items-center justify-center gap-2 transition-all ${compact ? 'py-2' : 'py-6'}`}
                >
                    {isCompressing ? (
                        <span className="text-geplano-green font-bold text-sm animate-pulse">Comprimindo...</span>
                    ) : (
                        <>
                            <Upload size={compact ? 14 : 20} className="text-gray-400 group-hover:text-geplano-green" />
                            <span className="text-gray-500 group-hover:text-geplano-green font-bold text-xs md:text-sm">
                                {compact ? 'Carregar' : 'Clique para Carregar Foto'}
                            </span>
                        </>
                    )}
                </button>
                {/* Dica sobre Base64 */}
                {!compact && !currentValue && (
                    <p className="text-[10px] text-gray-400 mt-1 text-center">A imagem será otimizada automaticamente.</p>
                )}
             </div>
        )}

        {/* INPUT: LINK TEXT */}
        {inputType === 'link' && (
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <LinkIcon size={14} />
                </div>
                <input 
                type="text" 
                value={isBase64 ? '' : currentValue} // Don't show base64 string in text input, it's too long
                onChange={(e) => onImageSelected(e.target.value)}
                placeholder={isBase64 ? "(Imagem carregada via upload)" : "https://..."}
                disabled={isBase64}
                className={`w-full bg-white border border-gray-200 rounded-lg text-gray-800 outline-none focus:ring-2 focus:ring-geplano-green/20 focus:border-geplano-green transition-all pl-9 ${compact ? 'py-2 text-xs' : 'py-3 text-sm'} ${isBase64 ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
                />
                {isBase64 && (
                    <button 
                        onClick={() => onImageSelected('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-400 hover:text-red-600"
                        title="Remover imagem carregada"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>
        )}

        {/* PREVIEW MINIATURA (se não for compact) */}
        {!compact && currentValue && (
             <div className="mt-2 relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                 <img src={currentValue} alt="Preview" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <button 
                        onClick={() => onImageSelected('')}
                        className="bg-white text-red-500 px-3 py-1 rounded-full text-xs font-bold hover:bg-red-50"
                     >
                        Remover Imagem
                     </button>
                 </div>
                 <div className="absolute bottom-0 right-0 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-tl-lg">
                    {isBase64 ? 'Armazenamento Local' : 'Link Externo'}
                 </div>
             </div>
        )}
      </div>
    </div>
  );
};