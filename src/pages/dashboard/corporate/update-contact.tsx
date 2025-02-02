import GeneralLayout from '@/src/layouts/GeneralLayout';
import React from 'react';
import UpdateContact from '@/src/components/admin/CorporateSettings/UpdateContact';

const EditContact: React.FC = () => {
  return (
    <GeneralLayout>
      <UpdateContact />
    </GeneralLayout>
  );
};

export default EditContact;