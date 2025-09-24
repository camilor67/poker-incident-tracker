'use client';

import { useState } from 'react';
import { useIncidentTracker } from '@/hooks/useIncidentTracker';

export default function IncidentTracker() {
  const { incidentData, isLoading, updateLastIncidentDate, resetIncidentTracker } = useIncidentTracker();
  const [selectedDate, setSelectedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      await updateLastIncidentDate(selectedDate);
      setSelectedDate('');
      setShowDatePicker(false);
    }
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset the incident tracker? This will clear all data.')) {
      await resetIncidentTracker();
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No incidents recorded';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🃏 Poker Tournament
          </h1>
          <h2 className="text-3xl font-semibold text-gray-600 mb-2">
            Days Without Incident
          </h2>
          <p className="text-gray-500 text-lg">
            Track your clean tournament runs
          </p>
        </div>

        {/* Main Counter */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8 text-center">
          <div className="mb-8">
            <div className="text-8xl font-bold text-green-500 mb-4">
              {incidentData.daysWithoutIncident}
            </div>
            <div className="text-2xl text-gray-600 font-medium">
              {incidentData.daysWithoutIncident === 1 ? 'Day' : 'Days'}
            </div>
          </div>

          <div className="text-lg text-gray-500 mb-8">
            Last incident: <span className="font-semibold text-gray-700">
              {formatDate(incidentData.lastIncidentDate)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {incidentData.lastIncidentDate ? 'Update Last Incident' : 'Record First Incident'}
            </button>
            
            {incidentData.lastIncidentDate && (
              <button
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Reset Tracker
              </button>
            )}
          </div>
        </div>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {incidentData.lastIncidentDate ? 'Update Last Incident Date' : 'Record Incident Date'}
              </h3>
              
              <form onSubmit={handleDateSubmit} className="space-y-6">
                <div>
                  <label htmlFor="incident-date" className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Date
                  </label>
                  <input
                    type="date"
                    id="incident-date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowDatePicker(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 rounded-xl transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Tournament Statistics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {incidentData.daysWithoutIncident}
              </div>
              <div className="text-gray-600 font-medium">Current Streak</div>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {incidentData.lastIncidentDate ? '1' : '0'}
              </div>
              <div className="text-gray-600 font-medium">Incidents Recorded</div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {incidentData.daysWithoutIncident > 0 ? '🟢' : '🔴'}
              </div>
              <div className="text-gray-600 font-medium">Status</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Keep your tournament runs clean! 🎯</p>
        </div>
      </div>
    </div>
  );
}
