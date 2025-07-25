import { useState } from 'react';
import CampaignSelection from '@/components/campaign/CampaignSelection';
import CampaignCreation from '@/components/campaign/CampaignCreation';
import CampaignDashboard from '@/components/campaign/CampaignDashboard';
import { useToast } from '@/hooks/use-toast';

interface Campaign {
  id: string;
  name: string;
  type: 'B2B' | 'B2C';
  cards: number;
  status: 'active' | 'pending' | 'completed';
  createdDate: string;
}

type ViewState = 'selection' | 'creation' | 'dashboard';

export default function CardInventory() {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<ViewState>('selection');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const handleSelectCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setCurrentView('dashboard');
  };

  const handleCreateNew = () => {
    setCurrentView('creation');
  };

  const handleEditCampaign = (campaign: Campaign) => {
    toast({
      title: "Edit Campaign",
      description: `แก้ไข campaign: ${campaign.name}`
    });
  };

  const handleDeleteCampaign = (campaignId: string) => {
    toast({
      title: "Delete Campaign",
      description: `ลบ campaign: ${campaignId}`,
      variant: "destructive"
    });
  };

  const handleSaveCampaign = (campaignData: any) => {
    // Here you would typically save to your backend
    console.log('Saving campaign:', campaignData);
    setCurrentView('selection');
  };

  const handleBackToSelection = () => {
    setCurrentView('selection');
    setSelectedCampaign(null);
  };

  if (currentView === 'creation') {
    return (
      <CampaignCreation
        onBack={handleBackToSelection}
        onSave={handleSaveCampaign}
      />
    );
  }

  if (currentView === 'dashboard' && selectedCampaign) {
    return (
      <CampaignDashboard
        selectedCampaign={selectedCampaign}
        onBack={handleBackToSelection}
      />
    );
  }

  return (
    <CampaignSelection
      onSelectCampaign={handleSelectCampaign}
      onCreateNew={handleCreateNew}
      onEditCampaign={handleEditCampaign}
      onDeleteCampaign={handleDeleteCampaign}
    />
  );
}