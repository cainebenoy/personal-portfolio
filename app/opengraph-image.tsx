import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Caine Benoy - Generalist Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  // We use standard fetch for fonts in Edge runtime
  const fontData = await fetch(new URL('https://fonts.gstatic.com/s/abrilfatface/v19/zOL64pLDlL1D99S8g8PtiKchm-BsjQ.ttf', import.meta.url)).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: '#f4f1ea',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '20px solid #2b2b2b',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 30, fontFamily: 'serif', color: '#666', marginBottom: 20 }}>
            THE LIVING SKETCHBOOK
          </div>
          <div style={{ fontSize: 120, fontFamily: 'serif', color: '#2b2b2b', lineHeight: 0.9 }}>
            CAINE
          </div>
          <div style={{ fontSize: 120, fontFamily: 'serif', color: '#2b2b2b', lineHeight: 0.9 }}>
            BENOY
          </div>
          <div 
            style={{ 
              marginTop: 40, 
              padding: '10px 30px', 
              background: '#ff4757', 
              color: 'white', 
              fontSize: 30, 
              borderRadius: 50,
              transform: 'rotate(-2deg)' 
            }}
          >
            Full Stack • Blockchain • AI
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: 20, color: '#aaa' }}>
          caine.dev
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Abril Fatface',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}