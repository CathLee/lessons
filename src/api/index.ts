import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3, // retry 3 times before showing error
            staleTime: 10000, // cache for 10 seconds
        },
    },
});
export {queryClient};