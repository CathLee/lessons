import React, {Suspense, useState, useEffect, ReactNode, FC} from 'react';
import {queryClient} from "../../api";
import {useIsFetching} from 'react-query';

interface LoadingBoundaryProps {
    children: ReactNode;
}

export const LoadingBoundary: FC<LoadingBoundaryProps> = ({children}) => {
    const isFetching = useIsFetching();
    // if (isFetching) {
    //     return <div>Loading...</div>;
    // }
    return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}