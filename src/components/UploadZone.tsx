import React, { useState, useCallback } from 'react';
import { CloudUpload, Lock, FileSpreadsheet } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (isValidFileType(file)) {
          onFileSelect(file);
        }
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  const isValidFileType = (file: File) => {
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    return validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx');
  };

  return (
    <div className="card-medical">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-secondary">Upload Patient List</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Please upload your .CSV or .XLSX export. Required columns:{' '}
          <span className="font-medium">Owner Name, Email, Pet Name, Last Visit Date.</span>
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
        className={`upload-zone ${isDragging ? 'upload-zone-active' : ''}`}
      >
        <input
          id="file-input"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileInput}
          className="hidden"
        />
        <div className="flex flex-col items-center pointer-events-none">
          <div className={`mb-4 rounded-full p-4 transition-colors ${isDragging ? 'bg-primary/20' : 'bg-accent'}`}>
            <CloudUpload className={`h-10 w-10 transition-colors ${isDragging ? 'text-primary' : 'text-primary'}`} />
          </div>
          <p className="text-lg font-medium text-secondary">
            {isDragging ? 'Drop file here' : 'Drag & Drop file here'}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">or Click to Browse</p>
          
          <div className="mt-4 flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Supported: CSV, XLSX</span>
          </div>
        </div>
      </div>

      {/* Security note */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Lock className="h-4 w-4 text-primary" />
        <span>Files are automatically encrypted upon upload.</span>
      </div>
    </div>
  );
};

export default UploadZone;
