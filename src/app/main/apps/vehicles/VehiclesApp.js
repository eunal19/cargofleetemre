import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import IssueDialog from './VehicleDialog';
import ContactsHeader from './VehiclesHeader';
import ContactsList from './VehiclesList';
import reducer from './store';
import { getIssues } from './store/vehiclesSlice';
import VehicleAssignDialog from './VehicleAssignDialog';
import VehicleUnAssignDialog from './VehicleUnAssignDialog';

function IssuesApp(props) {
  const dispatch = useDispatch();

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    dispatch(getIssues(routeParams));
    // dispatch(getUserData());
  }, [dispatch, routeParams]);

  return (
    <>
      <FusePageSimple
        classes={{
          contentWrapper: 'p-0 sm:p-24 h-full',
          content: 'flex flex-col h-full',
          leftSidebar: 'w-256 border-0',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
          wrapper: 'min-h-0'
        }}
        header={<ContactsHeader pageLayout={pageLayout} />}
        content={<ContactsList />}
        // leftSidebarContent={<ContactsSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <IssueDialog />
      <VehicleAssignDialog />
      <VehicleUnAssignDialog />
    </>
  );
}

export default withReducer('contactsApp', reducer)(IssuesApp);
