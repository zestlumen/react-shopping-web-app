import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';


export default function useCarts() {
    const { uid } = useAuthContext();
    const queryClient = useQueryClient();

    const cartQuery = useQuery(['carts', uid || ''], () => getCart(uid), {
        enabled: !!uid //uid존재하지 않는 경우 사용하지 못하도록
    });

    const addOrUpdateItem = useMutation(
        (product) => addOrUpdateToCart(uid, product),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['carts', uid]); //로그인한 사용자만 업데이트
            }
        }
    );

    const removeItem = useMutation((id) => removeFromCart(uid, id), {
        onSuccess: () => {
            queryClient.invalidateQueries(['carts', uid]);
        }
    });


    return { cartQuery, addOrUpdateItem, removeItem };
}

