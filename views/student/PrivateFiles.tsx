import React, { useState, useRef } from 'react';
import { MOCK_PRIVATE_FILES } from '../../constants';
import { PrivateFile } from '../../types';
import { DocumentTextIcon, PhotoIcon, ArchiveBoxIcon, PlusCircleIcon, TrashIcon, PencilIcon } from '../../components/icons';

const FileIcon: React.FC<{ type: PrivateFile['type'] }> = ({ type }) => {
    const baseClass = "w-6 h-6";
    switch (type) {
        case 'pdf': return <DocumentTextIcon className={`${baseClass} text-red-500`} />;
        case 'docx': return <DocumentTextIcon className={`${baseClass} text-blue-500`} />;
        case 'img': return <PhotoIcon className={`${baseClass} text-green-500`} />;
        case 'zip': return <ArchiveBoxIcon className={`${baseClass} text-yellow-500`} />;
        default: return <DocumentTextIcon className={`${baseClass} text-gray-500`} />;
    }
};

const PrivateFiles: React.FC = () => {
    const [files, setFiles] = useState<PrivateFile[]>(MOCK_PRIVATE_FILES);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const getFileType = (fileName: string): PrivateFile['type'] => {
        const extension = fileName.split('.').pop()?.toLowerCase() || '';
        if (['pdf'].includes(extension)) return 'pdf';
        if (['doc', 'docx'].includes(extension)) return 'docx';
        if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'img';
        if (['zip', 'rar', '7z'].includes(extension)) return 'zip';
        return 'docx'; // default for unknown types
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newFile: PrivateFile = {
                id: Date.now(),
                name: file.name,
                size: formatFileSize(file.size),
                type: getFileType(file.name),
                uploadedAt: new Date().toISOString(),
            };
            setFiles(prevFiles => [newFile, ...prevFiles]);
        }
        // Reset file input value to allow uploading the same file again
        if(event.target) {
            event.target.value = '';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Mis Archivos</h2>
                <button 
                    onClick={handleUploadClick}
                    className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Subir Archivo
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                    className="hidden" 
                    aria-hidden="true"
                />
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Tamaño</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Fecha de Carga</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {files.map(file => (
                            <tr key={file.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4"><FileIcon type={file.type} /></td>
                                <td className="px-6 py-4 font-medium text-black">{file.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{file.size}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{new Date(file.uploadedAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        <button className="p-1 text-gray-400 hover:text-blue-600" aria-label={`Editar ${file.name}`}><PencilIcon className="w-5 h-5"/></button>
                                        <button className="p-1 text-gray-400 hover:text-red-600" aria-label={`Eliminar ${file.name}`}><TrashIcon className="w-5 h-5"/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PrivateFiles;
