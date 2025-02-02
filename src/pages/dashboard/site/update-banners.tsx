
import UpdateBanners from '@/src/components/admin/SiteSettings/UpdateBanners';
import GeneralLayout from '@/src/layouts/GeneralLayout';

import React from 'react';

const BannerUpdate: React.FC = () => {
  return (
    <GeneralLayout>
      <UpdateBanners />
    </GeneralLayout>
  );
};

export default BannerUpdate;