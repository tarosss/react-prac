
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const [queryClient] = useState(() => new QueryClient());

