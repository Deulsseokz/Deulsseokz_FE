import { getMyFriendsList } from '@/api/mypage';
import { MyFriendListResponse } from '@/api/type';
import MyPageFriendTemplate from '@/components/template/MyPageFriendTemplate';
import { useEffect, useState } from 'react';

export default function FriendScreen() {
  const [friends, setFriends] = useState<MyFriendListResponse[]>([]);
  const numOfFriends = friends.length;

  useEffect(() => {
    getMyFriendsList().then(result => {
      console.log(result);
      setFriends(result.result);
    });
  }, []);

  return <MyPageFriendTemplate friends={friends} numOfFriends={numOfFriends} />;
}
