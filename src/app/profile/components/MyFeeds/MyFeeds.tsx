import { useGetProfileFeeds } from '@/api/profile/profileQuery';

interface MyFeedsProps {
  userId: number;
}

const MyFeeds = ({ userId }: MyFeedsProps) => {
  const { data: myFeedData } = useGetProfileFeeds(userId);

  console.log('myFeedData', myFeedData);

  return <div>MyFeeds</div>;
};

export default MyFeeds;
