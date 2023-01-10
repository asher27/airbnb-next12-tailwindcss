import Header from "../components/Header";
import Footer from "../components/Footer";
import {useRouter} from "next/router";
import format from 'date-fns/format'
import InfoCard from "../components/InfoCard";
import MapComponent from "../components/MapComponent";

function Search({searchResults}) {

    const router = useRouter()
    const {location, startDate, endDate, noOfGuests} = router.query

    // console.log(startDate)
    // console.log(format(new Date(startDate), 'yyyy-LL-dd'));
    // const test = format(new Date(startDate).toISOString(), "dd MMMM yy")
    const formattedStartDate = format(new Date(startDate), 'dd MMMM yy')
    const formattedEndDate = format(new Date(endDate), 'dd MMMM yy')
    const dateRange = `${formattedStartDate} ~ ${formattedEndDate}`


    return (
        <div>
            <Header placeholder={`${location} | ${dateRange} | ${noOfGuests} guests`}/>
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays - {dateRange} - for {noOfGuests} number of guests</p>

                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stay in {location}</h1>

                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More filters</p>
                    </div>

                    <div className="flex flex-col ">
                        {
                            searchResults.map((item, i) => (
                                <InfoCard
                                    key={i}
                                    img={item.img}
                                    location={item.location}
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    long={item.long}
                                    lat={item.lat}
                                    star={item.star}
                                    total={item.total} />
                            ))
                        }
                    </div>
                </section>

               {/* <section className="hidden xl:inline-flex xl:min-w-[600px]">*/}
                <section className="hidden xl:inline-flex  xl:min-w-[40%] sticky top-[76px] h-[calc(100vh-76px)]">
                    <MapComponent searchResults={searchResults}/>
                </section>

            </main>

            <Footer/>
        </div>
    )
}

export default Search

export async function getServerSideProps() {
    const searchResults = await fetch('https://www.jsonkeeper.com/b/5NPS')
        .then(res => res.json())

    return {
        props: {
            searchResults
        }
    }
}