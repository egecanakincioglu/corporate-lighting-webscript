
import FavoriteProducts from '@/src/components/admin/SiteSettings/UpdateFavorites';
import GeneralLayout from '@/src/layouts/GeneralLayout';

import React from 'react';

const FavoriteUpdate: React.FC = () => {
  return (
    <GeneralLayout>
      <FavoriteProducts />
    </GeneralLayout>
  );
};

export default FavoriteUpdate;