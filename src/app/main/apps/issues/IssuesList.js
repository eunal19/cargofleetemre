import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './IssuesMultiSelectMenu';
import ContactsTable from './IssuesTable';
import { openEditContactDialog, selectContacts, removeContact } from './store/issuesSlice';

const formatData = issues =>
  issues.map(issue => {
    return {
      ...issue
    };
  });

function IssuesList(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: 'Vehicle dropdown',
        accessor: 'vehicle.brand',
        className: 'font-medium',
        sortable: true
      },
      {
        Header: 'Title',
        accessor: 'title',
        sortable: true
      },
      {
        Header: 'Due data',
        accessor: 'due_date',
        sortable: true
      },
      {
        Header: 'Priority',
        accessor: 'priority',
        sortable: true
      },
      {
        Header: 'Actions',
        id: 'action',
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <Button
              color="primary"
              onClick={ev => {
                ev.stopPropagation();
                dispatch(openEditContactDialog(row.original));
              }}
            >
              Edit
            </Button>
            <Button
              onClick={ev => {
                ev.stopPropagation();
                dispatch(removeContact(row.original.id));
              }}
            >
              Delete
            </Button>
          </div>
        )
      }
    ],
    // eslint-disable-next-line
    [dispatch, contacts]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return contacts;
      }
      return FuseUtils.filterArrayByString(contacts, _searchText);
    }

    if (contacts) {
      setFilteredData(getFilteredArray(contacts, searchText));
    }
  }, [contacts, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no issues!
        </Typography>
      </div>
    );
  }

  const formattedData = formatData(filteredData);

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
      <ContactsTable columns={columns} data={formattedData} onRowClick={(ev, row) => {}} />
    </motion.div>
  );
}

export default IssuesList;
