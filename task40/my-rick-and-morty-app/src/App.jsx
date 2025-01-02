import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const API_URL = "https://rickandmortyapi.com/api";

// Async Thunk for fetching API resources
export const fetchApiResources = createAsyncThunk(
  "api/fetchResources",
  async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  }
);

// Redux Slice for API resources
const apiSlice = createSlice({
  name: "api",
  initialState: {
    resources: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiResources.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApiResources.fulfilled, (state, action) => {
        state.loading = false;
        state.resources = action.payload;
      })
      .addCase(fetchApiResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Redux Store
const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
  },
});

// Navigation Bar Component
const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/resources">Resources</Link>
        </li>
      </ul>
    </nav>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <div>
      <NavBar />
      <h1>Welcome to the Rick and Morty API Explorer</h1>
      <p>Explore the available resources through the navigation bar.</p>
    </div>
  );
};

// Resources Page Component
const ResourcesPage = () => {
  const dispatch = useDispatch();
  const { resources, loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    if (Object.keys(resources).length === 0 && !loading && !error) {
      dispatch(fetchApiResources());
    }
  }, [dispatch, resources, loading, error]);

  if (loading) {
    return (
      <div>
        <NavBar />
        <p>Loading resources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <p>Error: \\(error\\)</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <h1>Available Resources</h1>
      <ul>
        {Object.entries(resources).map(([key, value]) => (
          <li key={key}>
            <Link to={`/resources/${key}`}>{key}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Individual Resource Page Component
const IndividualResourcePage = () => {
  const { resourceName } = useParams();
  const { resources } = useSelector((state) => state.api);
  const resourceUrl = resources[resourceName];

  return (
    <div>
      <NavBar />
      <h1>{resourceName}</h1>
      {resourceUrl ? <p>URL: \\(resourceUrl\\)</p> : <p>Resource not found.</p>}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route
            path="/resources/:resourceName"
            element={<IndividualResourcePage />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
