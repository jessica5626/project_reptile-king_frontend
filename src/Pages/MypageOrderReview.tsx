import { useState } from 'react';
import MypageCategory from '../components/Mypage/MypageCategory';
import { orders } from '../Pages/MypageOrder';
import ReviewCreateItem from '../components/Mypage/ReviewCreateItem';
import ReviewCompleteItem from '../components/Mypage/ReviewCompleteItem';

function MypageOrderReview() {
  const [selectedSubCategory, setSelectedSubCategory] = useState('마이 페이지'); // 선택된 세부 카테고리
  const [selectedTab, setSelectedTab] = useState("create");

  return (
    <div>
      <div className="pt-12 pb-24 mx-auto max-w-screen-xl flex">
        {/* 왼쪽 섹션 */}
        <div className="w-1/4 px-4">
          <MypageCategory
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        </div>

        {/* 오른쪽 섹션 */}
        <div className="w-3/4 px-4">
          <div className="bg-gray-200 rounded px-5 py-4">
            <div className="font-bold text-2xl mb-3">리뷰관리</div>

            <div className="bg-white rounded px-5 py-4">

              <div>
                <div className="border border-gray-300">
                  <ul className="flex justify-center">
                    <li
                      className={`px-4 py-4 text-black text-lg text-center cursor-pointer hover:bg-gray-300 font-bold ${selectedTab === 'create' && 'bg-gray-300'} w-1/2`}
                      onClick={() => setSelectedTab('create')}
                    >
                      리뷰작성({orders.length})
                    </li>
                    <li
                      className={`px-4 py-4 text-black text-lg text-center  cursor-pointer hover:bg-gray-300 font-bold ${selectedTab === 'complete' && 'bg-gray-300'} w-1/2`}
                      onClick={() => setSelectedTab('complete')}
                    >
                      작성한 리뷰({orders.length})
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <div className="w-full max-w-screen-lg">
                    <div className="flex justify-center flex-col">
                      {selectedTab === "create" && <ReviewCreateItem />}
                    </div>
                    {selectedTab === "complete" && <ReviewCompleteItem />}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MypageOrderReview;