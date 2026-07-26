import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default (url:string) => {
    const customHook = z.discriminatedUnion('status', [
        z.object({
        status: z.literal("idle"),
        data: z.null(),
        error: z.null(),
        }),
        z.object({
        status: z.literal("loading"),
        data: z.null(),
        error: z.null(),
        }),
        z.object({
        status: z.literal("success"),
        data: z.any(),
        error: z.null(),
        }),
        z.object({
        status: z.literal("error"),
        data: z.null(),
        error: z.instanceof(Error),
        }),
    ])

    type typedCustomeHook = z.infer<typeof customHook>

    const [state, setState] = useState<typedCustomeHook>({
        status: 'idle',
        data: null,
        error: null
    })

    useEffect(() => {
        setState({ status: 'loading', data: null, error: null });

        useQuery({
            queryKey: [url],
            queryFn: async () => {
                const res = await fetch(url)
                if (!res.ok) {
                    setState({status: 'error', data: null, error: new Error('非同期通信でエラーが発生しました')})
                };

                const json = await res.json()
                setState({status: 'success', data: json, error: null})
            }
        })
        

    }, {url})

    return state
}
