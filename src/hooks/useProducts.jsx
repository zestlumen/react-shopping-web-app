import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewProduct, getProducts } from '../api/firebase';

//커스텀훅인 useProducts생성. product에 관련된 읽거나 쓰거나 업데이트하거나 하는 것들 다 담기
//내부적으로 리액트쿼리사용. 읽어와서 productsQuery에 담아두고 변경할 수 있는 객체 addProduct 만들어두고
export default function useProducts() {
    const queryClient = useQueryClient();

    const productsQuery = useQuery(['products'], getProducts, {
        staleTime: 1000 * 60
    });

    const addProduct = useMutation(
        ({ product, url }) => addNewProduct(product, url),
        //뮤테이션에서 우리가 기본적으로 정리해야 하는 것들 여기서 등록해줄 수 있고 사용할 때 정의하는 것도 호출됨.
        {
            onSuccess: () => queryClient.invalidateQueries(['products'])
        }
    );

    return { productsQuery, addProduct };
}

