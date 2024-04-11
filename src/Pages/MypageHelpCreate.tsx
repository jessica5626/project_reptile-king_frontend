import { useState } from 'react';
import MypageCategory from '../components/Mypage/MypageCategory';
import { orders } from '../Pages/MypageOrder';

function MypageHelpCreate() {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('마이 페이지'); // 선택된 세부 카테고리
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const order = orders[0];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (extension && !['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
          alert('JPG, PNG, GIF 파일만 업로드할 수 있습니다.');
          return;
        }
      }
      const images = Array.from(files);
      setUploadedImages(prevImages => [...prevImages, ...images.slice(0, 3 - prevImages.length)]);
    }
  };

  const handleCancel = () => {
    window.location.href = '/mypage/help';
  };

  const handleSubmit = () => {
    const confirmSubmit = window.confirm('문의 작성을 완료하시겠습니까?');
    if (confirmSubmit) {
      window.location.href = '/mypage/help';
    }
  };

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
            <div className="font-bold text-2xl mb-3">문의작성</div>
            <div className="bg-white rounded px-5 py-4 pb-6">
              <div className="border-2 rounded items-center mt-2 px-4 py-3">
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={order.productImgUrl}
                      alt={order.productName}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="ml-4 text-lg">
                      <div>{order.productName}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-1/4 text-lg text-center">
                        문의 유형 선택
                      </td>
                      <td>
                        <select className="w-1/6 h-10 p-2 border border-gray-300 rounded mt-2 mb-2">
                          <option value="취소">취소</option>
                          <option value="반품">반품</option>
                          <option value="교환">교환</option>
                          <option value="환불">환불</option>
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <td className="w-1/4 text-lg text-center">
                        제목
                      </td>
                      <td>
                        <input
                          type="text"
                          className="w-full h-10 p-2 border border-gray-300 rounded mt-2 mb-2"
                          placeholder="제목을 작성해주세요..."
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/4 text-lg text-center">설명</td>
                      <td>
                        <textarea
                          className="w-full h-60 p-2 border border-gray-300 rounded"
                          placeholder="설명을 작성해주세요..."
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/4 text-lg text-center">사진 첨부</td>
                      <td>
                        <button
                          className="hover:bg-blue-200 text-blue-500 border-2 border-blue-500 font-bold py-1 px-4 rounded"
                          onClick={() => document.getElementById('imageUpload')?.click()}
                          disabled={uploadedImages.length >= 3}
                        >
                          사진 첨부
                        </button>
                        <input
                          id="imageUpload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          multiple
                        />
                        <span className="ml-6">{uploadedImages.length}/3</span>
                        <span className="text-gray-400 text-sm ml-6">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 3장까지 첨부 가능합니다.</span>

                      </td>
                    </tr>
                    <tr>
                      <td>
                      </td>
                      <td>
                        {uploadedImages.length > 0 && (
                          <div className="flex mt-3">
                            {uploadedImages.map((image, index) => (
                              <img key={index} src={URL.createObjectURL(image)} alt={`Uploaded Image ${index + 1}`} className="w-52 h-40 mr-2" />
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  className="hover:bg-red-200 bg-red-500 text-white font-bold py-1 px-4 rounded mr-6 self-center"
                  onClick={handleCancel}
                >
                  취소
                </button>
                <button
                  className="hover:bg-blue-200 bg-blue-500 text-white font-bold py-1 px-4 rounded self-center"
                  onClick={handleSubmit}
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MypageHelpCreate;
