import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import getListings from "../actions/getListings";
import PropertiessClient from "./PropertiesClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return(
            <EmptyState 
                title="Unauthorized"
                subTitle="Please login"
            />
        )
    }

    const listings = await getListings({
        userId: currentUser.id,
    });

    if(listings.length === 0) {
        return(
            <EmptyState
                title="No properties found"
                subTitle="Looks like you no properties."
            />
        )
    }

    return(
        <PropertiessClient 
            listings={listings}
            currentUser={currentUser}
        />
    )
}


export default PropertiesPage;