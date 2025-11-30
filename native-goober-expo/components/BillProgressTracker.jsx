import React from 'react';

const BillProgressTracker = ({ billStatus }) => {
  const stages = [
    { id: 'introduced', label: 'Introduced', chamber: 'house' },
    { id: 'house_committee', label: 'House Committee', chamber: 'house' },
    { id: 'house_floor', label: 'House Floor Vote', chamber: 'house' },
    { id: 'passed_house', label: 'Passed House', chamber: 'house' },
    { id: 'senate_received', label: 'Received in Senate', chamber: 'senate' },
    { id: 'senate_committee', label: 'Senate Committee', chamber: 'senate' },
    { id: 'senate_floor', label: 'Senate Floor Vote', chamber: 'senate' },
    { id: 'passed_senate', label: 'Passed Senate', chamber: 'senate' },
    { id: 'conference', label: 'Conference Committee', chamber: 'both' },
    { id: 'president', label: 'To President', chamber: 'executive' },
    { id: 'law', label: 'Became Law', chamber: 'executive' }
  ];

  const currentStageIndex = stages.findIndex(s => s.id === billStatus.currentStage);

  const getChamberColor = (chamber) => {
    switch(chamber) {
      case 'house': return 'bg-blue-500';
      case 'senate': return 'bg-red-500';
      case 'both': return 'bg-purple-500';
      case 'executive': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
          />
        </div>

        {/* Stage markers */}
        {stages.map((stage, index) => {
          const isComplete = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          
          return (
            <div key={stage.id} className="flex flex-col items-center relative z-10">
              <div 
                className={`w-10 h-10 rounded-full border-4 border-white flex items-center justify-center transition-all
                  ${isComplete ? getChamberColor(stage.chamber) : ''}
                  ${isCurrent ? getChamberColor(stage.chamber) + ' ring-4 ring-blue-300' : ''}
                  ${!isComplete && !isCurrent ? 'bg-gray-200' : ''}`}
              >
                {isComplete && (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className={`mt-2 text-xs text-center max-w-20 ${isCurrent ? 'font-bold' : ''}`}>
                {stage.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current status detail */}
      {billStatus.lastAction && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-semibold">Last Action:</p>
          <p className="text-sm text-gray-700">{billStatus.lastAction}</p>
          <p className="text-xs text-gray-500 mt-1">{billStatus.lastActionDate}</p>
        </div>
      )}
    </div>
  );
};

export default BillProgressTracker;

