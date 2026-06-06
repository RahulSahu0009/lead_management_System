import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { getLeads } from '../api/leadApi.js';

const LeadContext = createContext(null);

const initialState = {
  leads: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },
  filters: {
    search: '',
    status: '',
    sortField: 'createdAt',
    sortOrder: 'desc',
  },
  loading: false,
  error: null,
};

const leadReducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, loading: true, error: null };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        leads: action.payload.leads,
        pagination: action.payload.pagination,
      };
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
        pagination: {
          ...state.pagination,
          page: 1,
        },
      };
    case 'SET_PAGE':
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload,
        },
      };
    default:
      return state;
  }
};

export const LeadProvider = ({ children }) => {
  const [state, dispatch] = useReducer(leadReducer, initialState);

  const loadLeads = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });

    try {
      const payload = await getLeads({
        page: state.pagination.page,
        limit: state.pagination.limit,
        search: state.filters.search || undefined,
        status: state.filters.status || undefined,
        sort: state.filters.sortField,
        order: state.filters.sortOrder,
      });

      dispatch({
        type: 'LOAD_SUCCESS',
        payload: {
          leads: payload.leads ?? [],
          pagination: {
            ...state.pagination,
            ...(payload.pagination ?? {}),
          },
        },
      });
    } catch (error) {
      dispatch({ type: 'LOAD_ERROR', payload: error.message || 'Failed to load leads' });
    }
  }, [state.filters.search, state.filters.status, state.filters.sortField, state.filters.sortOrder, state.pagination.limit, state.pagination.page]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const setFilters = useCallback((updates) => {
    dispatch({ type: 'SET_FILTERS', payload: updates });
  }, []);

  const setPage = useCallback((page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  }, []);

  const refreshLeads = useCallback(() => {
    loadLeads();
  }, [loadLeads]);

  const value = useMemo(
    () => ({
      ...state,
      setFilters,
      setPage,
      refreshLeads,
    }),
    [state, setFilters, setPage, refreshLeads],
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
};

LeadProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLeadContext = () => {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error('useLeadContext must be used within LeadProvider');
  }

  return context;
};