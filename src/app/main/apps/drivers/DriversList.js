import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
// import Avatar from '@material-ui/core/Avatar';
// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import DriversMultiSelectMenu from './DriversMultiSelectMenu';
// import DriversTable from './DriversTable';
// import { openEditDriverDialog, removeDriver, toggleStarredDriver, selectDrivers } from './store/driversSlice';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// import { original } from '@reduxjs/toolkit';
import { openEditDriverDialog, removeDriver, selectDrivers, updateDriver } from './store/driversSlice';

const formatData = drivers =>
  drivers.map(driver => {
    return {
      ...driver
    };
  });

function DriversList(props) {
  const dispatch = useDispatch();
  const drivers = useSelector(selectDrivers);
  const searchText = useSelector(({ driversApp }) => driversApp.drivers.searchText);
  // const user = useSelector(({ driversApp }) => driversApp.user);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      // {
      //   id: 'action',
      //   width: 128,
      //   sortable: false,
      //   Cell: ({ row }) => (
      //     <div className="flex items-center">
      //       <IconButton
      //         onClick={ev => {
      //           ev.stopPropagation();
      //           dispatch(toggleStarredDriver(row.original.id));
      //         }}
      //       >
      //         {user.starred && user.starred.includes(row.original.id) ? (
      //           <Icon className="text-yellow-700">star</Icon>
      //         ) : (
      //           <Icon>star_border</Icon>
      //         )}
      //       </IconButton>
      //       {/* <IconButton
      //         onClick={ev => {
      //           ev.stopPropagation();
      //           dispatch(removeDriver(row.original.id));
      //         }}
      //       >
      //         <Icon>delete</Icon>
      //       </IconButton> */}
      //     </div>
      //   )
      // }
    ],
    // eslint-disable-next-line
    [dispatch, drivers]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return drivers;
      }
      return FuseUtils.filterArrayByString(drivers, _searchText);
    }

    if (drivers) {
      setFilteredData(getFilteredArray(drivers, searchText));
    }
  }, [drivers, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no drivers!
        </Typography>
      </div>
    );
  }

  const formattedData = formatData(filteredData);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '0px',
        justifyContent: 'space-around',
        rowGap: '15px'
      }}
    >
      {formattedData.map(driver => {
        return (
          <Card
            key={driver.id}
            style={{
              margin: '0px',
              width: '35em'
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                <strong>
                  {driver?.first_name} {driver?.last_name}{' '}
                </strong>
              </Typography>
              <br />
              <Typography variant="body2">
                <strong>Driver license: </strong>
                {driver?.license_number} <strong style={{ marginLeft: '1em' }}>state: </strong>
                {driver?.license_state} <strong style={{ marginLeft: '1em' }}>class: </strong>
                {driver?.license_class}
                <hr />
                <strong>Birth date: </strong>
                {driver?.birth_date}
                <hr />
                <strong>Address: </strong>
                {driver?.address1} {driver?.address2}, {driver?.city}, {driver?.state},
                <br />
                {driver?.country}, {driver?.postal_code}
                <hr />
                <strong>tel: </strong>
                {driver?.phone_number}
                <hr />
                <strong>email: </strong>
                {driver?.email}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={e => {
                  e.stopPropagation();
                  dispatch(openEditDriverDialog(driver));
                }}
                size="medium"
                variant="outlined"
                color="primary"
              >
                Edit
              </Button>

              <Button
                onClick={e => {
                  e.stopPropagation();
                  dispatch(removeDriver(driver.id));
                }}
                size="medium"
                variant="outlined"
                color="primary"
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </motion.div>
  );
}

export default DriversList;
