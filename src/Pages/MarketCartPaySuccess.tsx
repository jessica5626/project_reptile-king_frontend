import { useEffect, useState } from "react";
import { apiWithAuth, apiWithoutAuth } from "../components/common/axios";
import { API } from "../config";
import { ProductItem } from "../types/Market";

function MarketCartPaySuccess() {
  const [userAddress, setUserAddress] = useState('');
  const [cartOrderInfo, setCartOrderInfo] = useState({
    name: '',
    email: '',
    emailDomain: '',
    phoneNumber: '',
    deliveryNote: ''
  });
  const [selectedProducts, setSelectedProducts] = useState<ProductItem[]>([]);
  const [finalTotalPayment, setFinalTotalPayment] = useState<string>('');

  const userId = (() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    return payload.sub;
  })();

  const [userInfo, setUserInfo] = useState({
    address: ''
  });

  useEffect(() => {
    if (!userId) {
      console.error('User ID not found');
      return;
    }
  
    console.log('Fetching user info for user ID:', userId);
  
    const fetchUserInfo = async () => {
      try {
        const response = await apiWithAuth.get(`${API}users/${userId}`);
        console.log('User info fetched:', response.data);
    
        // Update userInfo state with fetched data
        setUserInfo({
          address: response.data.data.address
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
  
    fetchUserInfo();
  }, [userId]); 

  useEffect(() => {
    // 로컬 스토리지에서 주문자 정보를 가져옴
    const storedOrderInfo = localStorage.getItem('cartOrderInfo');
    if (storedOrderInfo) {
      setCartOrderInfo(JSON.parse(storedOrderInfo));
    }
    const storedSelectedProducts = localStorage.getItem('selectedProducts');
    if (storedSelectedProducts) {
      setSelectedProducts(JSON.parse(storedSelectedProducts));
    }

    // 로컬 스토리지에서 결제금액을 가져와서 state에 할당
    const storedFinalTotalPayment = localStorage.getItem('finalTotalPayment');
    if (storedFinalTotalPayment) {
      setFinalTotalPayment(storedFinalTotalPayment);
    }

    // 주문자 정보와 선택된 상품 정보를 삭제
    return () => {
      localStorage.removeItem('cartOrderInfo');
      localStorage.removeItem('selectedProducts');
      localStorage.removeItem('finalTotalPayment');
    };
  }, []);

  const handlePayClick = () => {
    window.location.href = "/market";
  };

  const orderDetailClick = () => {
    window.location.href = "/mypage/order/detail";
  };

  return (
    <div className="pt-10 pb-10 mx-auto max-w-screen-md">

      {/* 주문완료 */}
      <div className="text-white font-bold text-4xl pb-5">注文完了</div>
      <div className="bg-green-700 rounded-xl border-2 border-lime-300 py-10">
        <div className="text-white font-bold text-center text-3xl">注文が完了しました。ありがとうございます！</div>
      </div>

      {/* 주문정보 */}
      <div className="text-white font-bold text-4xl mt-10 pb-5">注文情報</div>
      <div className="bg-green-700 rounded-xl border-2 border-lime-300 px-5 py-4">
        <div className="flex justify-between mb-4">
          <div className="text-white font-bold text-xl">注文商品</div>
          <div className="text-white font-bold text-xl">{selectedProducts.length}件</div>
        </div>
        {selectedProducts.map((product) => (
          <div key={product.id} className="bg-lime-950 rounded-xl px-5 py-4 border-2 border-lime-300 mb-4">
            <div className="flex items-center">
              <div>
                {product.imageUrl && <img src={product.imageUrl} alt={"상품이미지"} className="rounded-md h-20 w-20 mr-4" />}
              </div>
              <div className="text-white text-xl font-bold ml-4 ">
                <div>{product.name}</div>
                <div>{product.price.toLocaleString()}円</div>
                <div>{product.quantity}個</div>
              </div>
            </div>
          </div>
        ))}

        <div className="border-lime-300 border-b mt-5 mb-5"></div>
        <div className="text-white text-xl text-center mb-1">お支払い総額</div>
        <div className="text-white font-bold text-2xl text-center">
          {finalTotalPayment}円
        </div>
      </div>

      {/* 주문자 정보 */}
      <div className="text-white font-bold text-4xl mt-10 pb-5">注文者情報</div>
      <div className="bg-green-700 rounded-xl border-2 border-lime-300 px-5 py-4">
        <div className="flex justify-between mb-4">
          <div className="text-white font-bold text-xl">注文者</div>
          <div className="text-white text-xl">{cartOrderInfo.name}</div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-white font-bold text-xl">メールアドレス</div>
          <div className="text-white text-xl">
            {cartOrderInfo.email}
            @
            {cartOrderInfo.emailDomain}
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-white font-bold text-xl">電話番号</div>
          <div className="text-white text-xl">{cartOrderInfo.phoneNumber}</div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-white font-bold text-xl">お届け先</div>
          <div className="text-white text-xl">{userInfo.address}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-white font-bold text-xl">配送要請事項</div>
          <div className="text-white text-xl">{cartOrderInfo.deliveryNote}</div>
        </div>
      </div>

      <div className="flex justify-center mt-10 pb-10">
        {/* <button className="bg-gray-600 hover:bg-gray-800 border text-white font-bold text-xl w-56 py-2 rounded-lg mr-6" onClick={orderDetailClick}>주문내역 확인</button> */}
        <button className="bg-pink-700 hover:bg-pink-900 border text-white font-bold text-xl w-56 py-2 rounded-lg" onClick={handlePayClick}>マーケットへ</button>
      </div>
    </div>
  );
}

export default MarketCartPaySuccess;
