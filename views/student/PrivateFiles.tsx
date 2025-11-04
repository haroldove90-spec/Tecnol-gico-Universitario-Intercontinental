
import React from 'react';
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
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Mis Archivos</h2>
                <button className="flex items-center bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Subir Archivo
                </button>
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
                        {MOCK_PRIVATE_FILES.map(file => (
                            <tr key={file.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4"><FileIcon type={file.type} /></td>
                                <td className="px-6 py-4 font-medium text-black">{file.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{file.size}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{new Date(file.uploadedAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        <button className="p-1 text-gray-400 hover:text-blue-600"><PencilIcon className="w-5 h-5"/></button>
                                        <button className="p-1 text-gray-400 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
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
