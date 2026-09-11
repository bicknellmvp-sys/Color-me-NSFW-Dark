import React, { useRef, useState, useEffect } from 'react';
import { X, Palette, Paintbrush, Eraser, RotateCcw, Download, Printer, Layers, Sparkles, Check } from 'lucide-react';
import { ArchiveVolume } from '../types';
import { SVG_BOUND_FORM, SVG_BASEMENT_PROTOCOL, SVG_OBSIDIAN_SILK, SVG_SOLOMONIC_DEMON } from '../data/volumes';

interface DigitalColoringStudioProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVolume?: ArchiveVolume | null;
  customPlate?: { svgUri: string; title: string } | null;
}

const PALETTES = [
  {
    name: 'Blood & Obsidian',
    colors: ['#e60026', '#930014', '#410004', '#131313', '#2a2a2a', '#5e3f3c', '#ffb3ae', '#ffffff']
  },
  {
    name: 'Gothic Gold',
    colors: ['#d4af37', '#aa7c11', '#573d00', '#1c1b1b', '#353534', '#e0e0e0', '#8bceff', '#004b6f']
  },
  {
    name: 'Crimson Dusk',
    colors: ['#ff0055', '#7a0026', '#ffb4ab', '#0e0e0e', '#201f1f', '#474746', '#c8c6c5', '#ffdad6']
  }
];

export const DigitalColoringStudio: React.FC<DigitalColoringStudioProps> = ({
  isOpen,
  onClose,
  selectedVolume,
  customPlate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState('#e60026');
  const [brushSize, setBrushSize] = useState(12);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [isDrawing, setIsDrawing] = useState(false);
  const [template, setTemplate] = useState<string>('bound-form');
  const [activePaletteIndex, setActivePaletteIndex] = useState(0);
  const [history, setHistory] = useState<ImageData[]>([]);

  // Selected line art template images
  const templates = [
    {
      id: 'bound-form',
      name: 'The Bound Form (Vol. 01)',
      src: SVG_BOUND_FORM
    },
    {
      id: 'basement-protocol',
      name: 'Basement Protocol (Vol. 02)',
      src: SVG_BASEMENT_PROTOCOL
    },
    {
      id: 'obsidian-silk',
      name: 'Obsidian & Silk (Vol. 03)',
      src: SVG_OBSIDIAN_SILK
    },
    {
      id: 'solomonic-sigil',
      name: 'Ritual Demon Sigil (Ritual Vol.)',
      src: SVG_SOLOMONIC_DEMON
    }
  ];

  // Initialize canvas with line art template or custom plate
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgSrc = customPlate ? customPlate.svgUri : (templates.find((t) => t.id === template)?.src || SVG_BOUND_FORM);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgSrc;

    img.onload = () => {
      canvas.width = 600;
      canvas.height = 600;

      // Fill dark background
      ctx.fillStyle = '#0c0c0c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw line art image mix-blend screen / multiply
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Save initial snapshot to history
      const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([snapshot]);
    };
  }, [isOpen, template, customPlate]);

  if (!isOpen) return null;

  // Drawing logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    // Save state to history
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory((prev) => [...prev.slice(-10), snapshot]);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'screen';
      ctx.strokeStyle = selectedColor;
    }

    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  };

  const handleClear = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentTpl = templates.find((t) => t.id === template) || templates[0];
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentTpl.src;
    img.onload = () => {
      ctx.fillStyle = '#0c0c0c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  const handleUndo = () => {
    if (history.length <= 1 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = history.slice(0, -1);
    const lastState = newHistory[newHistory.length - 1];
    ctx.putImageData(lastState, 0, 0);
    setHistory(newHistory);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `ColorMeNSFW-${template}-artwork.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Studio Container */}
      <div className="relative w-full max-w-5xl bg-[#0c0c0c] border border-[#333333] h-[92vh] flex flex-col z-10 shadow-2xl overflow-hidden">
        {/* Studio Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333] bg-[#131313]">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-[#e60026]" />
            <h2 className="font-headline text-xl text-[#e0e0e0] uppercase font-bold tracking-tight">
              Digital Ink Studio
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleUndo}
              disabled={history.length <= 1}
              className="p-2 border border-[#333333] text-[#b0b0b0] hover:text-[#e60026] hover:border-[#e60026] transition-colors disabled:opacity-40"
              title="Undo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleClear}
              className="px-3 py-1.5 border border-[#333333] text-xs font-mono text-[#b0b0b0] hover:text-[#e60026] hover:border-[#e60026] transition-colors"
            >
              Reset Canvas
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-1.5 bg-[#e60026] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export Artwork</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#b0b0b0] hover:text-[#e60026] transition-colors ml-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-4 overflow-hidden">
          {/* Controls Sidebar Left */}
          <div className="p-4 border-b md:border-b-0 md:border-r border-[#333333] bg-[#1c1b1b] flex flex-col gap-6 overflow-y-auto">
            {/* Template Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase text-[#e60026] font-bold">
                  1. Select Line Art
                </label>
                <label className="cursor-pointer text-[10px] font-mono uppercase text-[#ffb3ae] bg-[#e60026]/20 hover:bg-[#e60026] hover:text-white px-2 py-0.5 border border-[#e60026]/40 transition-colors flex items-center gap-1">
                  <span>+ Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          if (evt.target?.result) {
                            const dataUrl = evt.target.result as string;
                            if (canvasRef.current) {
                              const canvas = canvasRef.current;
                              const ctx = canvas.getContext('2d');
                              if (ctx) {
                                const img = new Image();
                                img.src = dataUrl;
                                img.onload = () => {
                                  ctx.fillStyle = '#0c0c0c';
                                  ctx.fillRect(0, 0, canvas.width, canvas.height);
                                  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                                  const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
                                  setHistory([snapshot]);
                                };
                              }
                            }
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
              <div className="flex flex-col gap-2">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setTemplate(tpl.id)}
                    className={`p-2.5 text-left text-xs font-inter border transition-all flex items-center justify-between ${
                      template === tpl.id
                        ? 'border-[#e60026] bg-[#201f1f] text-white font-semibold'
                        : 'border-[#333333] text-[#b0b0b0] hover:border-[#e60026]/50'
                    }`}
                  >
                    <span className="truncate">{tpl.name}</span>
                    {template === tpl.id && <Check className="w-3.5 h-3.5 text-[#e60026] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Tool & Brush Size */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#e60026] font-bold mb-2">
                2. Drawing Instrument
              </label>
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setTool('brush')}
                  className={`flex-1 py-2 text-xs uppercase font-semibold flex items-center justify-center gap-1.5 border transition-colors ${
                    tool === 'brush'
                      ? 'border-[#e60026] bg-[#e60026] text-white'
                      : 'border-[#333333] bg-black text-[#b0b0b0]'
                  }`}
                >
                  <Paintbrush className="w-3.5 h-3.5" />
                  <span>Brush</span>
                </button>
                <button
                  onClick={() => setTool('eraser')}
                  className={`flex-1 py-2 text-xs uppercase font-semibold flex items-center justify-center gap-1.5 border transition-colors ${
                    tool === 'eraser'
                      ? 'border-[#e60026] bg-[#e60026] text-white'
                      : 'border-[#333333] bg-black text-[#b0b0b0]'
                  }`}
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span>Eraser</span>
                </button>
              </div>

              {/* Size Slider */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px] font-mono text-[#b0b0b0]">
                  <span>Brush Size</span>
                  <span>{brushSize}px</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full accent-[#e60026] bg-[#333333]"
                />
              </div>
            </div>

            {/* Palettes */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#e60026] font-bold mb-2">
                3. Dark Palette Swatches
              </label>
              <div className="flex flex-col gap-3">
                {PALETTES.map((pal, pIdx) => (
                  <div key={pIdx} className="flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase font-mono text-[#808080]">
                      {pal.name}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {pal.colors.map((c, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => {
                            setSelectedColor(c);
                            setTool('brush');
                          }}
                          className={`w-6 h-6 border transition-transform ${
                            selectedColor === c && tool === 'brush'
                              ? 'scale-125 border-white ring-2 ring-[#e60026] z-10'
                              : 'border-[#333333] hover:scale-110'
                          }`}
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Canvas Workspace Center */}
          <div className="col-span-3 bg-black flex items-center justify-center p-4 relative overflow-hidden">
            <div className="relative border border-[#333333] shadow-2xl max-w-full max-h-full">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
                className="cursor-crosshair bg-[#0c0c0c] touch-none max-w-full h-auto max-h-[75vh]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
