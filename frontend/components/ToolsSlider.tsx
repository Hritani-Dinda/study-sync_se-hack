'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './ToolsSlider.module.css';

const ToolsSlider = () => {
  const [sliderOpen, setSliderOpen] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<'pen' | 'eraser'>('pen');
  const [displayValue, setDisplayValue] = useState('0');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const prevPosRef = useRef<{ x: number; y: number } | null>(null);

  // Resize & setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scaleCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    scaleCanvas();
    ctxRef.current = ctx;

    window.addEventListener('resize', scaleCanvas);
    return () => window.removeEventListener('resize', scaleCanvas);
  }, []);

  // Canvas draw
  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0];
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    } else {
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
  };

  const startDrawing = (e: any) => {
    const pos = getPos(e);
    prevPosRef.current = pos;
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing || !ctxRef.current || !canvasRef.current) return;

    const pos = getPos(e);
    const ctx = ctxRef.current;

    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 20;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
    }

    ctx.beginPath();
    ctx.moveTo(prevPosRef.current!.x, prevPosRef.current!.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    prevPosRef.current = pos;
  };

  const endDrawing = () => {
    setIsDrawing(false);
    prevPosRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Calculator
  const appendToDisplay = (value: string) => {
    setDisplayValue(prev => (prev === '0' ? value : prev + value));
  };

  const clearCalculator = () => setDisplayValue('0');

  const deleteLastChar = () =>
    setDisplayValue(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));

  const calculateResult = () => {
    try {
      const result = new Function(`return ${displayValue}`)();
      setDisplayValue(String(result));
    } catch {
      setDisplayValue('Error');
    }
  };

  return (
    <>
      <div
        className={`${styles.sliderTab} ${sliderOpen ? styles.open : ''}`}
        onClick={() => setSliderOpen(!sliderOpen)}
      >
        <div className={styles.tabIcon}>🧮</div>
        <div className={styles.tabIcon}>✏️</div>
      </div>

      <div className={`${styles.slider} ${sliderOpen ? styles.open : ''}`}>
        <div className={styles.sliderContent}>
          <h2>Tools</h2>

          <div className={styles.whiteboard}>
            <div className={styles.toolbar}>
              <div>
                <button
                  onClick={() => setCurrentTool('pen')}
                  className={currentTool === 'pen' ? styles.active : ''}
                >
                  ✏️ Pen
                </button>
                <button
                  onClick={() => setCurrentTool('eraser')}
                  className={currentTool === 'eraser' ? styles.active : ''}
                >
                  🧽 Eraser
                </button>
              </div>
              <button onClick={clearCanvas}>Clear</button>
            </div>

            <canvas
              ref={canvasRef}
              className={styles.canvas}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={endDrawing}
            />
          </div>

          <div className={styles.calculator}>
            <div className={styles.calculatorDisplay}>{displayValue}</div>
            <div className={styles.calculatorButtons}>
              <button onClick={clearCalculator}>C</button>
              <button onClick={() => appendToDisplay('/')}>÷</button>
              <button onClick={() => appendToDisplay('*')}>×</button>
              <button onClick={deleteLastChar}>⌫</button>

              {['7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3'].map((val) => (
                <button key={val} onClick={() => appendToDisplay(val)}>
                  {val}
                </button>
              ))}

              <button onClick={() => appendToDisplay('0')} className={styles.span2}>0</button>
              <button onClick={() => appendToDisplay('.')}>.</button>
              <button onClick={calculateResult}>=</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolsSlider;
