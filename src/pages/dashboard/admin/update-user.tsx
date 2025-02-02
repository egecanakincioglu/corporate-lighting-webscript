import UpdateUser from '@/src/components/admin/AdminSettings/UpdateUser';
import GeneralLayout from '@/src/layouts/GeneralLayout';

import React from 'react';

const UserUpdate: React.FC = () => {
  return (
    <GeneralLayout>
        <UpdateUser />
    </GeneralLayout>
  );
};

export default UserUpdate;