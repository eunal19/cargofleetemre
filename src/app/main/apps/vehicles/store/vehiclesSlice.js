import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getIssues = createAsyncThunk('issuesApp/issues/getIssues', async (routeParams, { getState }) => {
  routeParams = routeParams || getState().contactsApp.contacts.routeParams;
  const response = await axios.get('https://mysite-h17z.onrender.com/team1/api/vehicles', {
    params: routeParams
  });
  const data = await response.data.data;

  return { data, routeParams };
});

export const addContact = createAsyncThunk(
  'vehiclesApp/vehicles/addContact',
  async (vehicle, { dispatch, getState }) => {
    const response = await axios.post('https://mysite-h17z.onrender.com/team1/api/vehicles', vehicle);
    const data = await response.data;
    console.log('ADD VEHICLE 12 OCTOBER', vehicle);

    dispatch(getIssues());

    return data;
  }
);

export const updateContact = createAsyncThunk(
  'contactsApp/contacts/updateContact',
  async (contact, { dispatch, getState }) => {
    const response = await axios.put(`https://mysite-h17z.onrender.com/team1/api/vehicles/${contact.id}`, contact);
    const data = await response.data;

    dispatch(getIssues());

    return data;
  }
);

export const assignContact = createAsyncThunk(
  'contactsApp/contacts/assignContact',
  async (contact, { dispatch, getState }) => {
    console.log('HERE I AM INSIDE ASSIGN', contact);
    const response = await axios.post(
      `https://mysite-h17z.onrender.com/team1/api/vehicles/${contact.id}/assign`,
      contact
    );
    const data = await response.data;

    dispatch(getIssues());

    return data;
  }
);

export const unAssignContact = createAsyncThunk(
  'contactsApp/contacts/unAssignContact',
  async (contact, { dispatch, getState }) => {
    console.log('HERE I AM INSIDE UN-ASSIGN', contact);
    const newContact = { ...contact, assignment_id: contact.active_assignment.id };
    const response = await axios.post(
      `https://mysite-h17z.onrender.com/team1/api/vehicles/${contact.id}/unassign`,
      newContact
    );
    const data = await response.data;

    dispatch(getIssues());

    return data;
  }
);

export const removeContact = createAsyncThunk(
  'contactsApp/contacts/removeContact',
  async (contactId, { dispatch, getState }) => {
    await axios.delete(`https://mysite-h17z.onrender.com/team1/api/vehicles/${contactId}`);

    return contactId;
  }
);

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactsById } = contactsAdapter.getSelectors(
  state => state.contactsApp.contacts
);

const contactsSlice = createSlice({
  name: 'contactsApp/contacts',
  initialState: contactsAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    contactDialog: {
      type: 'new',
      props: {
        open: false
      },
      data: null
    },
    assignDialog: {
      type: 'assign',
      props: {
        open: false
      },
      data: null
    },
    unassignDialog: {
      type: 'assign',
      props: {
        open: false
      },
      data: null
    }
  }),
  reducers: {
    setContactsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: event => ({ payload: event.target.value || '' })
    },
    openNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'new',
        props: {
          open: true
        },
        data: null
      };
    },
    closeNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'new',
        props: {
          open: false
        },
        data: null
      };
    },
    openEditContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'edit',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeEditContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'edit',
        props: {
          open: false
        },
        data: null
      };
    },
    openAssignContactDialog: (state, action) => {
      state.assignDialog = {
        type: 'assign',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeAssignContactDialog: (state, action) => {
      state.assignDialog = {
        type: 'assign',
        props: {
          open: false
        },
        data: null
      };
    },
    openUnAssignContactDialog: (state, action) => {
      state.unassignDialog = {
        type: 'unassign',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeUnAssignContactDialog: (state, action) => {
      state.unassignDialog = {
        type: 'unassign',
        props: {
          open: false
        },
        data: null
      };
    }
  },
  extraReducers: {
    [updateContact.fulfilled]: contactsAdapter.upsertOne,
    [assignContact.fulfilled]: contactsAdapter.upsertOne,
    [addContact.fulfilled]: contactsAdapter.addOne,
    // [removeContacts.fulfilled]: (state, action) => contactsAdapter.removeMany(state, action.payload),
    [removeContact.fulfilled]: (state, action) => contactsAdapter.removeOne(state, action.payload),
    [getIssues.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      contactsAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    }
  }
});

export const {
  setContactsSearchText,
  openNewContactDialog,
  closeNewContactDialog,
  openEditContactDialog,
  openAssignContactDialog,
  closeAssignContactDialog,
  openUnAssignContactDialog,
  closeUnAssignContactDialog,
  closeEditContactDialog
} = contactsSlice.actions;

export default contactsSlice.reducer;
