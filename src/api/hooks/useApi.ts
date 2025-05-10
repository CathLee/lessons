import {useQuery, useMutation, UseQueryOptions} from 'react-query';

const useGetApi = <T>(url: string, options?: UseQueryOptions<T, Error>) => {
    return useQuery<T, Error>(['api', url], async () => {
        const response = await fetch(url);
        return response.json();
    }, options);
};

const usePostApi = <T>(url: string, data: any) => {
    return useMutation<T, Error, any>(async () => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });
        return response.json();
    });
};

export {useGetApi, usePostApi};