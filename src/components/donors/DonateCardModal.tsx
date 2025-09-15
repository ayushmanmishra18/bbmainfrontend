"use client";

import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import { getMyDonorCards, submitDonorCardTransfer } from '@/lib/api';
import { DonorCard, PatientDetails } from '@/types';

type DonateCardModalProps = {
  patient: PatientDetails | null;
  onClose: () => void;
  onSuccess: () => void;
};

const DonateCardModal = ({ patient, onClose, onSuccess }: DonateCardModalProps) => {
  const [availableCards, setAvailableCards] = useState<DonorCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (patient) {
      const loadAvailableCards = async () => {
        setIsLoading(true);
        const response = await getMyDonorCards();
        setAvailableCards(response.data.filter(card => card.status === 'Available'));
        setIsLoading(false);
      };
      loadAvailableCards();
    }
  }, [patient]);

  const handleSubmit = async () => {
    if (!selectedCardId || !patient) return;
    setIsSubmitting(true);
    try {
      await submitDonorCardTransfer(patient.id, selectedCardId);
      onSuccess();
    } catch (error) {
      console.error("Failed to submit donation", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!patient) return null;

  return (
    <Modal isOpen={!!patient} onClose={onClose} title={`Donate to ${patient.name}`}>
      <div className="space-y-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Please select one of your available donor cards to complete the donation.
        </p>
        {isLoading ? (
          <p>Loading your available cards...</p>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {availableCards.length > 0 ? (
              availableCards.map(card => (
                <div
                  key={card.id}
                  onClick={() => setSelectedCardId(card.id)}
                  className={`p-4 border rounded-md cursor-pointer transition-all ${
                    selectedCardId === card.id
                      ? 'border-blue-500 bg-blue-900/50 ring-2 ring-blue-500'
                      : 'border-gray-300 dark:border-gray-700 hover:bg-subtle dark:hover:bg-gray-700/50'
                  }`}
                >
                  <p className="font-semibold dark:text-gray-200">Unit No: {card.bloodUnitNo}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Donated on: {card.donationDate} at {card.donatedAt}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 p-4">You have no available donor cards.</p>
            )}
          </div>
        )}
        <div className="flex justify-end pt-4 space-x-3 border-t border-subtle dark:border-gray-700">
          <button type="button" onClick={onClose} className="px-6 py-2 bg-subtle text-content font-bold rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">
            Cancel
          </button>
          <button 
            type="button" 
            onClick={handleSubmit} 
            disabled={!selectedCardId || isLoading || isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Confirming...' : 'Confirm Donation'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DonateCardModal;

