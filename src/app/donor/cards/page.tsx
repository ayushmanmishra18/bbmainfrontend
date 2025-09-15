"use client";

import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { getMyDonorCards } from '@/lib/api';
import { DonorCard } from '@/types';
import { CheckCircle, XCircle, Clock, Gift } from 'lucide-react';
import Link from 'next/link';

const statusInfo = {
  Available: { icon: <CheckCircle className="text-green-500" />, color: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-700 dark:text-green-300' },
  Used: { icon: <XCircle className="text-gray-500" />, color: 'bg-gray-100 dark:bg-gray-700/50', text: 'text-gray-600 dark:text-gray-400' },
  Expired: { icon: <Clock className="text-amber-500" />, color: 'bg-amber-100 dark:bg-amber-900/50', text: 'text-amber-700 dark:text-amber-300' },
};

const MyDonorCardsPage = () => {
  const [cards, setCards] = useState<DonorCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      setIsLoading(true);
      try {
        const response = await getMyDonorCards();
        setCards(response.data);
      } catch (error) {
        console.error("Failed to load donor cards:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCards();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-content dark:text-gray-200">My Donor Cards</h1>
        <Link href="/donor/patients">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
            <Gift className="w-4 h-4" />
            <span>Donate a Card</span>
          </button>
        </Link>
      </div>
      
      {isLoading ? (
        <p className="dark:text-gray-400">Loading your cards...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(card => (
            <Card key={card.id} className="flex flex-col justify-between !p-0 overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-400">DONOR CARD</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo[card.status].color} ${statusInfo[card.status].text}`}>
                    {statusInfo[card.status].icon}
                    <span className="ml-1.5">{card.status}</span>
                  </span>
                </div>
                <p className="text-lg font-bold text-content dark:text-gray-200 mt-4">Unit No: {card.bloodUnitNo}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">ID: {card.id}</p>
              </div>
              <div className="mt-4 pt-4 p-5 border-t bg-subtle/50 dark:bg-gray-900/50 border-subtle dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">Donated on: {card.donationDate}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">At: {card.donatedAt}</p>
                {card.status === 'Used' && (
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Used for Patient ID: {card.usedForPatientId}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonorCardsPage;
