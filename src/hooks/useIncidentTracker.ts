'use client';

import { useState, useEffect } from 'react';

export interface IncidentData {
  lastIncidentDate: string | null;
  daysWithoutIncident: number;
}

export const useIncidentTracker = () => {
  const [incidentData, setIncidentData] = useState<IncidentData>({
    lastIncidentDate: null,
    daysWithoutIncident: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Calculate days without incident
  const calculateDaysWithoutIncident = (lastIncidentDate: string | null): number => {
    if (!lastIncidentDate) return 0;
    
    const lastIncident = new Date(lastIncidentDate);
    const today = new Date();
    
    // Reset time to start of day for accurate calculation
    lastIncident.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const timeDiff = today.getTime() - lastIncident.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    return Math.max(0, daysDiff);
  };

  // Load data from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/incident');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            const daysWithoutIncident = calculateDaysWithoutIncident(data.lastIncidentDate);
            setIncidentData({
              lastIncidentDate: data.lastIncidentDate,
              daysWithoutIncident,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching incident data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update last incident date
  const updateLastIncidentDate = async (date: string) => {
    const daysWithoutIncident = calculateDaysWithoutIncident(date);
    const newData = {
      lastIncidentDate: date,
      daysWithoutIncident,
    };
    
    try {
      const response = await fetch('/api/incident', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      
      if (response.ok) {
        setIncidentData(newData);
      } else {
        console.error('Failed to save incident data');
      }
    } catch (error) {
      console.error('Error saving incident data:', error);
    }
  };

  // Reset incident tracker
  const resetIncidentTracker = async () => {
    const newData = {
      lastIncidentDate: null,
      daysWithoutIncident: 0,
    };
    
    try {
      const response = await fetch('/api/incident', {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setIncidentData(newData);
      } else {
        console.error('Failed to reset incident data');
      }
    } catch (error) {
      console.error('Error resetting incident data:', error);
    }
  };

  // Update days count (called periodically to keep it current)
  useEffect(() => {
    if (incidentData.lastIncidentDate) {
      const interval = setInterval(() => {
        const daysWithoutIncident = calculateDaysWithoutIncident(incidentData.lastIncidentDate);
        setIncidentData(prev => ({
          ...prev,
          daysWithoutIncident,
        }));
      }, 1000 * 60 * 60); // Update every hour

      return () => clearInterval(interval);
    }
  }, [incidentData.lastIncidentDate]);

  return {
    incidentData,
    isLoading,
    updateLastIncidentDate,
    resetIncidentTracker,
  };
};
