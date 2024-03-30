export const fetchTodos = () => {
    return (dispatch: (arg0: { type: string; payload?: any; error?: any; }) => void) => {
        // dispatch({ type: 'FETCH_TODOS_REQUEST' });
        const res = [
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
        ]
        dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: res });
        // fetch('https://example.com/todos')
        //     .then(response => response.json())
        //     .then(data => {
        //
        //     })
        //     .catch(error => {
        //         dispatch({ type: 'FETCH_TODOS_FAILURE', error: error.toString() });
        //     });
    };
};