import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setupLocalDatabaseMonkeyPatch, syncAllFromSupabase } from './supabaseClient';

// Enable live background synchronization with Supabase
setupLocalDatabaseMonkeyPatch();

// Asynchronously pull latest cloud database on load
syncAllFromSupabase();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
