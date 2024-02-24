// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setDriversUnstarred, setDriversStarred, removeDrivers } from './store/driversSlice';

// function DriversMultiSelectMenu(props) {
//   const dispatch = useDispatch();
//   const { selectedDriverIds } = props;

//   const [anchorEl, setAnchorEl] = useState(null);

//   function openSelectedDriverMenu(event) {
//     setAnchorEl(event.currentTarget);
//   }

//   function closeSelectedDriversMenu() {
//     setAnchorEl(null);
//   }

//   return (
//     <>
//       <IconButton
//         className="p-0"
//         aria-owns={anchorEl ? 'selectedDriversMenu' : null}
//         aria-haspopup="true"
//         onClick={openSelectedDriverMenu}
//       >
//         <Icon>more_horiz</Icon>
//       </IconButton>
//       <Menu id="selectedDriversMenu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeSelectedDriversMenu}>
//         <MenuList>
//           <MenuItem
//             onClick={() => {
//               dispatch(removeDrivers(selectedDriverIds));
//               closeSelectedDriversMenu();
//             }}
//           >
//             <ListItemIcon className="min-w-40">
//               <Icon>delete</Icon>
//             </ListItemIcon>
//             <ListItemText primary="Remove" />
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               dispatch(setDriversStarred(selectedDriverIds));
//               closeSelectedDriversMenu();
//             }}
//           >
//             <ListItemIcon className="min-w-40">
//               <Icon>star</Icon>
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               dispatch(setDriversUnstarred(selectedDriverIds));
//               closeSelectedDriversMenu();
//             }}
//           >
//             <ListItemIcon className="min-w-40">
//               <Icon>star_border</Icon>
//             </ListItemIcon>
//             <ListItemText primary="Unstarred" />
//           </MenuItem>
//         </MenuList>
//       </Menu>
//     </>
//   );
// }

// export default DriversMultiSelectMenu;
