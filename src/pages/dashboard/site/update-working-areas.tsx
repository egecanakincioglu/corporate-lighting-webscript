import UpdateWorkAreas from '@/src/components/admin/SiteSettings/UpdateWorkingAreas';
import GeneralLayout from '@/src/layouts/GeneralLayout';

import React from 'react';

const WorkingAreasUpdate: React.FC = () => {
  return (
    <GeneralLayout>
       <UpdateWorkAreas /> 
    </GeneralLayout>
  );
};

export default WorkingAreasUpdate;