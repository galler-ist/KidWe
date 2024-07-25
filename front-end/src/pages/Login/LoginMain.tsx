import React from 'react';
import LabelInput from '@/components/atoms/Input/LabelInput';
import Button from '@/components/atoms/Button/Button';

const LoginMain: React.FC = () => {
  return (
    <div className="min-h-screen space-y-8 py-6 flex flex-col items-center bg-secondary w-full h-full px-10">
      <div className="flex items-center justify-center ">
        <div className="w-40 h-40 flex items-center justify-center border rounded-xl">
          <p>div까지 image</p>
        </div>
      </div>
      <div className="w-full space-y-8">
        <LabelInput label="아이디" value="아이디 적어주세요" />
        <LabelInput label="비밀번호" value="비밀번호 적어주세요" />
      </div>
      <div className="space-y-2 items-center justify-center">
        <Button label="로그인props로키울거임" />
        <div className="flex text-gray-200 text-xs items-center justify-center">
          <p>아이디 찾기</p>
          <p className="mx-4">|</p>
          <p>비밀번호 찾기</p>
        </div>
      </div>
      <div className="fixed bottom-4">
        <Button label="회원 가입props로키울거임" />
      </div>
    </div>
  );
};

export default LoginMain;

// 해결해볼게
