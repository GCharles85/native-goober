import React from 'react';

type StageStatus = 'completed' | 'current' | 'pending';

type BillStagesTrackerProps = {
  currentStageIndex?: number;
};

const stages = [
  { name: 'Introduction', icon: 'document' },
  { name: 'Committee', icon: 'people' },
  { name: 'Floor Vote', icon: 'gavel' },
  { name: 'Other Chamber', icon: 'building' },
  { name: 'Conference', icon: 'handshake' },
  { name: 'President', icon: 'pen' },
];

const getColor = (status: StageStatus) => {
  if (status === 'completed') return '#22c55e';
  if (status === 'current') return '#3b82f6';
  return '#9ca3af';
};

const Icon = ({ type, color }: { type: string; color: string }) => {
  const icons: Record<string, React.ReactNode> = {
    document: (
      <>
        <rect x="8" y="4" width="16" height="22" rx="2" stroke={color} strokeWidth="2" fill="none" />
        <line x1="12" y1="10" x2="20" y2="10" stroke={color} strokeWidth="2" />
        <line x1="12" y1="15" x2="20" y2="15" stroke={color} strokeWidth="2" />
        <line x1="12" y1="20" x2="17" y2="20" stroke={color} strokeWidth="2" />
      </>
    ),
    people: (
      <>
        <circle cx="10" cy="10" r="4" stroke={color} strokeWidth="2" fill="none" />
        <circle cx="22" cy="10" r="4" stroke={color} strokeWidth="2" fill="none" />
        <path d="M4 26 Q4 18 10 18 Q16 18 16 26" stroke={color} strokeWidth="2" fill="none" />
        <path d="M16 26 Q16 18 22 18 Q28 18 28 26" stroke={color} strokeWidth="2" fill="none" />
      </>
    ),
    gavel: (
      <>
        <rect x="6" y="22" width="20" height="4" rx="1" stroke={color} strokeWidth="2" fill="none" />
        <rect x="10" y="10" width="12" height="6" rx="2" stroke={color} strokeWidth="2" fill="none" transform="rotate(-45 16 13)" />
        <line x1="16" y1="16" x2="16" y2="22" stroke={color} strokeWidth="2" />
      </>
    ),
    building: (
      <>
        <rect x="8" y="12" width="16" height="14" stroke={color} strokeWidth="2" fill="none" />
        <polygon points="16,4 6,12 26,12" stroke={color} strokeWidth="2" fill="none" />
        <line x1="12" y1="18" x2="12" y2="26" stroke={color} strokeWidth="2" />
        <line x1="20" y1="18" x2="20" y2="26" stroke={color} strokeWidth="2" />
      </>
    ),
    handshake: (
      <>
        <path d="M6 16 L12 12 L16 16 L20 12 L26 16" stroke={color} strokeWidth="2" fill="none" />
        <path d="M8 16 L8 22 L14 22" stroke={color} strokeWidth="2" fill="none" />
        <path d="M24 16 L24 22 L18 22" stroke={color} strokeWidth="2" fill="none" />
      </>
    ),
    pen: (
      <>
        <path d="M8 24 L20 8 L24 12 L12 28 Z" stroke={color} strokeWidth="2" fill="none" />
        <line x1="16" y1="12" x2="20" y2="16" stroke={color} strokeWidth="2" />
        <line x1="6" y1="26" x2="10" y2="26" stroke={color} strokeWidth="2" />
      </>
    ),
  };

  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      {icons[type]}
    </svg>
  );
};

export const BillStagesTracker: React.FC<BillStagesTrackerProps> = ({ 
  currentStageIndex = 0 
}) => {
  const getStatus = (index: number): StageStatus => {
    if (index < currentStageIndex) return 'completed';
    if (index === currentStageIndex) return 'current';
    return 'pending';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
      {stages.map((stage, index) => {
        const status = getStatus(index);
        const color = getColor(status);
        
        return (
          <div key={stage.name} style={{ textAlign: 'center' }}>
            <Icon type={stage.icon} color={color} />
            <div style={{ fontSize: '12px', color, marginTop: '4px' }}>
              {stage.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BillStagesTracker;