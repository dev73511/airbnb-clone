import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";


const FavoritePage = async () => {
    
    const currentUser = await getCurrentUser();
    const listings = await getFavoriteListings();
    
    if(listings?.length === 0) {
        return(
            <EmptyState 
                title="No favorites found"
                subTitle="Looks like you have no favorite listing."
            />
        )
    }

    return(
        <FavoritesClient 
            listings={listings}
            currentUser={currentUser}
        />
    )
}


export default FavoritePage;