import UpdateAdBanners from '@/src/components/admin/SiteSettings/UpdateAds';
import GeneralLayout from '@/src/layouts/GeneralLayout';

import React from 'react';

const AdsUpdate: React.FC = () => {
  return (
    <GeneralLayout>
        <UpdateAdBanners />
    </GeneralLayout>
  );
};

export default AdsUpdate;