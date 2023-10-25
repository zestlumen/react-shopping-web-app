import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';
import useProducts from '../hooks/useProducts';
// import { addNewProduct } from '../api/firebase';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function NewProduct() {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState();

    //추가하는 곳에선 추가할 수 있는 뮤테이션 addProduct를 받아와서 쓸 수 있다.
    const { addProduct } = useProducts();
    // const QueryClient = useQueryClient();
    // const addProduct = useMutation(
    //     ({ product, url }) => addNewProduct(product, url), //1.어떤 걸 인자로 받아서 어떤 함수를 호출해서 변경할건지 정의
    //     {
    //         onSuccess: () => QueryClient.invalidateQueries(['products'])//2.뮤테이션 성공적이면 인밸리데이트캐시할거야.프로덕트키를가진
    //     }
    // );


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') { //이름 파일인 경우에는 setFile그리고 리턴
            setFile(files && files[0]);
            return;
        }
        setProduct((product) => ({ ...product, [name]: value }));
    };


    const handleSubmit = (e) => {
        //제품 사진을 Cloudinary에 업로드하고 URL획득
        //Firebase에 새로운 제품 추가하기
        e.preventDefault();
        setIsUploading(true);
        uploadImage(file)
            .then(url => {
                addProduct.mutate(
                    { product, url },
                    { // 사용하는 곳에서도 onSuccess 정의할 수 있음. 기본적으로 정의된 것도 실행되고 이것도 실행됨.
                        onSuccess: () => {
                            setSuccess('성공적으로 제품이 추가되었습니다.');
                            setTimeout(() => {
                                setSuccess(null);
                            }, 4000);
                        }
                    })
                // addNewProduct(product, url)
                //     .then(() => {
                //         setSuccess('성공적으로 제품이 추가되었습니다.');
                //         setTimeout(() => {
                //             setSuccess(null);
                //         }, 4000);
                //     });
            })
            .finally(() => {
                setIsUploading(false);
            });

    };

    return (
        <section className='w-full text-center ' >
            <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
            {success && <p className='my-2'>✔{success}</p>}
            {/* {true && <p className='my-2'>✔테스트용{success}</p>}  */}
            {file && (
                <img
                    className='w-96 mx-auto mb-2'
                    src={URL.createObjectURL(file)}
                    alt='local file'
                />
            )}
            <form onSubmit={handleSubmit} className='flex flex-col px-12'>
                <input
                    type='file'
                    accept='image/*'
                    name='file'
                    required
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='title'
                    value={product.title ?? ''}
                    placeholder='제품명'
                    required
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='price'
                    value={product.price ?? ''}
                    placeholder='가격'
                    required
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='category'
                    value={product.category ?? ''}
                    placeholder='카테고리'
                    required
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='description'
                    value={product.description ?? ''}
                    placeholder='제품 설명'
                    required
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='options'
                    value={product.options ?? ''}
                    placeholder='옵션들(콤마(,)로 구분)'
                    required
                    onChange={handleChange}
                />
                <Button text={isUploading ? '업로드 중...' : '제품 등록하기'} disabled={isUploading} />
            </form>
        </section>
    );
}

// const [imgFile, setImgFile] = useState('');
// const [result, setResult] = useState('');
// const imgRef = useRef();

// const imgChangeHandler = () => {
//     const reader = new FileReader();
//     reader.readAsDataURL(imgRef.current.files[0]);
//     reader.onloadend = () => {
//         setImgFile(reader.result);
//     };
// };

// const loaded = async (e, imgFile) => {
//     e.preventDefault();

//     const signResponse = await fetch('../api/cloudinary');
//     const signData = await signResponse.json();
//     const url = "https://api.cloudinary.com/v1_1/" + signData.cloudname + "/auto/upload";

//     const file = imgFile;
//     const formData = new FormData();

//     formData.append("file", file);
//     formData.append("api_key", signData.apikey);
//     formData.append("timestamp", signData.timestamp);
//     formData.append("signature", signData.signature);
//     formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
//     formData.append("folder", "signed_upload_demo_form");

//     fetch(url, {
//         method: "POST",
//         body: formData
//     })
//         .then((response) => {
//             return response.text();
//         })
//         .then((data) => {
//             console.log(data)
//             setResult('정상적으로 등록되었습니다.');
//         });




