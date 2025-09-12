import { getMyFriendsList } from '@/api/mypage';
import { MyFriendListResponse } from '@/api/type';
import ModalManager from '@/components/common/Modal/ModalManager';
import MyPageFriendTemplate from '@/components/template/MyPageFriendTemplate';
import useModal from '@/hooks/useModal';
import React, { useEffect, useState } from 'react';
export default function FriendScreen() {
  const [friends, setFriends] = useState<MyFriendListResponse[]>([]);
  const { isShowing, modalType, modalProps, hide, show } = useModal();
  const numOfFriends = friends.length;

  useEffect(() => {
    getMyFriendsList().then(res => {
      setFriends(res.result);
    });
  }, []);

  return (
    <>
      <ModalManager isShowing={isShowing} modalType={modalType} modalProps={modalProps} onClose={hide} />
      <MyPageFriendTemplate
        friends={friends}
        numOfFriends={numOfFriends}
        onOpenInviteModal={show}
        onCloseInviteModal={hide}
      />
    </>
  );
}
