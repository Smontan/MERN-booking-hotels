import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";
import Spinner from "../components/Spinner";

const Home = () => {
  const { data: hotels, isLoading } = useQuery("fetchHotels", () => apiClient.fetchHotels());
  const topRowHotels = hotels?.slice(0,2) || [];
  const bottomRowHotels = hotels?.slice(2) || []

  if(isLoading) return <Spinner />

  return <div className="space-y-3 my-10">
    <h2 className="text-3xl font-bold">Latest Destination</h2>
    <p>Most recent destinatons added by our hosts</p>
    <div className="grid gap-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {topRowHotels.map((hotel) => (
          <LatestDestinationCard hotel={hotel} key={hotel._id} />
        ))}
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {bottomRowHotels.map((hotel) => (
          <LatestDestinationCard hotel={hotel} key={hotel._id} />
        ))}
      </div>
    </div>
  </div>;
};
export default Home;
