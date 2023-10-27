import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);


provider.setCustomParameters({
    prompt: "select_account",
});

//navbar너무 복잡한 컴포넌트 방지를 위해
export function login() {
    signInWithPopup(auth, provider)
        .catch(console.error);
}

export function logout() {
    signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
    //호출하는 사람이 사용자 상태변경시 콜백함수 호출해줄게 하는 함수
    onAuthStateChanged(auth, async (user) => { //전역 인증 객체에 관찰자 연결. 사용자 로그인 상태 변경시마다 관찰자 호출
        //1.사용자가 있는 경우(로그인한경우)
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser);
    });
}

async function adminUser(user) {
    //2.사용자가 어드민 권한을 파베 데이터베이스에 가지고 있는지 확인!
    //3.{...user, isAdmin: true/false}
    return get(ref(database, 'admins'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const admins = snapshot.val();
                const isAdmin = admins.includes(user.uid);
                return { ...user, isAdmin }
            }
            return user;
        });
}

export async function addNewProduct(product, image) {
    const id = uuid();
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image,
        options: product.options.split(','),
    });
}

export async function getProducts() {
    return get(ref(database, 'products'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                //자바스크립트에서 제공해주는 Object.values로 value만 가져오기
                return Object.values(snapshot.val());
            }
            return [];
        });
}

// export async function getProductsByCategory(category){
//     return get(ref(database, 'products'))
//     .then((snapshot)=>{
//         if(snapshot.exists()){
//             Object.
//         }
//     })
// }



//쇼핑카트에 필요한 function

export async function getCart(userId) {
    return get(ref(database, `carts/${userId}`))
        .then((snapshot) => {
            const items = snapshot.val() || {};
            // console.log(items);
            return Object.values(items);
        });
}

export async function addOrUpdateToCart(userId, product) {
    return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
    return remove(ref(database, `carts/${userId}/${productId}`));
}