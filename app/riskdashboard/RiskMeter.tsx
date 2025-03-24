import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface RiskMeterProps {
  value: number; // 0-100
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ value }) => {
  // Determine color based on risk level
  const getColor = () => {
    if (value < 30) return 'text-green-500';
    if (value < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Determine risk level label
  const getRiskLabel = () => {
    if (value < 30) return 'Low Risk';
    if (value < 70) return 'Medium Risk';
    return 'High Risk';
  };

  // Calculate rotation angle for the needle (from -90 to 90 degrees)
  const needleRotation = -90 + (value / 100) * 180;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-24 mb-4">
        {/* Semicircle background */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-t-full"></div>
        
        {/* White overlay to create the "gauge" look */}
        <div className="absolute inset-0 rounded-t-full" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 95%, 0 95%)' }}></div>
        
        {/* Needle */}
        <div 
          className="absolute bottom-0 left-1/2 w-1 h-20 bg-gray-800 origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
        ></div>
        
        {/* Center pin */}
        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gray-800 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        
        {/* Value markers */}
        <div className="absolute bottom-1 left-0 text-xs">0</div>
        <div className="absolute bottom-1 left-1/2 text-xs transform -translate-x-1/2">50</div>
        <div className="absolute bottom-1 right-0 text-xs">100</div>
      </div>
      
      <div className={`text-2xl font-bold mb-1 ${getColor()}`}>
        {getRiskLabel()}
      </div>
      
      <div className="flex items-center">
        <AlertTriangle className={`h-5 w-5 mr-2 ${getColor()}`} />
        <span className="text-gray-600">Risk Score: {value}</span>
      </div>
    </div>
  );
};
