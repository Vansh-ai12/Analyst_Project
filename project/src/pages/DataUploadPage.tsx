import { useState, useRef, type DragEvent, type ChangeEvent} from 'react';
import { Upload, FileText, CheckCircle, XCircle, Play, RefreshCw } from 'lucide-react';
import { previewData } from '../data/mockData';

type UploadState = 'idle' | 'dragging' | 'uploaded' | 'processing' | 'done' | 'error';

export default function DataUploadPage() {
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const handleFile = (file: File) => {
    if (!file) return;
    setFile(file);
    setFileName(file.name);
    setFileSize(`${(file.size / 1024).toFixed(1)} KB`);
    setUploadState('uploaded');
    setShowPreview(true);
    setProgress(0);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleProcess = async () => {
    if (!file) return;
    setUploadState('processing');
    setProgress(10);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload-csv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Processing failed');
      
      setProgress(100);
      setUploadState('done');
    } catch (err) {
      console.error(err);
      setUploadState('error');
    }
  };

  const handleReset = () => {
    setUploadState('idle');
    setFileName('');
    setFileSize('');
    setFile(null);
    setShowPreview(false);
    setProgress(0);
    if (fileRef.current) fileRef.current.value = '';
  };

  const isDragging = uploadState === 'dragging';
  const isProcessing = uploadState === 'processing';
  const isDone = uploadState === 'done';

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 4 }}>
          Data Upload
        </h1>
        <p style={{ fontSize: 14, color: '#64748b' }}>Upload CSV or Excel files to generate instant analytics.</p>
      </div>

      {/* Upload area */}
      <div
        onDragOver={(e) => { e.preventDefault(); if (uploadState === 'idle') setUploadState('dragging'); }}
        onDragLeave={() => { if (uploadState === 'dragging') setUploadState('idle'); }}
        onDrop={handleDrop}
        onClick={() => uploadState === 'idle' && fileRef.current?.click()}
        style={{
          background: isDragging ? '#eff6ff' : '#fff',
          border: `2px dashed ${isDragging ? '#3b82f6' : uploadState !== 'idle' ? '#22c55e' : '#cbd5e1'}`,
          borderRadius: 16,
          padding: '60px 40px',
          textAlign: 'center',
          cursor: uploadState === 'idle' ? 'pointer' : 'default',
          transition: 'all 0.2s',
          marginBottom: 24,
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          style={{ display: 'none' }}
          onChange={handleFileInput}
        />

        {uploadState === 'idle' || uploadState === 'dragging' ? (
          <>
            <div
              style={{
                width: 64,
                height: 64,
                background: isDragging ? '#dbeafe' : '#f8fafc',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                transition: 'background 0.2s',
              }}
            >
              <Upload size={28} color={isDragging ? '#3b82f6' : '#94a3b8'} />
            </div>
            <p style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
              {isDragging ? 'Drop your file here' : 'Drag & drop your dataset'}
            </p>
            <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 20 }}>
              Supports CSV, XLSX, and XLS formats
            </p>
            <button
              style={{
                background: '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
              onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
            >
              Browse Files
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                background: '#f0fdf4',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={24} color="#22c55e" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{fileName}</p>
              <p style={{ fontSize: 13, color: '#94a3b8' }}>{fileSize} • Ready to process</p>
            </div>
            {isDone ? (
              <CheckCircle size={24} color="#22c55e" />
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); handleReset(); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <XCircle size={22} color="#94a3b8" />
              </button>
            )}
          </div>
        )}
      </div>



      {/* Processing bar */}
      {isProcessing && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Processing data…</p>
            <p style={{ fontSize: 13, color: '#94a3b8' }}>{Math.min(Math.round(progress), 100)}%</p>
          </div>
          <div style={{ background: '#f1f5f9', borderRadius: 999, height: 8, overflow: 'hidden' }}>
            <div
              style={{
                background: '#3b82f6',
                height: '100%',
                width: `${Math.min(progress, 100)}%`,
                borderRadius: 999,
                transition: 'width 0.2s ease',
              }}
            />
          </div>
          <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>
            Running data cleaning, normalization, and analytics pipeline…
          </p>
        </div>
      )}

      {/* Success */}
      {isDone && (
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: 14,
            padding: '18px 24px',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <CheckCircle size={20} color="#16a34a" />
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#15803d' }}>Data processed successfully!</p>
            <p style={{ fontSize: 13, color: '#4ade80' }}>
              5 rows × 8 columns cleaned and ingested. Head to the Dashboard to view your analytics.
            </p>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {(uploadState === 'uploaded' || isDone) && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {uploadState === 'uploaded' && (
            <button
              onClick={handleProcess}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '11px 22px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Play size={15} /> Process Data
            </button>
          )}
          <button
            onClick={handleReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#f8fafc',
              color: '#374151',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '11px 22px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={15} /> Reset
          </button>
        </div>
      )}

      {/* Preview Table */}
      {showPreview && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24, overflowX: 'auto' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>
            Data Preview <span style={{ fontSize: 12, fontWeight: 400, color: '#94a3b8', marginLeft: 8 }}>First 5 rows</span>
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                {previewData.headers.map((h) => (
                  <th
                    key={h}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#94a3b8',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase',
                      padding: '0 12px 10px',
                      textAlign: 'left',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.rows.map((row, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: '1px solid #f8fafc' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#f8fafc')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                >
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '11px 12px', fontSize: 13, color: '#374151' }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
